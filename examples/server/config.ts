import { resolve } from 'path';

export const port = 2021;
const resolveDirname = (target: string) => resolve(__dirname, target);
const JsFilePath = resolveDirname('../JS');
const VueFilePath = resolveDirname('../Vue');
const ReactFilePath = resolveDirname('../React');
const Vue3FilePath = resolveDirname('../Vue3');
const WebPerformancePath = resolveDirname('../WebPerformance');
const webFilePath = resolve('./packages/web/dist');
const wxFilePath = resolve('./packages/wx-mini/dist');
const webPerfFilePath = resolve('./packages/web-performance/dist');
const browserFilePath = resolve('./packages/browser/dist');

export const FilePaths = {
  '/JS': JsFilePath,
  '/Vue': VueFilePath,
  '/React': ReactFilePath,
  '/Vue3': Vue3FilePath,
  '/WebPerformance': WebPerformancePath,
  '/webDist': webFilePath,
  '/wxDist': wxFilePath,
  '/wpDist': webPerfFilePath,
  '/browserDist': browserFilePath,
};

export const ServerUrls = {
  normalGet: '/normal',
  exceptionGet: '/exception',
  normalPost: '/normal/post',
  exceptionPost: '/exception/post',
  errorsUpload: '/errors/upload',
};
