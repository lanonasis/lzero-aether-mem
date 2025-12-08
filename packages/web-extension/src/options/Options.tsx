/**
 * Options Page
 * Settings and authentication management
 */

import React, { useState, useEffect } from 'react';
import { Save, Key, LogOut, Check, AlertCircle, Loader2 } from 'lucide-react';

export const Options: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('https://api.lanonasis.com/api/v1');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Load saved settings
    chrome.storage.local.get(['authToken', 'apiUrl'], (result) => {
      if (result.authToken) {
        setApiKey('••••••••••••••••');
        setIsAuthenticated(true);
      }
      if (result.apiUrl) {
        setApiUrl(result.apiUrl);
      }
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      // Validate API key format
      if (apiKey && !apiKey.startsWith('••') && !apiKey.startsWith('lano_') && !apiKey.startsWith('lns_')) {
        setMessage({ type: 'error', text: 'Invalid API key format. Keys should start with lano_ or lns_' });
        setIsSaving(false);
        return;
      }

      // Save settings
      const updates: Record<string, string> = { apiUrl };
      
      if (apiKey && !apiKey.startsWith('••')) {
        updates.authToken = apiKey;
      }

      await chrome.storage.local.set(updates);
      
      if (apiKey && !apiKey.startsWith('••')) {
        setIsAuthenticated(true);
        setApiKey('••••••••••••••••');
      }

      setMessage({ type: 'success', text: 'Settings saved successfully!' });

      // Trigger sync
      chrome.runtime.sendMessage({ type: 'SYNC_MEMORIES' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await chrome.storage.local.remove(['authToken']);
    setIsAuthenticated(false);
    setApiKey('');
    setMessage({ type: 'success', text: 'Logged out successfully' });
    chrome.runtime.sendMessage({ type: 'LOGOUT' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 bg-gradient-to-br from-[#007ACC] to-[#0E639C] rounded-xl flex items-center justify-center shadow-lg shadow-[#007ACC]/30">
            <span className="text-xl font-bold">L0</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">L0 Memory Settings</h1>
            <p className="text-gray-400 text-sm">Configure your memory extension</p>
          </div>
        </div>

        {/* Status */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {message.type === 'success' ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {message.text}
          </div>
        )}

        {/* Authentication */}
        <div className="bg-[#252526] border border-[#3C3C3C] rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Key className="h-5 w-5 text-[#007ACC]" />
            Authentication
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API Key
              </label>
              <input
                type={apiKey.startsWith('••') ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="lano_xxxxxxxxxxxxxxxx"
                className="w-full bg-[#1E1E1E] border border-[#3C3C3C] rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#007ACC]"
              />
              <p className="text-xs text-gray-500 mt-2">
                Get your API key from the <a href="https://lanonasis.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-[#007ACC] hover:underline">LanOnasis Dashboard</a>
              </p>
            </div>

            {isAuthenticated && (
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-400">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Connected to LanOnasis</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-[#252526] border border-[#3C3C3C] rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">API Settings</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              API URL
            </label>
            <input
              type="url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full bg-[#1E1E1E] border border-[#3C3C3C] rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#007ACC]"
            />
            <p className="text-xs text-gray-500 mt-2">
              Default: https://api.lanonasis.com/api/v1
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-gradient-to-r from-[#007ACC] to-[#0E639C] hover:shadow-lg hover:shadow-[#007ACC]/30 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Save Settings
            </>
          )}
        </button>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>L0 Memory Extension v0.1.0</p>
          <p className="mt-1">
            <a href="https://lanonasis.com" target="_blank" rel="noopener noreferrer" className="text-[#007ACC] hover:underline">
              lanonasis.com
            </a>
            {' • '}
            <a href="https://github.com/lanonasis/lzero-aether-mem" target="_blank" rel="noopener noreferrer" className="text-[#007ACC] hover:underline">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
