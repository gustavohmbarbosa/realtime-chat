import { useState, useEffect  } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';

const ChatPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false); // Estado para controlar a visibilidade da barra latera

  const [contacts] = useState([
    { name: 'Brenda Duque', lastMessage: 'Oi amor', date: '10/08/2024' },
    { name: 'Job Doe #1', Message: 'E aí, tudo bem?', date: '10/08/2024' },
    { name: 'Job Doe #2', Message: 'E aí, tudo bem?', date: '10/08/2024' },
    { name: 'Job Doe #3', Message: 'E aí, tudo bem?', date: '10/08/2024' },
    { name: 'Job Doe #4', Message: 'E aí, tudo bem?', date: '10/08/2024' },
    { name: 'Job Doe #5', Message: 'E aí, tudo bem?', date: '10/08/2024' },
    { name: 'Job Doe #6', Message: 'E aí, tudo bem?', date: '10/08/2024' },
    { name: 'Job Doe #7', Message: 'E aí, tudo bem?', date: '10/08/2024' },
    { name: 'Job Doe #8', Message: 'E aí, tudo bem?', date: '10/08/2024' },
    { name: 'Job Doe #9', Message: 'E aí, tudo bem?', date: '10/08/2024' },
    { name: 'Job Doe #10', Message: 'E aí, tudo bem?', date: '10/08/2024' },
  ]);
  const [selectedContact, setSelectedContact] = useState(contacts[0].name);
  const [messages, setMessages] = useState([
    { text: 'Oi!', sender: 'me' },
    { text: 'Oi amor!', sender: 'Brenda Duque' },
  ]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: 'me' }]);
  };

  useEffect(() => {
    const handleResize = () => {
      const chatSideBar = document.getElementById('chatSideBar');
      if (window.innerWidth >= 1301) {
        if (chatSideBar) {
          chatSideBar.classList.add('md:w-1/4');
          chatSideBar.classList.remove('divWidth');
        } else {
          chatSideBar.classList.remove('md:w-1/4');
          chatSideBar.classList.add('divWidth');
        }
      } 
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebarAndMessage = () => {
    const divMessage = document.getElementById('divMessage');
    divMessage.classList.add('divHidden');
    divMessage.classList.remove('divVisible');

    const chatSideBar = document.getElementById('chatSideBar');
    chatSideBar.classList.add('divVisible');
    chatSideBar.classList.remove('divHidden');
    chatSideBar.classList.remove('md:w-1/4');
    chatSideBar.classList.add('divWidth');
  };

  return (
    <>
     <style>
        {`
          @media (max-width: 1300px) {
            #chatSideBar {
              display: none;
              width: 100%;
            }
            #buttonBack {
              display: block;
            }
          }

          @media (min-width: 1301px) {
            #buttonBack {
              display: none !important;
            }
            #chatSideBar {
              display: block !important;
            }
            #divMessage {
              display: flex !important;
            }
          }

          .divVisible {
            display: block !important;
          }

          .divHidden {
            display: none !important;
          }

          .divWidth {
            width: 100%;
          }
        `}
      </style>

    <div className="flex flex-col  md:flex-row h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
          <ChatSidebar
            contacts={contacts}
            selectedContact={selectedContact}
            onSelect={(contact) => {
              setSelectedContact(contact);
              setSidebarVisible(false);
              const divMessage = document.getElementById('divMessage');
              divMessage.classList.remove('divHidden');

              const chatSideBar = document.getElementById('chatSideBar');
              chatSideBar.classList.add('divHidden');
            }}
          />
        <div className="flex flex-col w-full" id="divMessage">
          <ChatWindow messages={messages} selectedContact={selectedContact} onBackButtonClick={toggleSidebarAndMessage}/>
          <MessageInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatPage;
