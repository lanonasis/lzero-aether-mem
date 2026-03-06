/**
 * Mobile Welcome View
 * Aligned with desktop WelcomeView but mobile-optimized
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Globe, Cpu, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanoLogo } from './LanoLogo';

interface WelcomeViewProps {
  onLoginOAuth: () => void;
  onLoginApiKey?: (apiKey: string) => void;
  isLoading?: boolean;
  error?: string | Error | null;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onLoginOAuth,
  onLoginApiKey,
  isLoading,
  error,
}) => {
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKeyValue, setApiKeyValue] = useState('');

  const handleApiKeySubmit = () => {
    if (apiKeyValue.trim() && onLoginApiKey) {
      onLoginApiKey(apiKeyValue.trim());
    }
  };

  const features = [
    {
      icon: Lightbulb,
      title: 'Intelligent Memory',
      description: 'Vector search and semantic understanding for your codebase.',
    },
    {
      icon: Globe,
      title: 'Real-time Sync',
      description: 'Synchronized context across all your devices.',
    },
    {
      icon: Cpu,
      title: 'On-Device AI',
      description: 'ARM-optimized embeddings that work offline.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0D0D0D] px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
          <LanoLogo size={20} className="text-white" />
        </div>
        <span className="text-lg font-bold text-white">LanOnasis Memory</span>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-12 space-y-4"
      >
        <h1 className="text-3xl font-bold leading-tight text-white">
          Your Developer
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Second Brain
          </span>
        </h1>
        <p className="text-base leading-relaxed text-gray-400">
          Capture, search, and recall your development context with on-device AI.
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 rounded-xl bg-red-500/10 p-3 text-sm text-red-400"
        >
          {typeof error === 'string' ? error : error?.message}
        </motion.div>
      )}

      {/* Auth Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 space-y-3"
      >
        {showApiKeyInput && onLoginApiKey ? (
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Enter your API key (lns_...)"
              value={apiKeyValue}
              onChange={(e) => setApiKeyValue(e.target.value)}
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-gray-500"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleApiKeySubmit()}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleApiKeySubmit}
                disabled={!apiKeyValue.trim() || isLoading}
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-cyan-500"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Connect'
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowApiKeyInput(false);
                  setApiKeyValue('');
                }}
                disabled={isLoading}
                className="h-12 border-white/10 text-gray-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Button
              onClick={onLoginOAuth}
              disabled={isLoading}
              size="lg"
              className="h-14 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-base font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  Get Started
                  <ChevronUp className="ml-2 h-5 w-5 rotate-90" />
                </>
              )}
            </Button>

            {onLoginApiKey && (
              <Button
                variant="outline"
                onClick={() => setShowApiKeyInput(true)}
                disabled={isLoading}
                className="h-12 w-full border-white/10 text-gray-300"
              >
                Enter API Key
              </Button>
            )}
          </>
        )}
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 space-y-4"
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-gray-500">
          Features
        </h2>

        <div className="space-y-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                <feature.icon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-auto pt-8 text-center text-xs text-gray-600"
      >
        Powered by ARM • Works offline
      </motion.div>
    </div>
  );
};
