import { HandleEvents } from './handleEvents';
import { htmlElementAsString, Severity } from 'encode-monitor-utils';
import { EventTypes, BreadCrumbTypes } from 'encode-monitor-shared';
import { breadcrumb, handleConsole } from 'encode-monitor-core';
import { addReplaceHandler } from './replace';
export function setupReplace(): void {
  addReplaceHandler({
    callback: (data) => {
      HandleEvents.handleHttp(data, BreadCrumbTypes.XHR);
    },
    type: EventTypes.XHR,
  });
  addReplaceHandler({
    callback: (data) => {
      HandleEvents.handleHttp(data, BreadCrumbTypes.FETCH);
    },
    type: EventTypes.FETCH,
  });
  addReplaceHandler({
    callback: (error) => {
      HandleEvents.handleError(error);
    },
    type: EventTypes.ERROR,
  });
  addReplaceHandler({
    callback: (data) => {
      handleConsole(data);
    },
    type: EventTypes.CONSOLE,
  });
  addReplaceHandler({
    callback: (data) => {
      HandleEvents.handleHistory(data);
    },
    type: EventTypes.HISTORY,
  });

  addReplaceHandler({
    callback: (data) => {
      HandleEvents.handleUnhandleRejection(data);
    },
    type: EventTypes.UNHANDLEDREJECTION,
  });
  addReplaceHandler({
    callback: (data) => {
      const htmlString = htmlElementAsString(data.data.activeElement as HTMLElement);
      if (htmlString) {
        breadcrumb.push({
          type: BreadCrumbTypes.CLICK,
          category: breadcrumb.getCategory(BreadCrumbTypes.CLICK),
          data: htmlString,
          level: Severity.Info,
        });
      }
    },
    type: EventTypes.DOM,
  });
  addReplaceHandler({
    callback: (e: HashChangeEvent) => {
      HandleEvents.handleHashchange(e);
    },
    type: EventTypes.HASHCHANGE,
  });
}
