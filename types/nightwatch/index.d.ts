import Section from 'nightwatch/lib/page-object/section';

interface SeleniumSettings {
  start_process: boolean;
}

interface WebdriverSettings {
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
}

export interface Queue {
  empty: Function;
  reset: Function;
  run: Function;
  removeAllListeners: Function;
}

export interface Session {
  close: Function;
}

export interface Page {
  (): Api;
}

export interface Expect {}

export interface Api {
  catch: Function;
  then: Function;
  expect: Expect;
  section: Section;
  page: Page;
}

export interface Client {
  startSession: Function;
  api: Api;
  queue: Queue;
  session: Session;
}

export function CliRunner(config: object): CliRunnerInstance;

export function client(settings: object): Client;

export interface AssertionError extends Error {
  abortOnFailure: boolean;
}
