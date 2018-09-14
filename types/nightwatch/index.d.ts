import Section from './lib/page-object/section';

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
  desiredCapabilities: DesiredCapabilities;
}

interface CliRunnerArguments {
  env: string;
}

export interface CliRunnerInstance {
  isWebDriverManaged: Function;
  baseSettings: Settings;
  test_settings: Settings;
  setup: Function;
  startWebDriver: Function;
  stopWebDriver: Function;
  argv: CliRunnerArguments;
  setCurrentTestEnv: Function;
  setupConcurrency: Function;
  parseTestSettings: Function;
}

export interface Queue {
  empty: Function;
  reset: Function;
  run: Function;
  removeAllListeners: Function;
}

interface DesiredCapabilities {}

interface SessionOptions {
  desiredCapabilities: DesiredCapabilities;
}

export interface Session {
  close: Function;
  options: SessionOptions;
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
  [key: string]: Promise<Api> | Function | Expect | Sections | Pages;
}

export interface Client {
  startSession: Function;
  api: Api;
  queue: Queue;
  session: Session;
}

export function CliRunner(config: object): CliRunnerInstance;

export function client(settings: object, runner: object): Client;

export interface AssertionError extends Error {
  abortOnFailure: boolean;
}
