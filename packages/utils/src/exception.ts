import { voidFun } from 'encode-monitor-shared';

export function nativeTryCatch(fn: voidFun, errorFn?: (err: any) => void): void {
  try {
    fn();
  } catch (err) {
    console.log('err', err);
    if (errorFn) {
      errorFn(err);
    }
  }
}
