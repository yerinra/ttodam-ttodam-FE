export interface ChatRoom {
  id: string;
  name: string;
  description: string;
}

export interface ChatMessage {
  isUser: any;
  type: string;
  content: string;
  nickname?: string;
}
