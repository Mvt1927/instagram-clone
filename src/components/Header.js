import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal'
import { Link } from 'react-router-dom'
import { Button, Input } from '@material-ui/core';
import { auth } from '../config/firebase';
import { makeStyles } from '@material-ui/core/styles'
import { HiOutlineHome } from 'react-icons/hi'
import { RiMessengerLine, RiMessengerFill } from 'react-icons/ri'
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs'
import { IoCompassOutline, IoCompassSharp } from 'react-icons/io5'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import ImageUpload from './ImageUpload'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Header = () => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)
    const [open, setOpen] = useState(false)
    const [openSignIn, setOpenSignIn] = useState('')
    const [openUpload, setOpenUpload] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleSignUp = (event) => {
        event.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message))
        setOpen(false);
    }

    const handleSignIn = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))
        setOpenSignIn(false)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
                if (authUser.displayName) {
                } else {
                    return authUser.updateProfile({ displayName: username });
                }
            } else {
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [user, username]);

    return (
        <div className="flex justify-center bg-white border-b">
            <div className="lg:w-[935px] flex flex-row items-center">
                <div className="py-3 flex flex-1 justify-between">
                    <img
                        className="object-contain"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="Logo"
                    />
                    {user ? (
                        <Button onClick={() => auth.signOut()}>Đăng xuất</Button>
                    ) : (
                        <div className="">
                            <Button onClick={() => setOpenSignIn(true)}>Đăng nhập</Button>
                            <Button onClick={() => setOpen(true)}>Đăng ký</Button>
                        </div>
                    )}
                </div>
                <div className="lg:w-[325px] lg:flex hidden text-2xl space-x-5 flex justify-end">
                    <Link to="/">
                        <HiOutlineHome />
                    </Link>
                    <Link to="/messenger">
                        <RiMessengerLine />
                    </Link>
                    <button
                        onClick={() => setOpenUpload(true)}
                    >
                        <BsPlusCircle />
                    </button>
                    <Link to="/trending">
                        <IoCompassOutline />
                    </Link>


                    <AiOutlineHeart />
                </div>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <form className="flex flex-col">
                            <center>
                                <img
                                    className=""
                                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                    alt=""
                                />
                            </center>
                            <Input
                                placeholder="Username..."
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                placeholder="Email..."
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="Password..."
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" onClick={handleSignUp}>Sign up</Button>

                        </form>
                    </div>
                </Modal>

                <Modal
                    open={openSignIn}
                    onClose={() => setOpenSignIn(false)}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <form className="flex flex-col">
                            <center>
                                <img
                                    className=""
                                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                    alt=""
                                />
                            </center>
                            <Input
                                placeholder="Email..."
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="Password..."
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" onClick={handleSignIn}>Sign In</Button>
                        </form>
                    </div>
                </Modal>

                <Modal
                    open={openUpload}
                    onClose={() => setOpenUpload(false)}
                >
                    {user?.displayName ? (
                        <ImageUpload username={user.displayName} />
                    ) : (
                        <h3>Sorry you need to login to upload</h3>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default Header