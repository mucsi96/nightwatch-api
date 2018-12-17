import Section from './lib/page-object/section';
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

export function client(settings: object, runner: object): Client;

export interface NightwatchError extends Error {
  abortOnFailure: boolean;
}
