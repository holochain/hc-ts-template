
export type Hello = string;

export type AppState = {
  numClicks: number,
  texts: Array<string>,
};

export type ReduxAction
  = {type: 'INCREMENT'}
  | {type: 'DECREMENT'}
  | {type: 'FETCH_TEXTS', entries: Array<any>}

