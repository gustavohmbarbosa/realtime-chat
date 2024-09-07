import { Message } from '@/types'
import React from 'react'

type ChatWindowProps = {
    selectedContact: any | undefined
    onBackButtonClick: () => void
    isBackButtonVisible: boolean
}

const ChatWindow: React.FC<ChatWindowProps> = ({
    selectedContact,
    onBackButtonClick,
    isBackButtonVisible,
}) => {
    return (
        <div className={`flex-1 flex flex-col overflow-hidden ${selectedContact ? "" : "hidden"}`}>
            <div className="px-4 py-2 bg-gray-800 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center space-x-4">
                    <button
                        className={`text-white font-bold flex items-center btn-goto-menu ${isBackButtonVisible ? '' : 'hidden'}`}
                        onClick={onBackButtonClick}>
                        &lt; {/* Ícone de seta */}
                    </button>
                    <div className="text-white font-bold">
                        {selectedContact?.name}
                    </div>
                </div>
                <div className="text-sm text-gray-500">last seen recently</div>
            </div>
            <div className="flex-1 p-4 bg-gray-900 overflow-y-auto">
                {selectedContact?.messages?.map((msg: Message, index: number) => {
                    const isMe = msg.sender === selectedContact.id
                    return (
                        <div
                            key={index}
                            className={`mb-2 flex ${
                                isMe
                                    ? 'justify-end'
                                    : 'justify-start'
                            }`}>
                            <div
                                className={`px-4 py-2 rounded-lg ${
                                    isMe
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChatWindow
