import React, { useState } from 'react'
import { db } from '../config/firebase'
import firebase from 'firebase'

const Comment = ({ postId, user }) => {
    const [comment, setComment] = useState('')
    const [buttonColor, setButtonColor] = useState('text-blue-300')
    const buttonClass = `px-2 cursor-pointer ${buttonColor}`

    const handlePost = (e) => {
        e.preventDefault()

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }

    const handleInputChange = (e) => {
        setComment(e.target.value)
        setButtonColor('text-blue-500')
        if (e.target.value === '') {
            setButtonColor('text-blue-300')
        }
    }

    return (
        <form className="flex" >
            <input
                className="flex-1 border-none p-2 outline-none"
                type="text"
                placeholder="Thêm bình luận..."
                value={comment}
                onChange={(e) => handleInputChange(e)}
            />
            <button
                className={buttonClass}
                disabled={!comment}
                type="submit"
                onClick={handlePost}
            >
                Đăng
            </button>
        </form>
    )
}

export default Comment