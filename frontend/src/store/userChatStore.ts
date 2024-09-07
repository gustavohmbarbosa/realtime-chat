import { create } from 'zustand';
import { Contact, Message } from '@/types';

interface ChatState {
  contacts: Map<string, Contact>;
  setContacts: (contacts: Map<string, Contact>) => void;
  addMessage: (contactId: string, message: Message) => void;
}

export const useChatStore = create<ChatState>(set => ({
  contacts: new Map(),
  setContacts: contacts => set({ contacts }),
  addMessage: (contactId, message) => set(state => {
    let contact = state.contacts.get(contactId);
    if (contact) {
      contact.messages = contact.messages || [];
      contact.messages.push(message);
      contact.lastMessage = message; 
    } else {
      contact = {
        id: contactId,
        name: 'Unknown',
        lastMessage: message,
        messages: [message],
      };
    }
    state.contacts.set(contactId, contact);

    return { contacts: new Map(state.contacts) };
  }),
}));
