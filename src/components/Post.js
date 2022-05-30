import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { db } from '../config/firebase'
import PostDetail from './PostDetail'
import Comment from './Comment'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { IoChatboxOutline } from "react-icons/io5"
import { BiBookmark } from 'react-icons/bi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { Modal } from '@material-ui/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

const Post = ({ username, user, caption, arrayImageUrl, postId, amount, timestamp }) => {
    const [comments, setComments] = useState([])
    const [like, setLike] = useState(12500)
    const [sumComment, setSumComment] = useState(0)
    const [open, setOpen] = useState(false)

    function numberWithCommas(like) {
        return like.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    useEffect(() => {
        let unSubscribe;
        if (postId) {
            unSubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() })))
                })
        }
        return () => {
            unSubscribe()
        }
    }, [postId]);


    return (
        <div className="w-full  bg-white border border-gray-200 mb-3">
            <div className="flex items-center py-2 px-3.5 justify-between">
                <div className="flex items-center">
                    <Avatar
                        className="mr-2 object-cover"
                        alt={username}
                        src="/static/images/avatar/1.jpg"
                    />
                    <strong>{username}</strong>
                </div>
                <div className="text-xl">
                    <FiMoreHorizontal />
                </div>
            </div>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="w-full object-contain border-y border-gray-200 noselect"
            >
                {arrayImageUrl.map((URL) => (
                    <SwiperSlide className='noselect'>
                        <img
                            className="w-full object-contain border-y border-gray-200 noselect"
                            src={URL}
                            alt="postImage"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="p-3.5 border-b">
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
                </div>
                <div className="font-normal space-x-2">
                    <strong>{username}</strong><span>{caption}</span>
                </div>
                <button
                    className='text-gray-500 font-normal'
                    onClick={() => setOpen(true)}
                >
                    Xem tất cả {sumComment} bình luận
                </button>

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <PostDetail
                        arrayImageUrl={arrayImageUrl}
                        username={username}
                        caption={caption}
                        like={like}
                        user={user}
                        postId={postId}
                        comments={comments}
                    />
                </Modal>
                {comments.map(({ id, comment }, i) => {
                    if (i < 2) {
                        return (
                            <div className="space-x-2" key={id}>
                                <strong>{comment.username}</strong>
                                <span> {comment.text}</span>
                            </div>
                        )
                    }
                })}
                <p className="text-[10px] text-gray-500 mt-2">{

                } GIỜ TRƯỚC</p>
            </div>

            <Comment
                postId={postId}
                user={user}
            />

        </div>
    )
}

export default Post