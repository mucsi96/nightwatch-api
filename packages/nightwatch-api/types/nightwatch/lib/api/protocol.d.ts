import { Client } from '../..';

export interface ScreenshotResult {
  state: string;
  status: number;
  value: string;
}

type screenshotCallback = (result: ScreenshotResult) => void;

interface ProtocolActions {
  screenshot: (log: boolean, callback: screenshotCallback) => void;
}

export default class Protocol {
  constructor(client: Client);

  Actions: ProtocolActions;
}
