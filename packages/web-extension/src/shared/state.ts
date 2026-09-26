/**
 * L0 Memory Extension — State Machine Types
 * Auth: unauthenticated | authenticated | expired
 * Sync: idle | scheduled | running | succeeded | failed
 * AI: idle | running | cancelling | cancelled | succeeded | failed
 * Panel: closed | open
 */

export enum AuthState {
  Unauthenticated = 'unauthenticated',
  Authenticated = 'authenticated',
  Expired = 'expired',
}

export enum SyncState {
  Idle = 'idle',
  Scheduled = 'scheduled',
  Running = 'running',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export enum AiState {
  Idle = 'idle',
  Running = 'running',
  Cancelling = 'cancelling',
  Cancelled = 'cancelled',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export enum PanelState {
  Closed = 'closed',
  Open = 'open',
}

/** Discriminant union for API request results */
export type ApiResult<T> =
  | { data: T }
  | { error: string; kind?: 'auth' | 'forbidden' | 'rate_limited' | 'server_error' | 'stale' };
