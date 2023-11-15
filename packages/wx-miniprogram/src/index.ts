import { InitOptions } from 'encode-monitor-types';
import { isWxMiniEnv } from 'encode-monitor-utils';
import { setupReplace } from './load';
import { initOptions, log } from 'encode-monitor-core';
import { sendTrackData, track } from './initiative';
import { SDK_NAME, SDK_VERSION } from 'encode-monitor-shared';
import { MonitorVue } from 'encode-monitor-vue';
import { errorBoundaryReport } from 'encode-monitor-react';

export function init(options: InitOptions = {}) {
  if (!isWxMiniEnv) return;
  initOptions(options);
  setupReplace();
  Object.assign(wx, { monitorLog: log, SDK_NAME, SDK_VERSION });
}
export { log, sendTrackData, track, MonitorVue, errorBoundaryReport };
