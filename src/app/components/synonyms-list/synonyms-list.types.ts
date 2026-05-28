export type SynonymsListState =
  | { status: 'error'; message: string }
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; items: string[] };
