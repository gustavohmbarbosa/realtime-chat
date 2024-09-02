import React from 'react';

type ChatWindowProps = {
  messages: { text: string; sender: string }[];
  selectedContact: string;
  onBackButtonClick: () => void;
};

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, selectedContact, onBackButtonClick }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-4 py-2 bg-gray-800 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button className="text-white font-bold flex items-center" id="buttonBack" onClick={onBackButtonClick}>
            &lt; {/* Ícone de seta */}
          </button>
          <div className="text-white font-bold">{selectedContact}</div>
        </div>
        <div className="text-sm text-gray-500">last seen recently</div>
      </div>
      <div className="flex-1 p-4 bg-gray-900 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
