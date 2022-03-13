import React from 'react'

const Post = ({ username, caption, imageUrl }) => {
    return (
        <div className="max-w-lg bg-white border border-gray-200">
            <div className="flex items-center p-1.5">
                <img
                    className="w-10 mr-2 rounded-full"
                    src="https://www.chcoc.org/wp-content/uploads/2016/01/avatar.jpeg"
                    alt="avatar"
                />
                <h3>Username</h3>
            </div>
            <img
                className="w-full object-contain border-y border-gray-200"
                src={imageUrl}
                alt="postImage"
            />
            <h4 className="font-normal p-2"><strong>{username}</strong>{caption}</h4>
        </div>
    )
}

export default Post