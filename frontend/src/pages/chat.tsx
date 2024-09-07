import { useState, useEffect, useCallback } from 'react'
import ChatSidebar from '@/components/ChatSidebar'
import ChatWindow from '@/components/ChatWindow'
import MessageInput from '@/components/MessageInput'
import { useChatStore } from '@/store/userChatStore'
import { Contact } from '@/types'

function ChatPage() {
    // const [loading, setLoading] = useState(true)

    const [sidebarVisible, setSidebarVisible] = useState(true)
    const [isDesktopView, setIsDesktopView] = useState(true)

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

    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const handleSelectContact = useCallback(
        (contact: Contact) => {
            setSelectedContact(contact)
            if (!isDesktopView) {
                setSidebarVisible(false)
            }
        },
        [isDesktopView, setSelectedContact, setSidebarVisible],
    )

    const senderId = '87981048125'
    const setContacts = useChatStore(state => state.setContacts)
    const addMessage = useChatStore(state => state.addMessage)
    const contacts = useChatStore(state => state.contacts)
    const [ws, setWs] = useState<WebSocket | null>(null)
    const handleSendMessage = useCallback(
        (content: string) => {
            if (!selectedContact) {
                return
            }

            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(
                    JSON.stringify({
                        type: 'new-message',
                        data: {
                            senderId,
                            receiverId: selectedContact.id,
                            content: content,
                        },
                    }),
                )

                addMessage(selectedContact.id, {
                    sender: selectedContact.id,
                    content: content,
                    date: new Date().toLocaleDateString(),
                })
            }
        },
        [ws, selectedContact, addMessage],
    )

    useEffect(() => {
        if (ws) {
            return
        }

        const socket = new WebSocket('ws://localhost:4242')
        socket.onopen = () => {
            console.log('Conectado ao WebSocket')
            socket.send(
                JSON.stringify({
                    type: 'authenticate',
                    data: {
                        token: 'valid-token',
                        senderId: '87981048125',
                    },
                }),
            )
        }

        socket.onmessage = event => {
            const { status, data } = JSON.parse(event.data)
            switch (status) {
                case 'new-message':
                    const { senderId, receiverId, content } = data
                    addMessage(senderId, {
                        sender: receiverId,
                        content,
                        date: new Date().toLocaleDateString(),
                    })
                    break

                default:
                    break
            }
        }

        socket.onclose = () => {
            console.log('WebSocket desconectado')
        }

        socket.onerror = error => {
            console.error('Erro no WebSocket:', error)
        }

        setWs(socket)
    }, [ws, setWs, selectedContact, addMessage])

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                //   const response = await fetch('/api/contacts');
                //   const data: Contact[] = await response.json();
                const arr = [
                    {
                        id: '87991646160',
                        name: 'Brenda Duque',
                        lastMessage: {
                            sender: '87991646160',
                            content: 'Oi amor',
                            date: '10/08/2024',
                        },
                        messages: [
                            {
                                sender: '87991646160',
                                content: 'Oi amor',
                                date: '10/08/2024',
                            },
                            {
                                sender: '87981048125',
                                content: 'Oi linda',
                                date: '10/08/2024',
                            },
                        ],
                    },
                    {
                        id: '1',
                        name: 'Job Doe #1',
                        lastMessage: {
                            sender: '1',
                            content: 'E aí, tudo bem?',
                            date: '10/08/2024',
                        },
                    },
                    {
                        id: '2',
                        name: 'Job Doe #2',
                        lastMessage: {
                            sender: '2',
                            content: 'E aí, tudo bem?',
                            date: '10/08/2024',
                        },
                    },
                    {
                        id: '3',
                        name: 'Job Doe #3',
                        lastMessage: {
                            sender: '3',
                            content: 'E aí, tudo bem?',
                            date: '10/08/2024',
                        },
                    },
                    {
                        id: '4',
                        name: 'Job Doe #4',
                        lastMessage: {
                            sender: '4',
                            content: 'E aí, tudo bem?',
                            date: '10/08/2024',
                        },
                    },
                    {
                        id: '5',
                        name: 'Job Doe #5',
                        lastMessage: {
                            sender: '5',
                            content: 'E aí, tudo bem?',
                            date: '10/08/2024',
                        },
                    },
                    {
                        id: '6',
                        name: 'Job Doe #6',
                        lastMessage: {
                            sender: '6',
                            content: 'E aí, tudo bem?',
                            date: '10/08/2024',
                        },
                    },
                    {
                        id: '7',
                        name: 'Job Doe #7',
                        lastMessage: {
                            sender: '7',
                            content: 'E aí, tudo bem?',
                            date: '10/08/2024',
                        },
                    },
                    {
                        id: '8',
                        name: 'Job Doe #8',
                        lastMessage: {
                            sender: '8',
                            content: 'E aí, tudo bem?',
                            date: '10/08/2024',
                        },
                    },
                    {
                        id: '9',
                        name: 'Job Doe #9',
                        lastMessage: {
                            sender: '9',
                            content: 'E aí, tudo bem?',
                            date: '10/08/2024',
                        },
                    },
                    {
                        id: '10',
                        name: 'Job Doe #10',
                        lastMessage: {
                            sender: '10',
                            content: 'E aí, tudo bem?',
                            date: '10/08/2024',
                        },
                    },
                ]
                const contactsMap = new Map<string, Contact>()
                arr.forEach(contact => {
                    contactsMap.set(contact.id, contact)
                })
                setContacts(contactsMap)
                // setLoading(false)
            } catch (error) {
                console.error('Failed to fetch contacts', error)
            }
        }

        fetchContacts()
    }, [setContacts])

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
                        selectedContact={selectedContact}
                        onBackButtonClick={gotoMenu}
                        isBackButtonVisible={!isDesktopView}
                    />
                    {selectedContact && (
                        <MessageInput onSend={handleSendMessage} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatPage
