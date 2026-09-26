/**
 * Options / Sign-in Page
 *
 * Three states:
 *   1. First-run  → welcome screen with auth CTA (matches demo WelcomeView)
 *   2. Authenticated → compact dashboard with account + settings
 *   3. Saving / error → inline status messages
 *
 * Functional parity preserved:
 *   - API key / bearer token validation (lano_/lns_/JWT)
 *   - API URL normalization
 *   - AI mode (off/auto/on)
 *   - Host-permission request for non-default origins
 *   - Logout + SYNC_MEMORIES trigger
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  Key,
  LogOut,
  Check,
  AlertCircle,
  Loader2,
  Globe,
  Cpu,
  ArrowRight,
  Sparkles,
  Lock,
  Shield,
  Zap,
  Eye,
  EyeOff,
  RefreshCw,
  ChevronRight,
  Terminal,
  Monitor,
  Activity,
  X,
} from 'lucide-react';

// ---------- types ----------

import type { DiagnosticCheck, DiagnosticResult } from '../background/diagnostics';

// ---------- helpers ----------

function normalizeApiUrl(raw: string): { ok: true; value: string; changed: boolean } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, error: 'API URL is required' };
  try {
    const u = new URL(trimmed);
    const normalized = u.origin;
    return { ok: true, value: normalized, changed: normalized !== trimmed };
  } catch {
    return { ok: false, error: 'Invalid API URL' };
  }
}

function looksLikeJwt(raw: string): boolean {
  const parts = raw.trim().split('.');
  if (parts.length !== 3) return false;
  return parts.every(part => /^[A-Za-z0-9_-]+$/.test(part));
}

async function ensureHostPermissionForOrigin(origin: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const pattern = `${origin}/*`;
  if (!chrome.permissions?.contains || !chrome.permissions?.request) {
    return { ok: true };
  }
  try {
    const already = await chrome.permissions.contains({ origins: [pattern] });
    if (already) return { ok: true };
    const granted = await chrome.permissions.request({ origins: [pattern] });
    return granted ? { ok: true } : { ok: false, error: `Permission denied for ${origin}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Permission check/request failed' };
  }
}

const cn = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(' ');

// ---------- small visual primitives ----------

const GradientOrb: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      'h-14 w-14 rounded-2xl flex items-center justify-center',
      'bg-gradient-to-br from-[#007ACC] to-[#0E639C]',
      'shadow-lg shadow-[#007ACC]/30',
      className,
    )}
  >
    <span className="text-xl font-bold text-white tracking-tight">L0</span>
  </div>
);

const PulseDot: React.FC<{ color?: string }> = ({ color = 'bg-green-500' }) => (
  <span className="relative flex h-2 w-2">
    <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping', color)} />
    <span className={cn('relative inline-flex rounded-full h-2 w-2', color)} />
  </span>
);

const StatusBanner: React.FC<{ type: 'success' | 'error'; text: string }> = ({ type, text }) => (
  <div
    className={cn(
      'p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2',
      type === 'success'
        ? 'bg-green-500/10 border border-green-500/30 text-green-300'
        : 'bg-red-500/10 border border-red-500/30 text-red-300',
    )}
  >
    {type === 'success' ? (
      <Check className="h-5 w-5 shrink-0" />
    ) : (
      <AlertCircle className="h-5 w-5 shrink-0" />
    )}
    <span className="text-sm">{text}</span>
  </div>
);

// ---------- diagnostics results panel ----------

const statusColors: Record<DiagnosticCheck['status'], string> = {
  healthy: 'bg-green-500',
  degraded: 'bg-yellow-500',
  critical: 'bg-red-500',
};

const DiagnosticResults: React.FC<{
  result: DiagnosticResult;
  onDismiss: () => void;
}> = ({ result, onDismiss }) => (
  <div className="mt-6 space-y-3 animate-in fade-in duration-300">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
        <Activity className="h-4 w-4 text-[#007ACC]" />
        Diagnostics
      </h3>
      <button onClick={onDismiss} className="text-gray-500 hover:text-gray-300 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>

    <div className="rounded-xl border border-[#2D2D2D] bg-[#1E1E1E] divide-y divide-[#2D2D2D]">
      {/* Overall status header */}
      <div
        className={cn(
          'flex items-center gap-3 p-3',
          result.overall === 'healthy'
            ? 'bg-green-500/10 border-b border-green-500/20'
            : result.overall === 'degraded'
              ? 'bg-yellow-500/10 border-b border-yellow-500/20'
              : 'bg-red-500/10 border-b border-red-500/20',
        )}
      >
        <span
          className={cn(
            'relative flex h-2.5 w-2.5',
            statusColors[result.overall],
          )}
        >
          <span
            className={cn(
              'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
              statusColors[result.overall],
            )}
          />
          <span className={cn('relative inline-flex rounded-full h-2.5 w-2.5', statusColors[result.overall])} />
        </span>
        <span className="text-xs font-medium text-gray-300">
          {result.overall === 'healthy'
            ? 'All checks passed'
            : result.overall === 'degraded'
              ? 'Some checks degraded'
              : 'Issues detected'}
        </span>
        <span className="ml-auto text-[10px] text-gray-500 font-mono">
          {new Date(result.timestamp).toLocaleTimeString()}
        </span>
      </div>

      {/* Individual checks */}
      {result.checks.map((check) => (
        <div key={check.name} className="flex items-start gap-3 p-3">
          <span className={cn('relative flex h-2 w-2 mt-1 shrink-0', statusColors[check.status])}>
            <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-75', statusColors[check.status])} />
            <span className={cn('relative inline-flex rounded-full h-2 w-2', statusColors[check.status])} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-white">{check.name}</span>
              {check.action && (
                <span className="text-[10px] text-[#007ACC] hover:underline cursor-pointer shrink-0">
                  {check.action}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">{check.detail}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ---------- welcome (first-run / unauthenticated) ----------

const WelcomeView: React.FC<{ onContinue: () => void; apiUrl: string }> = ({ onContinue, apiUrl }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center text-center space-y-5 pt-2">
        <div className="relative">
          <div className="absolute inset-0 bg-[#007ACC]/20 blur-2xl rounded-full" />
          <GradientOrb className="relative h-16 w-16" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Your memory awaits</h1>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Store, search, and recall your development context across every tool you use —
            right from your browser.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
        {[
          { icon: Sparkles, label: 'Semantic search', color: 'text-yellow-400' },
          { icon: Lock, label: 'Scoped keys', color: 'text-green-400' },
          { icon: Zap, label: 'Offline-first', color: 'text-blue-400' },
        ].map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#1E1E1E] border border-[#2D2D2D]"
          >
            <Icon className={cn('h-4 w-4', color)} />
            <span className="text-[10px] text-gray-400 text-center">{label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 max-w-lg mx-auto">
        <p className="text-[10px] text-[#666666] text-center font-medium uppercase tracking-wider">
          Quick start
        </p>
        <div className="space-y-1.5">
          {[
            { n: 1, text: 'Generate an API key from the LanOnasis dashboard' },
            { n: 2, text: 'Paste it below — we’ll handle the rest' },
            { n: 3, text: 'Right-click any text on the web to save it as a memory' },
          ].map(({ n, text }) => (
            <div
              key={n}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-[#1E1E1E]/60 border border-[#2D2D2D]"
            >
              <div className="h-6 w-6 rounded-full bg-[#007ACC]/15 text-[#007ACC] flex items-center justify-center text-xs font-bold shrink-0">
                {n}
              </div>
              <span className="text-xs text-gray-300">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={onContinue}
          className={cn(
            'group bg-gradient-to-r from-[#007ACC] to-[#0E639C] text-white font-medium',
            'px-6 py-3 rounded-lg flex items-center gap-2',
            'hover:shadow-lg hover:shadow-[#007ACC]/30 transition-all',
          )}
        >
          <span>Connect to Memory</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <p className="text-[10px] text-[#555] text-center">
        API endpoint: <span className="text-[#888] font-mono">{apiUrl}</span>
      </p>
    </div>
  );
};

// ---------- auth form (the actual "sign in") ----------

type AuthFormProps = {
  apiKey: string;
  setApiKey: (v: string) => void;
  apiUrl: string;
  setApiUrl: (v: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSaving: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({
  apiKey,
  setApiKey,
  apiUrl,
  setApiUrl,
  onSubmit,
  onBack,
  isSaving,
}) => {
  const [showKey, setShowKey] = useState(false);
  const masked = apiKey.startsWith('••');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-bold text-white">Connect your account</h2>
        <p className="text-xs text-gray-400">
          Paste an API key or bearer token. We’ll validate the format and save it locally.
        </p>
      </div>

      {/* API Key */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium text-gray-300">
          <Key className="h-3.5 w-3.5 text-[#007ACC]" />
          API Key or Bearer Token
        </label>
        <div className="relative">
          <input
            type={showKey || !masked ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="lano_xxxxxxxxxxxxxxxx or eyJ..."
            className={cn(
              'w-full bg-[#1E1E1E] border border-[#3C3C3C] rounded-lg',
              'pl-4 pr-11 py-3 text-sm text-white font-mono',
              'placeholder:text-gray-600',
              'focus:outline-none focus:border-[#007ACC] focus:ring-1 focus:ring-[#007ACC]/30',
              'transition-all',
            )}
          />
          <button
            type="button"
            onClick={() => setShowKey((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            aria-label={showKey ? 'Hide key' : 'Show key'}
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Get one from the{' '}
          <a
            href="https://lanonasis.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#007ACC] hover:underline"
          >
            LanOnasis Dashboard
          </a>
          . Keys starting with <code className="text-[#888]">lano_</code> or{' '}
          <code className="text-[#888]">lns_</code> are accepted, plus raw JWTs.
        </p>
      </div>

      {/* API URL */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium text-gray-300">
          <Globe className="h-3.5 w-3.5 text-[#007ACC]" />
          API URL
        </label>
        <input
          type="url"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          className={cn(
            'w-full bg-[#1E1E1E] border border-[#3C3C3C] rounded-lg',
            'px-4 py-3 text-sm text-white font-mono',
            'focus:outline-none focus:border-[#007ACC] focus:ring-1 focus:ring-[#007ACC]/30',
            'transition-all',
          )}
        />
        <p className="text-[10px] text-gray-500">
          Defaults to the LanOnasis cloud. Override for self-hosted.
        </p>
      </div>

      <button
        onClick={onSubmit}
        disabled={isSaving || !apiKey.trim()}
        className={cn(
          'w-full bg-gradient-to-r from-[#007ACC] to-[#0E639C] text-white font-medium',
          'py-3 rounded-lg flex items-center justify-center gap-2',
          'hover:shadow-lg hover:shadow-[#007ACC]/30 transition-all',
          'disabled:opacity-50 disabled:cursor-not-allowed',
        )}
      >
        {isSaving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting…
          </>
        ) : (
          <>
            <Shield className="h-4 w-4" />
            Connect & Sync
          </>
        )}
      </button>

      <p className="text-[10px] text-center text-gray-600 leading-relaxed">
        Your key is stored only in this browser via{' '}
        <code className="text-[#888]">chrome.storage.local</code>. It is never sent to a third party.
      </p>
    </div>
  );
};

// ---------- authenticated dashboard ----------

type DashboardProps = {
  apiUrl: string;
  authType: string | null;
  aiMode: 'off' | 'auto' | 'on';
  setAiMode: (m: 'off' | 'auto' | 'on') => void;
  onResync: () => void;
  onDisconnect: () => void;
  isResyncing: boolean;
  onRunDiagnostics: () => void;
  isRunningDiagnostics: boolean;
};

const ConnectedDashboard: React.FC<DashboardProps> = ({
  apiUrl,
  authType,
  aiMode,
  setAiMode,
  onResync,
  onDisconnect,
  isResyncing,
  onRunDiagnostics,
  isRunningDiagnostics,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Status hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[#007ACC]/30 bg-gradient-to-br from-[#007ACC]/10 via-[#0E639C]/5 to-transparent p-5">
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#007ACC]/20 blur-3xl pointer-events-none" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PulseDot color="bg-green-500" />
            <div>
              <p className="text-sm font-semibold text-white">
                Connected to LanOnasis
                {authType && (
                  <span className="ml-2 text-[10px] bg-[#007ACC]/20 text-[#007ACC] px-2 py-0.5 rounded-full font-medium">
                    {authType === 'oauth' ? 'OAuth' : 'API Key'}
                  </span>
                )}
              </p>
              <p className="text-[10px] text-gray-400 font-mono">{apiUrl}</p>
            </div>
          </div>
          <button
            onClick={onDisconnect}
            className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Disconnect
          </button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onResync}
          disabled={isResyncing}
          className={cn(
            'group p-4 rounded-xl border border-[#2D2D2D] bg-[#1E1E1E]',
            'hover:border-[#007ACC]/50 hover:bg-[#252526] transition-all text-left',
            'disabled:opacity-50',
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {isResyncing ? (
              <Loader2 className="h-4 w-4 text-[#007ACC] animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 text-[#007ACC]" />
            )}
            <span className="text-xs font-semibold text-white">Sync now</span>
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Pull the latest memories from your account.
          </p>
        </button>

        <a
          href="https://lanonasis.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-4 rounded-xl border border-[#2D2D2D] bg-[#1E1E1E] hover:border-[#007ACC]/50 hover:bg-[#252526] transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="h-4 w-4 text-[#007ACC]" />
            <span className="text-xs font-semibold text-white">Dashboard</span>
            <ChevronRight className="h-3 w-3 text-gray-500 ml-auto group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Manage keys, projects, and billing.
          </p>
        </a>
      </div>

      {/* AI mode */}
      <div className="rounded-xl border border-[#2D2D2D] bg-[#1E1E1E] p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-[#007ACC]" />
          <h3 className="text-xs font-semibold text-white">On-Device AI</h3>
        </div>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Runs a small embedding model in an offscreen document for offline semantic search.
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {(
            [
              { v: 'off', label: 'Off', desc: 'API only' },
              { v: 'auto', label: 'Auto', desc: 'Offline only' },
              { v: 'on', label: 'On', desc: 'Always' },
            ] as const
          ).map(({ v, label, desc }) => (
            <button
              key={v}
              onClick={() => setAiMode(v)}
              className={cn(
                'px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left',
                aiMode === v
                  ? 'bg-[#007ACC] text-white shadow-lg shadow-[#007ACC]/20'
                  : 'bg-[#252526] text-gray-400 hover:bg-[#2D2D2D]',
              )}
            >
              <div>{label}</div>
              <div className={cn('text-[9px] mt-0.5', aiMode === v ? 'text-white/70' : 'text-gray-600')}>
                {desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Privacy reminder */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-[#1E1E1E]/50 border border-[#2D2D2D]">
        <Shield className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Your key is stored locally only. Sync sends only memory metadata to{' '}
          <span className="text-gray-400 font-mono">{apiUrl}</span>.
        </p>
      </div>

      {/* Run diagnostics */}
      <button
        onClick={onRunDiagnostics}
        disabled={isRunningDiagnostics}
        className={cn(
          'w-full group p-3 rounded-xl border border-[#2D2D2D] bg-[#1E1E1E] hover:border-[#007ACC]/50 transition-all text-left flex items-center justify-center gap-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
        )}
      >
        {isRunningDiagnostics ? (
          <>
            <Loader2 className="h-4 w-4 text-[#007ACC] animate-spin" />
            <span className="text-xs text-gray-300">Running diagnostics…</span>
          </>
        ) : (
          <>
            <Activity className="h-4 w-4 text-[#007ACC] group-hover:text-[#007ACC]/80" />
            <span className="text-xs font-medium text-gray-300">Run Diagnostics</span>
          </>
        )}
      </button>
    </div>
  );
};

// ---------- auth method selection (OAuth vs API key) ----------

type AuthMethodViewProps = {
  apiUrl: string;
  onSelectApiKey: () => void;
  onSelectOAuth: () => void;
  onBack: () => void;
};

const AuthMethodView: React.FC<AuthMethodViewProps> = ({
  apiUrl,
  onSelectApiKey,
  onSelectOAuth,
  onBack,
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="flex items-center gap-3">
      <button
        onClick={onBack}
        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
      >
        ← Back
      </button>
    </div>

    <div className="space-y-1">
      <h2 className="text-lg font-bold text-white">Connect your account</h2>
      <p className="text-xs text-gray-400">
        Choose how you want to sign in to L0 Memory.
      </p>
    </div>

    {/* OAuth option */}
    <button
      onClick={onSelectOAuth}
      className="w-full group p-5 rounded-xl border border-[#2D2D2D] bg-[#1E1E1E] hover:border-[#007ACC]/50 hover:bg-[#252526] transition-all text-left"
    >
      <div className="flex items-center gap-3 mb-2">
        <Monitor className="h-5 w-5 text-[#007ACC]" />
        <div>
          <span className="text-sm font-semibold text-white">Connect in Browser</span>
          <span className="ml-2 text-[10px] bg-[#007ACC]/20 text-[#007ACC] px-2 py-0.5 rounded-full font-medium">
            Recommended
          </span>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 leading-relaxed">
        Authenticate via OAuth2 with your LanOnasis account. We open a browser tab
        and wait for your confirmation — no manual key copying.
      </p>
    </button>

    {/* API key option */}
    <button
      onClick={onSelectApiKey}
      className="w-full group p-5 rounded-xl border border-[#2D2D2D] bg-[#1E1E1E] hover:border-[#007ACC]/50 hover:bg-[#252526] transition-all text-left"
    >
      <div className="flex items-center gap-3 mb-2">
        <Key className="h-5 w-5 text-[#007ACC]" />
        <div>
          <span className="text-sm font-semibold text-white">Enter API Key</span>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 leading-relaxed">
        Paste an API key or bearer token. Useful for service accounts or self-hosted
        setups where you manage keys manually.
      </p>
    </button>

    <p className="text-[10px] text-center text-gray-600 leading-relaxed">
      API endpoint: <span className="text-[#888] font-mono">{apiUrl}</span>
    </p>
  </div>
);

// ---------- device code flow (OAuth) ----------

type DeviceCodeViewProps = {
  userCode: string;
  verificationUri: string;
  onCancel: () => void;
  onExpire: () => void;
  onError: (msg: string) => void;
};

const DeviceCodeView: React.FC<DeviceCodeViewProps> = ({
  userCode,
  verificationUri,
  onCancel,
  onExpire,
  onError,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onError('Failed to copy code');
    }
  };

  const handleOpenBrowser = () => {
    // Open in a new tab — extension pages can't directly open arbitrary URLs
    // in Chrome extensions without explicit permission, but verification_uri
    // should be allowed via host_permissions.
    chrome.tabs.create({ url: verificationUri });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← Cancel
        </button>
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-bold text-white">Authorize in browser</h2>
        <p className="text-xs text-gray-400">
          Open the link below in your browser and enter this code to authenticate.
        </p>
      </div>

      {/* Code display */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-[#1E1E1E] border border-[#3C3C3C]">
        <code className="text-2xl font-bold tracking-[0.3em] text-[#007ACC] flex-1 text-center">
          {userCode}
        </code>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1 rounded-lg border border-[#3C3C3C]"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={handleOpenBrowser}
          className={cn(
            'w-full bg-gradient-to-r from-[#007ACC] to-[#0E639C] text-white font-medium',
            'py-3 rounded-lg flex items-center justify-center gap-2',
            'hover:shadow-lg hover:shadow-[#007ACC]/30 transition-all',
          )}
        >
          <Monitor className="h-4 w-4" />
          Open Auth Page
        </button>

        <div className="text-center space-y-1">
          <p className="text-[10px] text-gray-500">
            Waiting for authorization in browser…
          </p>
          <p className="text-[10px] text-gray-600">
            Don't close this tab — we'll update automatically once you authorize.
          </p>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center gap-2 py-2">
        <Loader2 className="h-4 w-4 text-[#007ACC] animate-spin" />
        <span className="text-xs text-gray-400">Polling for completion…</span>
      </div>
    </div>
  );
};

// ---------- main component ----------

export const Options: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('https://api.lanonasis.com');
  const [aiMode, setAiMode] = useState<'off' | 'auto' | 'on'>('auto');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authType, setAuthType] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isResyncing, setIsResyncing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showAuthMethodSelect, setShowAuthMethodSelect] = useState(false);
  const [showDeviceCode, setShowDeviceCode] = useState(false);
  const [deviceCode, setDeviceCode] = useState<{
    user_code: string;
    verification_uri: string;
    verification_uri_complete: string;
  } | null>(null);
  const [deviceError, setDeviceError] = useState<string | null>(null);
  const [deviceSuccess, setDeviceSuccess] = useState(false);
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult | null>(null);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);

  // Load saved settings and check auth status
  useEffect(() => {
    const loadSettings = async () => {
      const { l0_auth_token, apiUrl: storedApiUrl, aiMode: storedAiMode } = await chrome.storage.local.get([
        'l0_auth_token',
        'apiUrl',
        'aiMode',
        'l0_oauth_token',
        'l0_oauth_credential_type',
      ]);

      if (l0_auth_token) {
        setApiKey('••••••••••••••••');
        setIsAuthenticated(true);
        setAuthType('apiKey');
      }
      if (storedApiUrl) setApiUrl(storedApiUrl);
      if (storedAiMode === 'off' || storedAiMode === 'auto' || storedAiMode === 'on') {
        setAiMode(storedAiMode);
      }

      // Check OAuth auth status
      try {
        const authStatus = await chrome.runtime.sendMessage({ type: 'GET_AUTH_STATUS' });
        if (authStatus?.isAuthenticated && !l0_auth_token) {
          setIsAuthenticated(true);
          setAuthType(authStatus.authType || 'oauth');
        }
        if (!l0_auth_token && !authStatus?.isAuthenticated) {
          setIsAuthenticated(false);
          setAuthType(null);
        }
      } catch {
        // Fallback: if OAuth token exists but message failed
        if (storedApiUrl && !l0_auth_token) {
          setIsAuthenticated(false);
          setAuthType(null);
        }
      }
    };
    void loadSettings();
  }, []);

  // Poll for device code completion
  useEffect(() => {
    if (!showDeviceCode || !deviceCode) return;

    const checkAuth = async () => {
      try {
        const status = await chrome.runtime.sendMessage({ type: 'GET_AUTH_STATUS' });
        if (status?.isAuthenticated && status.authType === 'oauth') {
          setDeviceSuccess(true);
          setIsAuthenticated(true);
          setAuthType('oauth');
          setMessage({ type: 'success', text: 'Authenticated successfully via browser!' });
          chrome.runtime.sendMessage({ type: 'SYNC_MEMORIES' });

          // Close the options page after a delay
          setTimeout(() => {
            window.close();
          }, 2000);
          return;
        }
        // Also check if API key was set (shouldn't happen during device flow, but be safe)
        if (status?.isAuthenticated && status.authType === 'apiKey') {
          setDeviceSuccess(true);
          setIsAuthenticated(true);
          setAuthType('apiKey');
          setMessage({ type: 'success', text: 'Authenticated successfully!' });
        }
      } catch {
        // Silently retry
      }
    };

    // Check every 3 seconds
    const interval = setInterval(checkAuth, 3000);
    // Also check immediately
    void checkAuth();

    return () => clearInterval(interval);
  }, [showDeviceCode, deviceCode]);

  // Persist AI mode independently of credential changes
  useEffect(() => {
    chrome.storage.local.set({ aiMode });
  }, [aiMode]);

  const handleConnect = async () => {
    setMessage(null);
    setIsSaving(true);

    try {
      const hasNewCredential = apiKey && !apiKey.startsWith('••');
      const isApiKey = apiKey.startsWith('lano_') || apiKey.startsWith('lns_');
      const isBearerToken = looksLikeJwt(apiKey);

      if (hasNewCredential && !isApiKey && !isBearerToken) {
        setMessage({
          type: 'error',
          text: 'Invalid credential format. Use an API key starting with lano_/lns_ or a bearer token.',
        });
        setIsSaving(false);
        return;
      }

      const normalized = normalizeApiUrl(apiUrl);
      if (!normalized.ok) {
        setMessage({ type: 'error', text: normalized.error });
        setIsSaving(false);
        return;
      }

      if (normalized.value !== 'https://api.lanonasis.com') {
        const perm = await ensureHostPermissionForOrigin(normalized.value);
        if (!perm.ok) {
          setMessage({
            type: 'error',
            text: `Cannot access API URL without host permission. ${perm.error}`,
          });
          setIsSaving(false);
          return;
        }
      }

      const updates: Record<string, string> = { apiUrl: normalized.value, aiMode };
      if (apiKey && !apiKey.startsWith('••')) {
        updates.l0_auth_token = apiKey;
      }

      await chrome.storage.local.set(updates);

      if (apiKey && !apiKey.startsWith('••')) {
        setIsAuthenticated(true);
        setApiKey('••••••••••••••••');
        setShowAuthForm(false);
      }

      setApiUrl(normalized.value);
      setMessage({
        type: 'success',
        text: normalized.changed
          ? `Settings saved. API URL normalized to ${normalized.value}`
          : 'Connected successfully. Syncing memories…',
      });

      chrome.runtime.sendMessage({ type: 'SYNC_MEMORIES' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await chrome.storage.local.remove(['l0_auth_token', 'userEmail', 'l0_oauth_token', 'l0_oauth_credential_type']);
    setIsAuthenticated(false);
    setAuthType(null);
    setApiKey('');
    setMessage({ type: 'success', text: 'Disconnected successfully' });
    chrome.runtime.sendMessage({ type: 'LOGOUT' });
  };

  const handleResync = async () => {
    setIsResyncing(true);
    setMessage(null);
    try {
      await new Promise<void>((resolve) => {
        chrome.runtime.sendMessage({ type: 'SYNC_MEMORIES' }, () => resolve());
      });
      setMessage({ type: 'success', text: 'Sync triggered. Memories will update shortly.' });
    } catch {
      setMessage({ type: 'error', text: 'Sync failed. Check your connection.' });
    } finally {
      setIsResyncing(false);
    }
  };

  const handleRunDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    setDiagnostics(null);
    try {
      const { diagnostics: result } = await chrome.runtime.sendMessage({
        type: 'RUN_DIAGNOSTICS',
        payload: { apiUrl },
      });
      if (result) {
        setDiagnostics(result);
      }
    } catch {
      // silently ignore — user can retry
    } finally {
      setIsRunningDiagnostics(false);
    }
  };

  // ── OAuth device code flow ──

  const handleOAuthAuth = async () => {
    setMessage(null);
    setDeviceError(null);
    setDeviceSuccess(false);
    setShowAuthMethodSelect(false);
    setShowDeviceCode(true);

    try {
      const result = await chrome.runtime.sendMessage({ type: 'START_DEVICE_CODE_FLOW' });
      if (!result.success) {
        setDeviceError(result.error || 'Failed to start authentication');
        setShowDeviceCode(false);
        setShowAuthMethodSelect(true);
        return;
      }
      setDeviceCode({
        user_code: result.deviceCode.user_code,
        verification_uri: result.deviceCode.verification_uri,
        verification_uri_complete: result.deviceCode.verification_uri_complete,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to start device code flow';
      setDeviceError(msg);
      setShowDeviceCode(false);
      setShowAuthMethodSelect(true);
    }
  };

  const handleDeviceCodeCancel = () => {
    setShowDeviceCode(false);
    setDeviceCode(null);
    setDeviceError(null);
    setDeviceSuccess(false);
    setShowAuthMethodSelect(true);
  };

  const handleDeviceCodeExpire = () => {
    setDeviceError('Authorization timed out. Please try again.');
    setShowDeviceCode(false);
    setShowAuthMethodSelect(true);
  };

  // Decide which view to render
  const view = useMemo(() => {
    if (isAuthenticated) return 'dashboard';
    if (showDeviceCode) return 'device-code';
    if (showAuthMethodSelect) return 'auth-method';
    if (showAuthForm) return 'auth';
    return 'welcome';
  }, [isAuthenticated, showDeviceCode, showAuthMethodSelect, showAuthForm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] text-white">
      <div className="max-w-xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <GradientOrb />
          <div>
            <h1 className="text-xl font-bold">L0 Memory</h1>
            <p className="text-xs text-gray-400">Settings & sign-in</p>
          </div>
        </div>

        {/* Status banner */}
        {message && (
          <div className="mb-6">
            <StatusBanner type={message.type} text={message.text} />
          </div>
        )}

        {/* View switcher */}
        <div className="bg-[#252526]/60 border border-[#3C3C3C] rounded-2xl p-6 backdrop-blur-sm">
          {view === 'welcome' && (
            <WelcomeView
              apiUrl={apiUrl}
              onContinue={() => {
                setMessage(null);
                setShowAuthMethodSelect(true);
              }}
            />
          )}
          {view === 'auth-method' && (
            <AuthMethodView
              apiUrl={apiUrl}
              onSelectApiKey={() => {
                setMessage(null);
                setShowAuthMethodSelect(false);
                setShowAuthForm(true);
              }}
              onSelectOAuth={handleOAuthAuth}
              onBack={() => {
                setMessage(null);
                setShowAuthMethodSelect(false);
              }}
            />
          )}
          {view === 'device-code' && deviceCode && (
            <DeviceCodeView
              userCode={deviceCode.user_code}
              verificationUri={deviceCode.verification_uri}
              onCancel={handleDeviceCodeCancel}
              onExpire={handleDeviceCodeExpire}
              onError={(msg) => setDeviceError(msg)}
            />
          )}
          {view === 'auth' && (
            <AuthForm
              apiKey={apiKey}
              setApiKey={setApiKey}
              apiUrl={apiUrl}
              setApiUrl={setApiUrl}
              onSubmit={handleConnect}
              onBack={() => {
                setMessage(null);
                setShowAuthForm(false);
              }}
              isSaving={isSaving}
            />
          )}
          {view === 'dashboard' && (
            <ConnectedDashboard
              apiUrl={apiUrl}
              authType={authType}
              aiMode={aiMode}
              setAiMode={setAiMode}
              onResync={handleResync}
              onDisconnect={handleLogout}
              isResyncing={isResyncing}
              onRunDiagnostics={handleRunDiagnostics}
              isRunningDiagnostics={isRunningDiagnostics}
            />
          )}
        </div>

        {/* Diagnostics results (rendered below the view switcher) */}
        {diagnostics && (
          <DiagnosticResults
            result={diagnostics}
            onDismiss={() => setDiagnostics(null)}
          />
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-[10px] text-gray-600 space-y-1">
          <p>L0 Memory Extension v0.2.0</p>
          <p className="space-x-1">
            <a
              href="https://lanonasis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007ACC] hover:underline"
            >
              lanonasis.com
            </a>
            <span>·</span>
            <a
              href="https://github.com/lanonasis/lzero-aether-mem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007ACC] hover:underline"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://lanonasis.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007ACC] hover:underline"
            >
              Privacy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Options;
