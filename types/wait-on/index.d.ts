interface WaitOnOptions {
  resources: Array<string>;
  reverse: boolean;
}

export default function waitOn(opts: WaitOnOptions, cb: Function): undefined;
