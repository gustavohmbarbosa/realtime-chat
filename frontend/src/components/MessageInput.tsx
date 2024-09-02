import React, { useState, KeyboardEvent } from 'react';

type MessageInputProps = {
  onSend: (message: string) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none"
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default MessageInput;
