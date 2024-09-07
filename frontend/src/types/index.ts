export interface Contact {
  id: string
  name: string
  lastMessage?: Message
  messages?: Message[]
}

export interface Message {
  sender: string
  content: string
  date: string
}
