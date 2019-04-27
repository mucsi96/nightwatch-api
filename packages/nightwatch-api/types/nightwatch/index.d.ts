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

  export interface Client {
    startSession: Function;
    api: Api;
    queue: Queue;
    session: Session;
  }

  export function CliRunner(config: object): CliRunnerInstance;

  export function client(settings: object, runner?: object): Client;

  export interface NightwatchError extends Error {
    abortOnFailure: boolean;
  }
}

declare module 'nightwatch/lib/api/protocol' {
  import { Client } from 'nightwatch';

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
}

declare module 'nightwatch/lib/testsuite/reporter' {
  export default class Reporter {
    constructor(tests: Array<any>, suiteRetries: number, settings: Object, addOpts: Object);
  }
}

declare module 'nightwatch/lib/testsuite/screenshots' {
  type writeScreenshotToFileCallback = (err: Error) => void;

  export function writeScreenshotToFile(
    fileName: string,
    screenshotData: string,
    callback: writeScreenshotToFileCallback
  ): void;
}

declare module 'nightwatch/lib/page-object/section' {
  import { Api } from 'nightwatch';

  export default class Section {
    constructor(definition: object, options: object);
    api: Api;
    [key: string]: Api;
  }
}
