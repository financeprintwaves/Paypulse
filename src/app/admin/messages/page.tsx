'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';

const initialConversations = [
  { 
    id: 1, 
    employeeName: "Jane Doe", 
    employeeId: "PP-12345", 
    subject: "Question about my last salary slip.", 
    lastMessage: "Of course. What is your question?", 
    timestamp: "2 hours ago",
    unread: true,
    messages: [
      { id: 1, text: 'Hello! How can I assist you today?', sender: 'admin' },
      { id: 2, text: 'I have a question about my last salary slip.', sender: 'user' },
      { id: 3, text: 'Of course. What is your question?', sender: 'admin' },
    ]
  },
  { 
    id: 2, 
    employeeName: "John Smith", 
    employeeId: "PP-67890", 
    subject: "Leave request for next month", 
    lastMessage: "Okay, I've submitted it for approval.", 
    timestamp: "1 day ago",
    unread: false,
    messages: [
       { id: 1, text: 'Hi, I would like to request leave...', sender: 'user' },
       { id: 2, text: "Okay, I've submitted it for approval.", sender: 'admin' },
    ]
  },
   { 
    id: 3, 
    employeeName: "Alice Johnson", 
    employeeId: "PP-24680", 
    subject: "My profile information is incorrect", 
    lastMessage: "Can you please tell me what is incorrect...", 
    timestamp: "3 days ago",
    unread: true,
    messages: [
       { id: 1, text: 'My address is wrong on my profile.', sender: 'user' },
       { id: 2, text: "Can you please tell me what is incorrect...", sender: 'admin' },
    ]
  },
];

type Conversation = typeof initialConversations[0];

export default function MessagesPage() {
    const [conversations, setConversations] = useState(initialConversations);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
    const [reply, setReply] = useState("");

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setConversations(convs => convs.map(c => c.id === conversation.id ? {...c, unread: false} : c));
    }
    
    return (
        <div className="h-[calc(100vh-4rem)] flex">
            <div className="w-1/3 border-r border-primary/20 flex flex-col">
                <div className="p-4 border-b border-primary/20">
                     <h2 className="text-xl font-bold tracking-tight text-primary">Inbox</h2>
                     <p className="text-muted-foreground text-sm">Employee Support Messages</p>
                </div>
                 <ScrollArea className="flex-1">
                    {conversations.map(conv => (
                        <div 
                            key={conv.id} 
                            onClick={() => handleSelectConversation(conv)}
                            className={cn(
                                "p-4 border-b border-primary/10 cursor-pointer hover:bg-primary/10",
                                selectedConversation?.id === conv.id && "bg-primary/20"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{conv.employeeName}</p>
                                    <p className="text-sm text-muted-foreground">{conv.subject}</p>
                                </div>
                                 {conv.unread && <div className="h-2.5 w-2.5 rounded-full bg-accent mt-1" />}
                            </div>
                            <p className="text-xs text-muted-foreground/80 truncate mt-1">{conv.lastMessage}</p>
                            <p className="text-xs text-muted-foreground/60 text-right mt-2">{conv.timestamp}</p>
                        </div>
                    ))}
                 </ScrollArea>
            </div>
            <div className="w-2/3 flex flex-col bg-background/50">
                {selectedConversation ? (
                    <>
                    <header className="p-4 border-b border-primary/20 flex items-center gap-4">
                         <Avatar>
                            <AvatarImage src={`https://placehold.co/40x40.png`} alt={selectedConversation.employeeName} data-ai-hint="person" />
                            <AvatarFallback>{selectedConversation.employeeName.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <div>
                             <p className="font-semibold">{selectedConversation.employeeName}</p>
                             <p className="text-sm text-muted-foreground">{selectedConversation.employeeId}</p>
                        </div>
                    </header>
                    <ScrollArea className="flex-1 p-4">
                         <div className="space-y-4">
                            {selectedConversation.messages.map((message) => (
                                <div key={message.id} className={cn("flex items-end gap-2", message.sender === 'admin' ? 'justify-end' : 'justify-start')}>
                                {message.sender === 'user' && (
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback>{selectedConversation.employeeName.substring(0,1)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn("max-w-[75%] rounded-lg px-3 py-2 text-sm", message.sender === 'user' ? 'rounded-bl-none bg-secondary text-secondary-foreground' : 'rounded-br-none bg-primary text-primary-foreground')}>
                                    {message.text}
                                </div>
                                {message.sender === 'admin' && (
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback>A</AvatarFallback>
                                    </Avatar>
                                )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <footer className="p-4 border-t border-primary/20">
                        <div className="relative">
                            <Textarea 
                                placeholder="Type your reply..." 
                                value={reply}
                                onChange={e => setReply(e.target.value)}
                                className="pr-12"
                            />
                            <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </footer>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        <p>Select a conversation to view messages.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
