import React, { useState } from 'react'
import { Avatar, makeStyles } from '@material-ui/core'
import { FiMoreHorizontal } from 'react-icons/fi'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { IoChatboxOutline } from "react-icons/io5"
import { BiBookmark } from 'react-icons/bi'
import './Style.css'
import CommentList from './CommentList'
import Comment from './Comment'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

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
        width: 1200,
        height: 700,
        backgroundColor: theme.palette.background.paper,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        overflow: 'hidden',
        boxShadow: theme.shadows[1],
    },
}));

function numberWithCommas(like) {
    return like.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const PostDetail = ({ arrayImageUrl, username, caption, comments, like, user, postId }) => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

    return (
        <div style={modalStyle} className={classes.paper}>
            <div className="flex flex-row items-center w-full h-full">
                <div className="flex-[7] overflow-hidden ">
                    <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className="w-full h-full object-cover border-y border-gray-200 noselect"
                    >
                        {arrayImageUrl.map((URL) => (
                            <SwiperSlide className='noselect'>
                                <img
                                    className="w-full h-full object-cover border-y border-gray-200 noselect"
                                    src={URL}
                                    alt="postImage"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex-[5]  w-full h-full overflow-hidden flex flex-col">
                    <div className="flex items-center py-2 px-3.5 justify-between border-b">
                        <div className="flex items-center">
                            <Avatar
                                className="mr-3 object-cover"
                                alt={username}
                                src="/static/images/avatar/1.jpg"
                            />
                            <strong>{username}</strong>
                        </div>
                        <div className="text-xl">
                            <FiMoreHorizontal />
                        </div>
                    </div>

                    <div className="p-3.5 space-y-5 flex-[6] overflow-y-scroll hidden-scroll">
                        <div>
                            <div className="flex items-center  mb-3">
                                <Avatar
                                    className="mr-3 object-cover"
                                    alt={username}
                                    src="/static/images/avatar/1.jpg"
                                />
                                <div className="font-normal space-x-2">
                                    <strong>{username}</strong><span>{caption}</span>
                                </div>
                            </div>
                            {comments.map(({ id, comment }) => (
                                <CommentList comment={comment} postId={postId} commentId={id} key={id} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="border-y p-3.5">
                            <div className="flex justify-between mb-2">
                                <div className="flex space-x-2 text-2xl" >
                                    <AiOutlineHeart />
                                    <IoChatboxOutline />
                                    <AiOutlineShareAlt />
                                </div>
                                <div className="text-2xl">
                                    <BiBookmark />
                                </div>
                            </div>
                            <div className="font-normal">
                                <strong>{numberWithCommas(like)} lượt thích</strong>
                                <p className="text-gray-500">17 giờ trước</p>
                            </div>
                        </div>
                        <Comment
                            postId={postId}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetail