import { Client } from '../..';

export interface ScreenshotResult {
  state?: string;
  status: number;
  value: string;
}

export type ScreenshotCallback = (result: ScreenshotResult) => void;
export type SessionCallback = () => void;

interface SessionActions {
  GET: string;
  POST: string;
  DELETE: string;
}

interface ProtocolActions {
  screenshot: (log: boolean, callback: ScreenshotCallback) => void;
  session: (action: string, callback: SessionCallback) => void;
}

export default class Protocol {
  constructor(client: Client);

  Actions: ProtocolActions;

  static SessionActions: SessionActions;
}
