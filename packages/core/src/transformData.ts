import { BreadCrumbTypes, ErrorTypes, globalVar } from 'encode-monitor-shared';
import {
  getLocationHref,
  getTimestamp,
  Severity,
  fromHttpStatus,
  SpanStatus,
  interceptStr,
} from 'encode-monitor-utils';
import { ReportDataType, MonitorHttp, Replace, ResourceErrorTarget } from 'encode-monitor-types';
import { getRealPath } from './errorId';
import { breadcrumb } from './breadcrumb';

export function httpTransform(data: MonitorHttp): ReportDataType {
  let message = '';
  const { elapsedTime, time, method, traceId, type, status } = data;
  const name = `${type}--${method}`;
  if (status === 0) {
    message =
      elapsedTime <= globalVar.crossOriginThreshold
        ? 'http请求失败，失败原因：跨域限制或域名不存在'
        : 'http请求失败，失败原因：超时';
  } else {
    message = fromHttpStatus(status);
  }
  message = message === SpanStatus.Ok ? message : `${message} ${getRealPath(data.url)}`;
  return {
    type: ErrorTypes.FETCH_ERROR,
    url: getLocationHref(),
    time,
    elapsedTime,
    level: Severity.Low,
    message,
    name,
    request: {
      httpType: type,
      traceId,
      method,
      url: data.url,
      data: data.reqData || '',
    },
    response: {
      status,
      data: data.responseText,
    },
  };
}

const resourceMap = {
  img: '图片',
  script: 'js脚本',
};

export function resourceTransform(target: ResourceErrorTarget): ReportDataType {
  return {
    type: ErrorTypes.RESOURCE_ERROR,
    url: getLocationHref(),
    message: '资源地址: ' + (interceptStr(target.src, 120) || interceptStr(target.href, 120)),
    level: Severity.Low,
    time: getTimestamp(),
    name: `${resourceMap[target.localName] || target.localName}加载失败`,
  };
}

export function handleConsole(data: Replace.TriggerConsole): void {
  if (globalVar.isLogAddBreadcrumb) {
    breadcrumb.push({
      type: BreadCrumbTypes.CONSOLE,
      category: breadcrumb.getCategory(BreadCrumbTypes.CONSOLE),
      data,
      level: Severity.fromString(data.level),
    });
  }
}
