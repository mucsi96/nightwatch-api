interface WaitOnOptions {
  resources: Array<string>;
  reverse: boolean;
  timeout: number;
}

export default function waitOn(opts: WaitOnOptions, cb: Function): undefined;
