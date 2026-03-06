/**
 * Mobile Chat Interface
 * Aligned with desktop ChatInterface but mobile-optimized (sheet-based)
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
  Cpu,
  Cloud,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Memory } from '@lanonasis/shared';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  memories?: Memory[];
  timestamp: Date;
  searchMode?: 'local' | 'cloud' | 'text';
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  memories: Memory[];
  onSearch: (query: string) => Promise<Memory[]>;
  aiReady: boolean;
  embed: ((text: string) => Promise<number[]>) | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isOpen,
  onClose,
  memories,
  onSearch,
  aiReady,
  embed,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "I'm your AI Memory Assistant powered by semantic search. I can help you find memories using natural language.\n\n**Try asking:**\n• \"Find notes about API authentication\"\n• \"What did I save about React?\"\n• \"Show me recent code snippets\"\n\n*Using on-device AI when available, cloud AI as fallback.*",
      timestamp: new Date(),
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
      let relevantMemories: Memory[] = [];
      let usedMode: 'local' | 'cloud' | 'text' = 'text';

      // Strategy 1: Try semantic search
      if (aiReady && embed) {
        try {
          console.log('🔍 Using LOCAL AI for semantic search...');
          await embed(userMessage.content);
          relevantMemories = await onSearch(userMessage.content);
          usedMode = 'local';
        } catch (err) {
          console.warn('Local search failed, trying cloud...', err);
        }
      }

      // Strategy 2: Fall back to text search
      if (relevantMemories.length === 0) {
        console.log('☁️ Using CLOUD search...');
        try {
          relevantMemories = await onSearch(userMessage.content);
          usedMode = relevantMemories.length > 0 ? 'cloud' : 'text';
        } catch (err) {
          console.error('Cloud search failed:', err);
        }
      }

      // Strategy 3: Text-based fallback
      if (relevantMemories.length === 0) {
        const query = userMessage.content.toLowerCase();
        relevantMemories = memories.filter(
          (m) =>
            m.title.toLowerCase().includes(query) ||
            m.content.toLowerCase().includes(query)
        );
        usedMode = 'text';
      }

      // Generate response
      let responseContent = '';
      if (relevantMemories.length > 0) {
        responseContent = `I found ${relevantMemories.length} relevant memory${
          relevantMemories.length > 1 ? 'ies' : 'y'
        }:\n\n`;
        relevantMemories.slice(0, 5).forEach((memory, i) => {
          responseContent += `${i + 1}. **${memory.title}** (${memory.type})\n`;
          const snippet =
            memory.content?.slice(0, 100).replace(/\n/g, ' ') || '';
          responseContent += `   ${snippet}${
            memory.content?.length > 100 ? '...' : ''
          }\n\n`;
        });
      } else {
        responseContent =
          "I couldn't find any memories matching your query. Try:\n\n" +
          '• Using different keywords\n' +
          '• Being more specific\n' +
          '• Creating a new memory with this information';
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        memories: relevantMemories.slice(0, 5),
        timestamp: new Date(),
        searchMode: usedMode,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            'Sorry, I encountered an error while searching. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const getModeIcon = (mode?: 'local' | 'cloud' | 'text') => {
    switch (mode) {
      case 'local':
        return <Cpu className="h-3 w-3" />;
      case 'cloud':
        return <Cloud className="h-3 w-3" />;
      default:
        return <Sparkles className="h-3 w-3" />;
    }
  };

  const getModeLabel = (mode?: 'local' | 'cloud' | 'text') => {
    switch (mode) {
      case 'local':
        return 'On-Device AI';
      case 'cloud':
        return 'Cloud AI';
      default:
        return 'Text Search';
    }
  };

  const getModeColor = (mode?: 'local' | 'cloud' | 'text') => {
    switch (mode) {
      case 'local':
        return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'cloud':
        return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      default:
        return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col bg-[#0D0D0D]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-400" />
                <span className="font-semibold text-white">AI Assistant</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={onClose}
                className="h-8 w-8 text-gray-400"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto p-4"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                      message.role === 'user'
                        ? 'bg-blue-500/20'
                        : 'bg-purple-500/20'
                    )}
                  >
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-blue-400" />
                    ) : (
                      <Bot className="h-4 w-4 text-purple-400" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[80%] space-y-2',
                      message.role === 'user' ? 'items-end' : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        'rounded-2xl px-4 py-3 text-sm',
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-gray-200'
                      )}
                    >
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className={line.startsWith('**') ? 'font-semibold' : ''}>
                          {line.replace(/\*\*/g, '')}
                        </p>
                      ))}
                    </div>
                    {message.searchMode && (
                      <Badge
                        variant="outline"
                        className={cn(
                          'flex items-center gap-1 text-[10px]',
                          getModeColor(message.searchMode)
                        )}
                      >
                        {getModeIcon(message.searchMode)}
                        {getModeLabel(message.searchMode)}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                    <Bot className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm text-gray-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your memories..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="h-12 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:outline-none"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isThinking}
                  className="h-12 w-12 shrink-0 rounded-xl bg-blue-500 p-0"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
