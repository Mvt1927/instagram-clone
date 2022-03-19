import { Avatar } from '@material-ui/core'
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsChevronDown } from 'react-icons/bs'
import { GrSend } from 'react-icons/gr'

const Messenger = () => {
    return (
        <>
            <div className="flex flex-col h-screen lg:w-[350px] border bg-white">
                <div className="flex justify-end p-4 border-b">
                    <div className="flex flex-1 justify-center space-x-2">
                        <button>
                            _ldatuan_
                        </button>
                        <button>
                            <BsChevronDown />
                        </button>
                    </div>
                    <button className="text-2xl"><BiEdit /></button>
                </div>
                <div className="flex-1 py-2">
                    <button className="flex  items-center w-full px-5 py-3 space-x-2.5 hover:bg-[#fafafa]">
                        <Avatar
                            alt="dlwlrma"
                            src="/static/images/avatar/1.jpg"
                        />
                        <span>dlwlrma</span>
                    </button>
                    <button className="flex  items-center w-full px-5 py-3 space-x-2.5 hover:bg-[#fafafa]">
                        <Avatar
                            alt="Cara"
                            src="/static/images/avatar/1.jpg"
                        />
                        <span>Cara</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center bg-white border space-y-2">
                <div className="text-7xl"><GrSend /></div>
                <p className="text-2xl font-light text-gray-400">Tin nhắn của bạn</p>
                <p className="text-gray-500 font-light">Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm</p>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">Gửi tin nhắn</button>
            </div>
        </>
    )
}

export default Messenger