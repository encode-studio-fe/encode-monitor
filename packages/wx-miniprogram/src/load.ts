import { EventTypes } from 'encode-monitor-shared';
import {
  HandleWxConsoleEvents,
  HandleNetworkEvents,
  HandleWxEvents,
  HandleWxPageEvents,
} from './handleWxEvents';
import {
  addReplaceHandler,
  replaceApp,
  replacePage,
  replaceComponent,
  replaceBehavior,
} from './replace';

export function setupReplace() {
  replaceApp();
  replacePage();
  replaceComponent();
  replaceBehavior();
  addReplaceHandler({
    callback: (data) => HandleWxEvents.handleRoute(data),
    type: EventTypes.MINI_ROUTE,
  });
  addReplaceHandler({
    callback: (data) => {
      HandleNetworkEvents.handleRequest(data);
    },
    type: EventTypes.XHR,
  });
  addReplaceHandler({
    callback: (data) => {
      HandleWxConsoleEvents.console(data);
    },
    type: EventTypes.CONSOLE,
  });
  addReplaceHandler({
    callback: (data) => HandleWxPageEvents.onAction(data),
    type: EventTypes.DOM,
  });
}
