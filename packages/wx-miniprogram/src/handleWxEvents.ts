import { BreadCrumbTypes, ErrorTypes } from 'encode-monitor-shared';
import {
  breadcrumb,
  handleConsole,
  httpTransform,
  transportData,
  options as sdkOptions,
} from 'encode-monitor-core';
import { ReportDataType, Replace, MITOHttp } from 'encode-monitor-types';
import {
  extractErrorStack,
  getCurrentRoute,
  getTimestamp,
  isError,
  isHttpFail,
  parseErrorString,
  unknownToString,
  _support,
  Severity,
} from 'encode-monitor-utils';
import { getWxMiniDeviceInfo, targetAsString } from './utils';
import {
  MiniRoute,
  WxLifeCycleBreadcrumb,
  WxOnShareAppMessageBreadcrumb,
  WxOnTabItemTapBreadcrumb,
} from './types';
import { EListenerTypes } from './constant';

const HandleWxAppEvents = {
  onLaunch(options: WechatMiniprogram.App.LaunchShowOption) {
    sdkOptions.appOnLaunch(options);
    const data: WxLifeCycleBreadcrumb = {
      path: options.path,
      query: options.query,
    };
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.APP_ON_LAUNCH),
      type: BreadCrumbTypes.APP_ON_LAUNCH,
      data,
      level: Severity.Info,
    });
  },

  async onShow(options: WechatMiniprogram.App.LaunchShowOption) {
    _support.deviceInfo = await getWxMiniDeviceInfo();
    sdkOptions.appOnShow(options);
    const data: WxLifeCycleBreadcrumb = {
      path: options.path,
      query: options.query,
    };
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.APP_ON_SHOW),
      type: BreadCrumbTypes.APP_ON_SHOW,
      data,
      level: Severity.Info,
    });
  },

  onHide() {
    sdkOptions.appOnHide();
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.APP_ON_HIDE),
      type: BreadCrumbTypes.APP_ON_HIDE,
      data: null,
      level: Severity.Info,
    });
  },

  onError(error: string) {
    const parsedError = parseErrorString(error);
    const data: ReportDataType = {
      ...parsedError,
      time: getTimestamp(),
      level: Severity.Normal,
      url: getCurrentRoute(),
      type: ErrorTypes.JAVASCRIPT_ERROR,
    };
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.CODE_ERROR),
      type: BreadCrumbTypes.CODE_ERROR,
      level: Severity.Error,
      data: { ...data },
    });
    transportData.send(data);
  },

  onUnhandledRejection(ev: WechatMiniprogram.OnUnhandledRejectionCallbackResult) {
    let data: ReportDataType = {
      type: ErrorTypes.PROMISE_ERROR,
      message: unknownToString(ev.reason),
      url: getCurrentRoute(),
      name: 'unhandledrejection', // 小程序当初onUnhandledRejection回调中无type参数，故写死
      time: getTimestamp(),
      level: Severity.Low,
    };
    if (isError(ev.reason)) {
      data = {
        ...data,
        ...extractErrorStack(ev.reason, Severity.Low),
        url: getCurrentRoute(),
      };
    }
    breadcrumb.push({
      type: BreadCrumbTypes.UNHANDLEDREJECTION,
      category: breadcrumb.getCategory(BreadCrumbTypes.UNHANDLEDREJECTION),
      data: { ...data },
      level: Severity.Error,
    });
    transportData.send(data);
  },

  onPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult) {
    sdkOptions.onPageNotFound(data);
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.ROUTE),
      type: BreadCrumbTypes.ROUTE,
      data,
      level: Severity.Error,
    });
  },
};

