import { Avatar } from '@material-ui/core'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

export default function comment({ comment }) {
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center mr-2">
                <Avatar
                    className="mr-3 object-cover"
                    alt={comment.username}
                    src="/static/images/avatar/1.jpg"
                />
                <div className="font-normal space-x-2">
                    <strong>{comment.username}</strong>
                    <span> {comment.text}</span>
                </div>
            </div>
            <div>
                <AiOutlineHeart />
            </div>
        </div>
    )
}
