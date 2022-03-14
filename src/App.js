import React, { useState, useEffect } from 'react'
import './App.css';
import Post from './Post'
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

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

function App() {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false)
    const [openSignIn, setOpenSignIn] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser)
                if (authUser.displayName) {

                } else {
                    return authUser.updateProfile({
                        displayName: username
                    })
                }
            } else {
                setUser(null)
            }
        })
        return () => {
            unSubscribe()
        }
    }, [user, username])

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
        })
    }, [])

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

    return (
        <div className="bg-gray-100 h-full">
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

            <div className="bg-white py-3 object-contain flex justify-between" style={{ border: "1px solid lightgray" }}>
                <img
                    className="object-contain"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="Logo"
                />
                {user ? (
                    <Button onClick={() => auth.signOut()}>Logout</Button>
                ) : (
                    <div className="">
                        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                        <Button onClick={() => setOpen(true)}>Sign Up</Button>
                    </div>
                )}
            </div>

            <div className="p-5 w-full flex flex-col justify-center  items-center">
                {posts.map(({ id, post }) => (
                    <Post
                        key={id}
                        postId={id}
                        user={user}
                        username={post.username}
                        imageUrl={post.imageUrl}
                        caption={post.caption}
                    />
                ))}
            </div>

            {user?.displayName ? (
                <ImageUpload username={user.displayName} />
            ) : (
                <h3>Sorry you need to login to upload</h3>
            )}
        </div>
    );
}

export default App;