const HandleWxPageEvents = {
  onShow() {
    const page = getCurrentPages().pop();
    sdkOptions.pageOnShow(page);
    const data: WxLifeCycleBreadcrumb = {
      path: page.route,
      query: page.options,
    };
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.PAGE_ON_SHOW),
      type: BreadCrumbTypes.PAGE_ON_SHOW,
      data,
      level: Severity.Info,
    });
  },

  onHide() {
    const page = getCurrentPages().pop();
    sdkOptions.pageOnHide(page);
    const data: WxLifeCycleBreadcrumb = {
      path: page.route,
      query: page.options,
    };
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.PAGE_ON_HIDE),
      type: BreadCrumbTypes.PAGE_ON_HIDE,
      data,
      level: Severity.Info,
    });
  },

  onUnload() {
    const page = getCurrentPages().pop();
    sdkOptions.pageOnUnload(page);
    const data: WxLifeCycleBreadcrumb = {
      path: page.route,
      query: page.options,
    };
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.PAGE_ON_UNLOAD),
      type: BreadCrumbTypes.PAGE_ON_UNLOAD,
      data,
      level: Severity.Info,
    });
  },

  onShareAppMessage(options: WechatMiniprogram.Page.IShareAppMessageOption) {
    const page = getCurrentPages().pop();
    sdkOptions.onShareAppMessage({
      ...page,
      ...options,
    });
    const data: WxOnShareAppMessageBreadcrumb = {
      path: page.route,
      query: page.options,
      options,
    };
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.PAGE_ON_SHARE_APP_MESSAGE),
      type: BreadCrumbTypes.PAGE_ON_SHARE_APP_MESSAGE,
      data,
      level: Severity.Info,
    });
  },

  onShareTimeline() {
    const page = getCurrentPages().pop();
    sdkOptions.onShareTimeline(page);
    const data: WxLifeCycleBreadcrumb = {
      path: page.route,
      query: page.options,
    };
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.PAGE_ON_SHARE_TIMELINE),
      type: BreadCrumbTypes.PAGE_ON_SHARE_TIMELINE,
      data,
      level: Severity.Info,
    });
  },

  onTabItemTap(options: WechatMiniprogram.Page.ITabItemTapOption) {
    const page = getCurrentPages().pop();
    sdkOptions.onTabItemTap({
      ...page,
      ...options,
    });
    const data: WxOnTabItemTapBreadcrumb = {
      path: page.route,
      query: page.options,
      options,
    };
    breadcrumb.push({
      category: breadcrumb.getCategory(BreadCrumbTypes.PAGE_ON_TAB_ITEM_TAP),
      type: BreadCrumbTypes.PAGE_ON_TAB_ITEM_TAP,
      data,
      level: Severity.Info,
    });
  },

  onAction(e: WechatMiniprogram.BaseEvent) {
    sdkOptions.triggerWxEvent(e);
    let type = BreadCrumbTypes.TOUCHMOVE;
    if (e.type === EListenerTypes.Tap) {
      type = BreadCrumbTypes.TAP;
    }
    breadcrumb.push({
      category: breadcrumb.getCategory(type),
      type,
      data: targetAsString(e),
      level: Severity.Info,
    });
  },
};

const HandleWxConsoleEvents = {
  console(data: Replace.TriggerConsole) {
    handleConsole(data);
  },
};

const HandleNetworkEvents = {
  handleRequest(data: MITOHttp): void {
    const result = httpTransform(data);
    result.url = getCurrentRoute();
    if (data.status === undefined) {
      result.message = data.errMsg;
    }
    const type = BreadCrumbTypes.XHR;
    breadcrumb.push({
      type,
      category: breadcrumb.getCategory(type),
      data: result,
      level: Severity.Info,
    });
    if (isHttpFail(data.status)) {
      breadcrumb.push({
        type,
        category: breadcrumb.getCategory(BreadCrumbTypes.CODE_ERROR),
        data: { ...result },
        level: Severity.Error,
      });
      transportData.send(result);
    }
  },
};

const HandleWxEvents = {
  handleRoute(data: MiniRoute) {
    if (data.isFail) {
      breadcrumb.push({
        type: BreadCrumbTypes.ROUTE,
        category: breadcrumb.getCategory(BreadCrumbTypes.CODE_ERROR),
        data,
        level: Severity.Error,
      });

      const reportData = {
        type: ErrorTypes.ROUTE_ERROR,
        message: data.message,
        url: data.to,
        name: 'MINI_' + ErrorTypes.ROUTE_ERROR,
        level: Severity.Error,
      };

      return transportData.send(reportData);
    }
    breadcrumb.push({
      type: BreadCrumbTypes.ROUTE,
      category: breadcrumb.getCategory(BreadCrumbTypes.ROUTE),
      data,
      level: Severity.Info,
    });
  },
};

export {
  HandleWxAppEvents,
  HandleWxPageEvents,
  HandleWxConsoleEvents,
  HandleNetworkEvents,
  HandleWxEvents,
};
