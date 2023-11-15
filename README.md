# encode-monitor

> 印客学院 前端监控稳定性

如何能够提升前端的稳定性，一直是一个经久不衰、且永不会过时的前端话题。我们可以确保产品的正常运行和用户体验的稳定性，针对前端功能的异常情况可以做到及时发现，为后续的故障排查和复现提供有效的线索，有助于改善系统的性能和稳定性，以及提升前端的可用性和用户体验水平。同时，可以让团队把更多的时间用于改进程序的用户体验，同时节省开发维护成本。
但就目前的前端行情下，大厂都有自己的稳定性建设方案，对于团队规模不大的同学，却鲜有关注这类问题，或感觉无可下手。因此，本套课程会从 0 开始，手把手的实现一套前端监控系统。
如果做到在当前团队内推广建设稳定性监控，不仅能够提升前端的团队稳定性的整体水位，也能使得我们可以在稳定性上达到前端技术专家的水准。

技术上：

1. 学习前端稳定性监控的完整流程；
2. 学习前端稳定性监控统计指标的思路及无埋点的实现；
3. 学习前端稳定性监控指标的上传方式的实现；
4. 掌握 Node 层作为数据清洗层，进行的常见的数据清洗规则及使用；
5. 掌握如何使用 Node 进行持久化的数据存储，及稳定性指标的展示；

学完后对工作/面试的帮助：

1. 面试上：在大厂面试中，掌握一套完整的前端稳定性建设，是作为晋升至前端专家的必要条件；
2. 后续工作上：可以让我们负责团队内的稳定性，提升个人在团队内的影响力；

## 产物

1. 前端监控 npm 包
   1. [encode-monitor-browser](https://www.npmjs.com/package/encode-monitor-browser)：前端稳定性监控 页面监控；
   2. [encode-monitor-core](https://www.npmjs.com/package/encode-monitor-core)：前端稳定性监控 核心功能；
   3. [encode-monitor-react](https://www.npmjs.com/package/encode-monitor-react)：前端稳定性监控 React 监控；
   4. [encode-monitor-vue](https://www.npmjs.com/package/encode-monitor-vue)：前端稳定性监控 Vue 监控；
   5. [encode-monitor-web](https://www.npmjs.com/package/encode-monitor-web)：前端稳定性监控 Web 监控；
   6. [encode-monitor-web-performance](https://www.npmjs.com/package/encode-monitor-web-performance)：前端稳定性监控 Web 性能监控；
   7. [encode-monitor-wx-mini-program](https://www.npmjs.com/package/encode-monitor-wx-mini-program)：前端稳定性监控 小程序监控；
   8. [encode-monitor-wx-mini-program-performance](https://www.npmjs.com/package/encode-monitor-wx-mini-program-performance)：前端稳定性监控 小程序性能监控；
2. 监控异常收集 node 服务；
3. 前端监控异常告警&界面展示；

## 技术选型

- 包管理工具：pnpm；
- 构建工具：encode-bundle；
- 数据清洗&存储：Node 生态；
