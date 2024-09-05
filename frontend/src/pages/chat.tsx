import { useState, useEffect, useCallback } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatWindow from '../components/ChatWindow'
import MessageInput from '../components/MessageInput'

function ChatPage() {
    const [contacts] = useState([
        { name: 'Brenda Duque', lastMessage: 'Oi amor', date: '10/08/2024' },
        {
            name: 'Job Doe #1',
            lastMessage: 'E aí, tudo bem?',
            date: '10/08/2024',
        },
        {
            name: 'Job Doe #2',
            lastMessage: 'E aí, tudo bem?',
            date: '10/08/2024',
        },
        {
            name: 'Job Doe #3',
            lastMessage: 'E aí, tudo bem?',
            date: '10/08/2024',
        },
        {
            name: 'Job Doe #4',
            lastMessage: 'E aí, tudo bem?',
            date: '10/08/2024',
        },
        {
            name: 'Job Doe #5',
            lastMessage: 'E aí, tudo bem?',
            date: '10/08/2024',
        },
        {
            name: 'Job Doe #6',
            lastMessage: 'E aí, tudo bem?',
            date: '10/08/2024',
        },
        {
            name: 'Job Doe #7',
            lastMessage: 'E aí, tudo bem?',
            date: '10/08/2024',
        },
        {
            name: 'Job Doe #8',
            lastMessage: 'E aí, tudo bem?',
            date: '10/08/2024',
        },
        {
            name: 'Job Doe #9',
            lastMessage: 'E aí, tudo bem?',
            date: '10/08/2024',
        },
        {
            name: 'Job Doe #10',
            lastMessage: 'E aí, tudo bem?',
            date: '10/08/2024',
        },
    ])

    const [sidebarVisible, setSidebarVisible] = useState(true)
    const [isDesktopView, setIsDesktopView] = useState(true)
    const [selectedContact, setSelectedContact] = useState(contacts[0].name)
    const [messages, setMessages] = useState([
        { text: 'Oi!', sender: 'me' },
        { text: 'Oi amor!', sender: 'Brenda Duque' },
    ])

    const handleSendMessage = useCallback(
        (message: string) => {
            setMessages(prevMessages => {
                prevMessages.push({ text: message, sender: 'me' })
                return prevMessages
            })
        },
        [setMessages],
    )

    const handleSelectContact = useCallback(
        contact => {
            setSelectedContact(contact)
            if (!isDesktopView) {
                setSidebarVisible(false)
            }
        },
        [isDesktopView, setSelectedContact, setSidebarVisible],
    )

    function gotoMenu() {
        setSidebarVisible(true)
    }

    useEffect(() => {
        const handleResize = () => {
            const isDesktop = window.innerWidth >= 1080
            setIsDesktopView(isDesktop)
            setSidebarVisible(true)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="flex flex-col  md:flex-row h-screen bg-gray-900 text-white">
            <div className="flex flex-1">
                <ChatSidebar
                    contacts={contacts}
                    selectedContact={selectedContact}
                    isVisible={sidebarVisible}
                    onSelect={handleSelectContact}
                />
                <div
                    className={`flex flex-col w-full ${
                        !isDesktopView && sidebarVisible ? 'hidden' : ''
                    }`}>
                    <ChatWindow
                        messages={messages}
                        selectedContact={selectedContact}
                        onBackButtonClick={gotoMenu}
                        isBackButtonVisible={!isDesktopView}
                    />
                    <MessageInput onSend={handleSendMessage} />
                </div>
            </div>
        </div>
    )
}

export default ChatPage
