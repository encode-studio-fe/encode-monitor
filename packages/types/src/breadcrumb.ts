import { Severity } from 'encode-monitor-utils';
import { BreadCrumbTypes } from 'encode-monitor-shared';
import { ReportDataType } from './transportData';
import { Replace } from './replace';
import { TNumStrObj } from './common';

export interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BreadCrumbTypes;
  data: ReportDataType | Replace.IRouter | Replace.TriggerConsole | TNumStrObj;
  category?: string;
  time?: number;
  level: Severity;
}
