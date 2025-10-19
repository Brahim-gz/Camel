export interface Message {
  id: number | null;
  content: String;
  resp: String;
  timestamp: number;
}
export interface Conversation {
  id: number | null;
  name: String;
  archived: Boolean;
  messages: Message[];
}

export interface User {
  id: number | null;
  firstName: String;
  lastName: String;
  email: string;
  password: String;
  conversations: Conversation[];
}
