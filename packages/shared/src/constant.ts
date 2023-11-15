export type voidFun = () => void;

/**
 * 上报错误类型
 */
export enum ErrorTypes {
  UNKNOWN = 'UNKNOWN',
  UNKNOWN_FUNCTION = 'UNKNOWN_FUNCTION',
  JAVASCRIPT_ERROR = 'JAVASCRIPT_ERROR',
  LOG_ERROR = 'LOG_ERROR',
  FETCH_ERROR = 'HTTP_ERROR',
  VUE_ERROR = 'VUE_ERROR',
  REACT_ERROR = 'REACT_ERROR',
  RESOURCE_ERROR = 'RESOURCE_ERROR',
  PROMISE_ERROR = 'PROMISE_ERROR',
  ROUTE_ERROR = 'ROUTE_ERROR',
}

/**
 * 微信原生APP级事件
 */
export enum WxAppEvents {
  AppOnLaunch = 'AppOnLaunch',
  AppOnShow = 'AppOnShow',
  AppOnHide = 'AppOnHide',
  AppOnError = 'AppOnError',
  AppOnPageNotFound = 'AppOnPageNotFound',
  AppOnUnhandledRejection = 'AppOnUnhandledRejection',
}

/**
 * 微信原生页面级事件
 */
export enum WxPageEvents {
  PageOnLoad = 'PageOnLoad',
  PageOnShow = 'PageOnShow',
  PageOnHide = 'PageOnHide',
  PageOnReady = 'PageOnReady',
  PageOnUnload = 'PageOnUnload',
  PageOnShareAppMessage = 'PageOnShareAppMessage',
  PageOnShareTimeline = 'PageOnShareTimeline',
  PageOnTabItemTap = 'PageOnTabItemTap',
}

/**
 * 微信原生路由级事件
 */
export enum WxRouterEvents {
  SwitchTab = 'switchTab',
  ReLaunch = 'reLaunch',
  RedirectTo = 'redirectTo',
  NavigateTo = 'navigateTo',
  NavigateBack = 'navigateBack',
  NavigateToMiniProgram = 'navigateToMiniProgram',
  RouteFail = 'routeFail',
}

export type WxEvents = WxAppEvents | WxPageEvents | WxRouterEvents;

export const CompositeEvents = {
  ...WxAppEvents,
  ...WxPageEvents,
  ...WxRouterEvents,
};

export type CompositeEvents = typeof CompositeEvents;

/**
 * 用户行为栈事件类型
 */
export enum BreadCrumbTypes {
  ROUTE = 'Route',
  CLICK = 'Click',
  CONSOLE = 'Console',
  XHR = 'Xhr',
  FETCH = 'Fetch',
  UNHANDLEDREJECTION = 'Unhandledrejection',
  VUE = 'Vue',
  REACT = 'React',
  RESOURCE = 'Resource',
  CODE_ERROR = 'Code Error',
  CUSTOMER = 'Customer',

  APP_ON_SHOW = 'App On Show',
  APP_ON_LAUNCH = 'App On Launch',
  APP_ON_HIDE = 'App On Hide',
  PAGE_ON_SHOW = 'Page On Show',
  PAGE_ON_HIDE = 'Page On Hide',
  PAGE_ON_UNLOAD = 'Page On Unload',
  PAGE_ON_SHARE_APP_MESSAGE = 'Page On Share App Message',
  PAGE_ON_SHARE_TIMELINE = 'Page On Share Timeline',
  PAGE_ON_TAB_ITEM_TAP = 'Page On Tab Item Tap',

  TAP = 'Tap',
  TOUCHMOVE = 'Touchmove',
}

/**
 * 用户行为整合类型
 */
export enum BreadCrumbCategory {
  HTTP = 'http',
  USER = 'user',
  DEBUG = 'debug',
  EXCEPTION = 'exception',
  LIFECYCLE = 'lifecycle',
}

/**
 * 重写的事件类型
 */
export enum EventTypes {
  XHR = 'xhr',
  FETCH = 'fetch',
  CONSOLE = 'console',
  DOM = 'dom',
  HISTORY = 'history',
  ERROR = 'error',
  HASHCHANGE = 'hashchange',
  UNHANDLEDREJECTION = 'unhandledrejection',
  MONITOR = 'monitor',
  VUE = 'Vue',
  MINI_ROUTE = 'miniRoute',
  MINI_PERFORMANCE = 'miniPerformance',
  MINI_MEMORY_WARNING = 'miniMemoryWarning',
  MINI_NETWORK_STATUS_CHANGE = 'miniNetworkStatusChange',
  MINI_BATTERY_INFO = 'miniBatteryInfo',
}

export enum HttpTypes {
  XHR = 'xhr',
  FETCH = 'fetch',
}

export enum HttpCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_EXCEPTION = 500,
}

export const ERROR_TYPE_RE =
  /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;

const globalVar = {
  isLogAddBreadcrumb: true,
  crossOriginThreshold: 1000,
};
export { globalVar };
