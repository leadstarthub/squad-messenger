import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Paperclip, Smile, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Conversations = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  const conversations = [
    { id: 0, name: "Carlos Mendes", lastMessage: "Obrigado pela ajuda!", time: "10:23", unread: 2, avatar: "CM" },
    { id: 1, name: "Juliana Lima", lastMessage: "Qual o prazo de entrega?", time: "09:45", unread: 0, avatar: "JL" },
    { id: 2, name: "Roberto Dias", lastMessage: "Produto disponível?", time: "Yesterday", unread: 5, avatar: "RD" },
    { id: 3, name: "Sofia Alves", lastMessage: "Preciso de mais informações", time: "Yesterday", unread: 0, avatar: "SA" },
  ];

  const messages = [
    { id: 1, text: "Olá! Como posso ajudar?", sent: false, time: "10:15" },
    { id: 2, text: "Gostaria de saber sobre o produto XYZ", sent: true, time: "10:16" },
    { id: 3, text: "Claro! O produto XYZ está disponível em estoque. Posso enviar mais detalhes?", sent: false, time: "10:17" },
    { id: 4, text: "Sim, por favor!", sent: true, time: "10:18" },
    { id: 5, text: "Enviando informações...", sent: false, time: "10:20" },
  ];

  return (
    <DashboardLayout>
      <div className="flex h-screen">
        {/* Conversation List */}
        <div className="w-96 border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-background"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`p-4 cursor-pointer transition-colors border-b border-border hover:bg-muted/50 ${
                  selectedChat === conv.id ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-[hsl(var(--primary))] text-white">
                      {conv.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground truncate">
                        {conv.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {conv.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unread > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-[hsl(var(--primary))] text-white rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[hsl(var(--chat-bg))]">
          {/* Chat Header */}
          <div className="bg-card border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[hsl(var(--primary))] text-white">
                  {conversations[selectedChat].avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium text-foreground">
                  {conversations[selectedChat].name}
                </h2>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sent ? "justify-end" : "justify-start"} animate-slide-in`}
              >
                <div className={`max-w-md ${msg.sent ? "chat-bubble-sent" : "chat-bubble-received"} px-4 py-2 shadow-sm`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sent ? "text-white/70" : "text-muted-foreground"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-card border-t border-border p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Smile className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Conversations;
