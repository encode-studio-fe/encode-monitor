import { BreadCrumbTypes, ErrorTypes, ERROR_TYPE_RE, HttpCodes } from 'encode-monitor-shared';
import {
  transportData,
  breadcrumb,
  resourceTransform,
  httpTransform,
  options,
} from 'encode-monitor-core';
import {
  getLocationHref,
  getTimestamp,
  isError,
  parseUrlToObj,
  extractErrorStack,
  unknownToString,
  Severity,
} from 'encode-monitor-utils';
import { ReportDataType, Replace, MonitorHttp, ResourceErrorTarget } from 'encode-monitor-types';

const HandleEvents = {
  /**
   * 处理xhr、fetch回调
   */
  handleHttp(data: MonitorHttp, type: BreadCrumbTypes): void {
    const isError =
      data.status === 0 ||
      data.status === HttpCodes.BAD_REQUEST ||
      data.status > HttpCodes.UNAUTHORIZED;
    const result = httpTransform(data);
    breadcrumb.push({
      type,
      category: breadcrumb.getCategory(type),
      data: { ...result },
      level: Severity.Info,
      time: data.time,
    });
    if (isError) {
      breadcrumb.push({
        type,
        category: breadcrumb.getCategory(BreadCrumbTypes.CODE_ERROR),
        data: { ...result },
        level: Severity.Error,
        time: data.time,
      });
      transportData.send(result);
    }
  },
  /**
   * 处理window的error的监听回调
   */
  handleError(errorEvent: ErrorEvent) {
    const target = errorEvent.target as ResourceErrorTarget;
    if (target.localName) {
      // 资源加载错误 提取有用数据
      const data = resourceTransform(errorEvent.target as ResourceErrorTarget);
      breadcrumb.push({
        type: BreadCrumbTypes.RESOURCE,
        category: breadcrumb.getCategory(BreadCrumbTypes.RESOURCE),
        data,
        level: Severity.Error,
      });
      return transportData.send(data);
    }
    // code error
    const { message, filename, lineno, colno, error } = errorEvent;
    let result: ReportDataType;
    if (error && isError(error)) {
      result = extractErrorStack(error, Severity.Normal);
    }
    // 处理SyntaxError，stack没有lineno、colno
    result || (result = HandleEvents.handleNotErrorInstance(message, filename, lineno, colno));
    result.type = ErrorTypes.JAVASCRIPT_ERROR;
    breadcrumb.push({
      type: BreadCrumbTypes.CODE_ERROR,
      category: breadcrumb.getCategory(BreadCrumbTypes.CODE_ERROR),
      data: { ...result },
      level: Severity.Error,
    });
    transportData.send(result);
  },
  
  handleNotErrorInstance(message: string, filename: string, lineno: number, colno: number) {
    let name: string | ErrorTypes = ErrorTypes.UNKNOWN;
    const url = filename || getLocationHref();
    let msg = message;
    const matches = message.match(ERROR_TYPE_RE);
    if (matches[1]) {
      name = matches[1];
      msg = matches[2];
    }
    const element = {
      url,
      func: ErrorTypes.UNKNOWN_FUNCTION,
      args: ErrorTypes.UNKNOWN,
      line: lineno,
      col: colno,
    };
    return {
      url,
      name,
      message: msg,
      level: Severity.Normal,
      time: getTimestamp(),
      stack: [element],
    };
  },
  handleHistory(data: Replace.IRouter): void {
    const { from, to } = data;
    const { relative: parsedFrom } = parseUrlToObj(from);
    const { relative: parsedTo } = parseUrlToObj(to);
    breadcrumb.push({
      type: BreadCrumbTypes.ROUTE,
      category: breadcrumb.getCategory(BreadCrumbTypes.ROUTE),
      data: {
        from: parsedFrom ? parsedFrom : '/',
        to: parsedTo ? parsedTo : '/',
      },
      level: Severity.Info,
    });
    const { onRouteChange } = options;
    if (onRouteChange) {
      onRouteChange(from, to);
    }
  },
  handleHashchange(data: HashChangeEvent): void {
    const { oldURL, newURL } = data;
    const { relative: from } = parseUrlToObj(oldURL);
    const { relative: to } = parseUrlToObj(newURL);
    breadcrumb.push({
      type: BreadCrumbTypes.ROUTE,
      category: breadcrumb.getCategory(BreadCrumbTypes.ROUTE),
      data: {
        from,
        to,
      },
      level: Severity.Info,
    });
    const { onRouteChange } = options;
    if (onRouteChange) {
      onRouteChange(from, to);
    }
  },
  handleUnhandleRejection(ev: PromiseRejectionEvent): void {
    let data: ReportDataType = {
      type: ErrorTypes.PROMISE_ERROR,
      message: unknownToString(ev.reason),
      url: getLocationHref(),
      name: ev.type,
      time: getTimestamp(),
      level: Severity.Low,
    };
    if (isError(ev.reason)) {
      data = {
        ...data,
        ...extractErrorStack(ev.reason, Severity.Low),
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
};

export { HandleEvents };
