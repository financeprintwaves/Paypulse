'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageSquare, Send, User, Bot } from 'lucide-react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'admin';
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'admin' },
    { id: 2, text: 'I have a question about my last salary slip.', sender: 'user' },
    { id: 3, text: 'Of course. What is your question?', sender: 'admin' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
      setInput('');
      // Mock admin reply
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: "Thanks for your message. An admin will review it and get back to you shortly.", sender: 'admin'}]);
      }, 1500)
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent shadow-lg transition-transform hover:scale-110"
          aria-label="Open chat"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="w-80 rounded-lg border-2 border-primary/20 bg-card/80 p-0 backdrop-blur-sm sm:w-96">
        <div className="flex flex-col h-[28rem]">
          <header className="flex items-center gap-4 border-b p-4">
             <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="support person" />
                <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-headline text-lg font-semibold">Admin Support</p>
                <p className="text-sm text-green-400">Online</p>
            </div>
          </header>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex items-end gap-2", message.sender === 'user' ? 'justify-end' : 'justify-start')}>
                  {message.sender === 'admin' && (
                    <Avatar className="h-6 w-6">
                        <AvatarImage src="https://placehold.co/24x24.png" alt="Admin" data-ai-hint="support person" />
                        <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("max-w-[75%] rounded-lg px-3 py-2 text-sm", message.sender === 'user' ? 'rounded-br-none bg-primary text-primary-foreground' : 'rounded-bl-none bg-secondary text-secondary-foreground')}>
                    {message.text}
                  </div>
                   {message.sender === 'user' && (
                    <Avatar className="h-6 w-6">
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <footer className="border-t p-4">
            <div className="relative">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}
