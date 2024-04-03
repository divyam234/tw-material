import {__DEV__} from "./assertion";

const warningStack: {[key: string]: boolean} = {};

export function warn(message: string, component?: string, ...args: any[]) {
  const tag = component ? ` [${component}]` : " ";
  const log = `[TW Material]${tag}: ${message}`;

  if (typeof console === "undefined") return;
  if (warningStack[log]) return;
  warningStack[log] = true;

  if (__DEV__) {
    // eslint-disable-next-line no-console
    return console.warn(log, args);
  }
}
