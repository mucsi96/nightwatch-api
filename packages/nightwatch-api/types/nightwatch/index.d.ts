declare module 'nightwatch' {
  import Section from 'nightwatch/lib/page-object/section';
  import { EventEmitter } from 'events';

  interface SeleniumSettings {
    start_process: boolean;
  }

  interface WebdriverSettings {
    host: string;
    port: number;
  }

  interface Settings {
    selenium: SeleniumSettings;
    webdriver: WebdriverSettings;
  }

  export interface CliRunnerInstance {
    isWebDriverManaged: Function;
    baseSettings: Settings;
    test_settings: Settings;
    setup: Function;
    startWebDriver: Function;
    stopWebDriver: Function;
    testEnv: string;
  }

  export interface Queue extends EventEmitter {
    empty: Function;
    reset: Function;
    run: Function;
  }

  export interface Session {
    close: Function;
  }

  export interface Page {
    (): Api;
  }

  export interface Expect {
    [key: string]: Function;
  }

  export interface Pages {
    [key: string]: Page | Pages;
  }

  export interface Sections {
    [key: string]: Api;
  }

  export interface Api {
    catch: Function;
    then: Function;
    expect: Expect;
    section: Sections;
    page: Pages;
    screenshotsPath: string;
    [key: string]: Promise<Api> | Function | Expect | Sections | Pages | string;
  }

  export interface ScreenshotResult {
    state?: string;
    status: number;
    value: string;
  }

  export type ScreenshotCallback = (result: ScreenshotResult) => void;
  export type SessionCallback = () => void;

  export interface TransportActions {
    sessionAction: (method: string, sessionId: string, callback: SessionCallback) => void;
    getScreenshot: (log_screenshot_data: boolean, callback: ScreenshotCallback) => void;
  }

  export interface Client {
    startSession: Function;
    api: Api;
    queue: Queue;
    sessionId: string;
    session: Session;
    transportActions: TransportActions;
  }

  export function CliRunner(config: object): CliRunnerInstance;

  export function client(settings: object, runner?: object): Client;

  export interface NightwatchError extends Error {
    abortOnFailure: boolean;
  }
}

declare module 'nightwatch/lib/testsuite/reporter' {
  export default class Reporter {
    constructor(tests: Array<any>, suiteRetries: number, settings: Object, addOpts: Object);
  }
}

declare module 'nightwatch/lib/utils/screenshots' {
  type writeScreenshotToFileCallback = (err: Error) => void;

  export default class Screenshots {
    static writeScreenshotToFile(
      fileName: string,
      screenshotData: string,
      callback: writeScreenshotToFileCallback
    ): void;
  }
}

declare module 'nightwatch/lib/page-object/section' {
  import { Api } from 'nightwatch';

  export default class Section {
    constructor(definition: object, options: object);
    api: Api;
    [key: string]: Api;
  }
}
