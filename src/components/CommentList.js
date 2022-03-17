import { Avatar, Modal } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { makeStyles } from '@material-ui/core/styles'
import { db } from '../config/firebase'

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
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: theme.shadows[5],
    },
}));

const CommentList = ({ comment, postId, commentId }) => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)
    const [open, setOpen] = useState(false)

    const handleDelete = (e) => {
        e.preventDefault()
        db
            .collection("posts")
            .doc(postId)
            .collection('comments')
            .doc(commentId)
            .delete()
            .then(() => {
                alert("Xóa thành công");
            })
            .catch((error) => {
                alert("Xóa thất bại");
            });
    }

    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center mr-2">
                <Avatar
                    className="mr-3 object-cover"
                    alt={comment.username}
                    src="/static/images/avatar/1.jpg"
                />
                <div className="flex flex-col">
                    <div className="space-x-1 mb-1.5">
                        <strong>{comment.username}</strong>
                        <span> {comment.text}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-xs text-gray-500">
                        <span>8 tuần</span>
                        <span>500 lượt thích</span>
                        <span>Trả lời</span>
                        <button
                            onClick={() => setOpen(true)}
                            className="text-sm"
                        >
                            <FiMoreHorizontal />
                        </button>
                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <div style={modalStyle} className={classes.paper}>
                                {/* <button
                                    className='w-full py-2 text-red-500'
                                    type="submit"
                                >
                                    Báo cáo
                                </button> */}
                                <button
                                    className='w-full py-2 border-y text-red-500'
                                    type="submit"
                                    onClick={handleDelete}
                                >
                                    Xóa bình luận
                                </button>
                                <button
                                    className='w-full py-2'
                                    type="submit"
                                    onClick={() => setOpen(false)}>
                                    Hủy
                                </button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
            <div>
                <AiOutlineHeart />
            </div>
        </div>
    )
}

export default CommentList
