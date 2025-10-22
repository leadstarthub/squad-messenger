import { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Paperclip, Smile, MoreVertical, ShoppingBag } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductCatalog from "@/components/ProductCatalog";
import EmojiPicker from "@/components/EmojiPicker";
import { useToast } from "@/hooks/use-toast";

const Conversations = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ id: number; text: string; sent: boolean; time: string }>>([
    { id: 1, text: "Olá! Como posso ajudar?", sent: false, time: "10:15" },
    { id: 2, text: "Gostaria de saber sobre o produto XYZ", sent: true, time: "10:16" },
    { id: 3, text: "Claro! O produto XYZ está disponível em estoque. Posso enviar mais detalhes?", sent: false, time: "10:17" },
    { id: 4, text: "Sim, por favor!", sent: true, time: "10:18" },
    { id: 5, text: "Enviando informações...", sent: false, time: "10:20" },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const conversations = [
    { id: 0, name: "Carlos Mendes", lastMessage: "Obrigado pela ajuda!", time: "10:23", unread: 2, avatar: "CM" },
    { id: 1, name: "Juliana Lima", lastMessage: "Qual o prazo de entrega?", time: "09:45", unread: 0, avatar: "JL" },
    { id: 2, name: "Roberto Dias", lastMessage: "Produto disponível?", time: "Yesterday", unread: 5, avatar: "RD" },
    { id: 3, name: "Sofia Alves", lastMessage: "Preciso de mais informações", time: "Yesterday", unread: 0, avatar: "SA" },
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      text: message,
      sent: true,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
  };

  const handleSendProductOrder = (orderSummary: string) => {
    const newMessage = {
      id: chatMessages.length + 1,
      text: orderSummary,
      sent: true,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    toast({
      title: "Order sent to chat",
      description: "Your product order has been added to the conversation.",
    });
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(f => f.name).join(", ");
      toast({
        title: "Files selected",
        description: `Selected: ${fileNames}`,
      });
      
      const newMessage = {
        id: chatMessages.length + 1,
        text: `📎 Attached files: ${fileNames}`,
        sent: true,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages([...chatMessages, newMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-64px)] lg:h-screen flex-col lg:flex-row">
        {/* Conversation List */}
        <div className="w-full lg:w-96 border-b lg:border-r lg:border-b-0 border-border bg-card flex flex-col max-h-[40vh] lg:max-h-none">
          <div className="p-3 md:p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`p-3 md:p-4 cursor-pointer transition-colors border-b border-border hover:bg-muted/50 ${
                  selectedChat === conv.id ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-start gap-2 md:gap-3">
                  <Avatar className="w-8 h-8 md:w-10 md:h-10">
                    <AvatarFallback className="bg-[hsl(var(--primary))] text-white text-xs md:text-sm">
                      {conv.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm md:text-base text-foreground truncate">
                        {conv.name}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {conv.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs md:text-sm text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unread > 0 && (
                        <span className="ml-2 px-1.5 md:px-2 py-0.5 text-xs font-medium bg-[hsl(var(--primary))] text-white rounded-full flex-shrink-0">
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
          <div className="bg-card border-b border-border p-3 md:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <Avatar className="w-8 h-8 md:w-10 md:h-10">
                <AvatarFallback className="bg-[hsl(var(--primary))] text-white text-xs md:text-sm">
                  {conversations[selectedChat].avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium text-sm md:text-base text-foreground">
                  {conversations[selectedChat].name}
                </h2>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10">
              <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sent ? "justify-end" : "justify-start"} animate-slide-in`}
              >
                <div className={`max-w-[85%] sm:max-w-md ${msg.sent ? "chat-bubble-sent" : "chat-bubble-received"} px-3 md:px-4 py-2 shadow-sm`}>
                  <p className="text-xs md:text-sm break-words whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sent ? "text-white/70" : "text-muted-foreground"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-card border-t border-border p-2 md:p-3 lg:p-4">
            <div className="flex items-center gap-1 md:gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10">
                    <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-[400px] p-0">
                  <ProductCatalog onSendToChat={handleSendProductOrder} />
                </SheetContent>
              </Sheet>
              
              <EmojiPicker onEmojiSelect={handleEmojiSelect}>
                <Button variant="ghost" size="icon" className="hidden sm:flex w-8 h-8 md:w-10 md:h-10">
                  <Smile className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </EmojiPicker>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept="*/*"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex w-8 h-8 md:w-10 md:h-10"
                onClick={handleFileUpload}
              >
                <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm md:text-base"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 w-8 h-8 md:w-10 md:h-10 p-0"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Conversations;
