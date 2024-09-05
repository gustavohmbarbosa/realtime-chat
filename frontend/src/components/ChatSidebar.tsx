import React from 'react';

type ChatSidebarProps = {
  contacts: { name: string; lastMessage: string; date: string }[];
  selectedContact: string;
  onSelect: (contact: string) => void;
  isVisible: boolean;
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({ contacts, selectedContact, onSelect, isVisible }) => {
  return (
    <div className={`w-full ${ isVisible ? "md:w-1/3" : "hidden"} bg-gray-800 border-r border-gray-700 overflow-y-auto`}>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none"
        />
      </div>
      {contacts.map((contact, index) => (
        <div
          key={index}
          className={`flex items-center p-4 hover:bg-gray-700 cursor-pointer ${
            selectedContact === contact.name ? 'bg-gray-700' : ''
          }`}
          onClick={() => onSelect(contact.name)}
        >
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {contact.name[0]}
          </div>
          <div className="ml-4">
            <div className="font-semibold">{contact.name}</div>
            <div className="text-sm text-gray-400">{contact.lastMessage}</div>
          </div>
          <div className="ml-auto text-xs text-gray-500">{contact.date}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
