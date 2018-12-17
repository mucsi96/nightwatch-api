import { Client } from '../..';

export interface ScreenshotResult {
  state?: string;
  status: number;
  value: string;
}

export type ScreenshotCallback = (result: ScreenshotResult) => void;

interface ProtocolActions {
  screenshot: (log: boolean, callback: ScreenshotCallback) => void;
}

export default class Protocol {
  constructor(client: Client);

  Actions: ProtocolActions;
}
