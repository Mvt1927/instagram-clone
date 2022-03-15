import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { db } from '../config/firebase'
import firebase from 'firebase'

const Post = ({ username, user, caption, imageUrl, postId }) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    useEffect(() => {
        let unSubscribe;
        if (postId) {
            unSubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => (doc.data())))
                })
        }
        return () => {
            unSubscribe()
        }
    }, [postId])

    const handlePost = (e) => {
        e.preventDefault()

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }

    return (
        <div className="lg:w-[650px] w-full  bg-white border border-gray-200 mb-3">
            <div className="flex items-center px-2 py-1">
                <Avatar
                    className="mr-2 object-cover"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            <img
                className="w-full object-contain border-y border-gray-200"
                src={imageUrl}
                alt="postImage"
            />
            <div className="font-normal px-2 pb-3 space-x-2"><strong>{username}</strong><span>{caption}</span></div>

            {comments.map((comment, i) => (
                <div className="px-4 space-x-2">
                    <strong>{comment.username}</strong>
                    <span> {comment.text}</span>
                </div>
            ))}

            <form className="flex mt-2 border-t" >
                <input
                    className="flex-1 border-none p-2 outline-none"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="px-2 cursor-pointer"
                    disabled={!comment}
                    type="submit"
                    onClick={handlePost}
                >
                    Post
                </button>
            </form>
        </div>
    )
}

export default Post