# 时钟事务 · dsh-clock-radar

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的 Web 界面加一个侧栏入口，里面三页：

- **时钟** — 秒级大字 `HH:MM:SS` 加一只指针表盘。页面透明，装了壁纸插件的话壁纸会从钟后面透出来。
- **番茄钟** — 自己设时长（预设 15 / 25 / 45 / 60 分钟，也能填 1–180 的任意值），开始、暂停、继续、重置；到点发系统通知并弹页面横幅，**不响铃**。
- **事务** — Campus Radar 的 DDL 看板（今日 / 明日 / 逾期 / 7 天内 / 7 天外 / 未定）。需要本地跑着 Campus Radar；没跑就显示「没连上」，不影响另外两页。

这个插件是把 [dsh-wallpaper-clock](https://github.com/Twi-ster/dsh-wallpaper-clock)（整页时钟）和 `campus-radar-dsh`（事务雷达）合并成一份，另外新写了番茄钟。

## 安装

需要 DeepSeek Harness 0.2 内核和 Node.js >= 22.12.0。

在 DSH 的**插件页**点「添加插件」，输入本仓库的绝对路径；或者在命令行：

```sh
git clone https://github.com/Twi-ster/dsh-clock-radar.git
dsh plugin --profile web add ./dsh-clock-radar
```

装好后刷新页面。侧栏没出现「时钟事务」就重启一次 `dsh web` / DSH Desktop。

桌面端用应用内的 设置 → 插件 安装本地 bundle 目录，不用命令行。

## 用法

左侧导航点「时钟事务」，顶部三个标签页来回切；旁边的对话行照常能回去聊天。

### 时钟

右上角齿轮：

- 24 / 12 小时制
- 显示日期
- 数字时间
- 指针表盘
- 秒针平滑（扫秒）
- 玻璃底衬

设置存在 `localStorage` 的 `dsh-clock-radar/settings/v1`。如果这个键还没有、而机器上跑过老的 `dsh-wallpaper-clock`，会回读它的 `settings/v1`，开关不用重设。

### 番茄钟

- 点预设或填分钟数 → 开始；跑起来可以暂停、继续、重置。
- 第一次点「开始」会申请通知权限；允许了到点才有系统通知，拒绝则只在页面内提示。
- 计时器挂在插件层而不是页面上：切到对话页、切到别的浏览器标签页，倒计时照样走。
- 状态按绝对结束时间存在 `dsh-clock-radar/pomodoro/v1`，刷新页面续计。
- 页面关着期间到点的，重开显示「已结束」，不补发过期通知。

### 事务

读的是 Host 侧只读代理，浏览器不碰 CORS：

```text
/clock-radar-api/tasks            -> http://127.0.0.1:3000/api/tasks
/clock-radar-api/categories       -> http://127.0.0.1:3000/api/categories
/clock-radar-api/sources          -> http://127.0.0.1:3000/api/sources
/clock-radar-api/wechat/overview  -> http://127.0.0.1:3000/api/wechat/overview
```

只允许 GET。Campus Radar 没在跑时显示「没连上」，不会编假数据。端口不是 3000 的话，给 Host 环境设 `CAMPUS_RADAR_URL`。

Campus Radar 是另一个本地项目，不开源也不会跟着这个插件发；不需要这一页的话直接不用点它。

## 兼容

| 项 | 说明 |
|---|---|
| 壁纸插件 | 时钟页透明，壁纸照常显示；不装壁纸也正常工作，就是主题底色。 |
| 深浅主题 | 只读 `--dsw-alias-*` 主题令牌，跟随宿主主题。 |
| 其他插件 | 不读别人的 DOM / 样式表，也不改写第三方节点。 |
| 权限 | Host 只注册一条只读代理；没有 npm 依赖，不联网（除了那四个只读 GET）。 |

在 DSH `0.2.0-rc.2` 上验证过。

## 文件

| 文件 | 作用 |
|---|---|
| `client.js` | 全部 UI：三个标签、时钟、番茄钟引擎、雷达看板、locale 字典 |
| `index.js` | Host 半边：`/clock-radar-api` 只读代理 |
| `cordis.patch.yml` | 往宿主组合树里插入本 bundle 的一行 |
| `locale/*.json` | 插件管理器里显示的中英文标题和简介 |

## 开发

```sh
node --check index.js
node --check client.js
```

本地调试时把仓库目录直接交给插件管理器安装（`plugin_manager` 的 `install_bundle`，或应用内插件页的本地安装）。

## 许可

[MIT](LICENSE) © 2026 Twi-ster
