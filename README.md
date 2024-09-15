# Nest Template

这是一个功能丰富的基于 NestJS 框架的项目模板。

## 项目特性

- 使用 TypeScript 开发
- 集成 Prisma ORM 用于数据库操作
- 支持多语言国际化 (i18n)
- 集成 CI/CD 工作流
- 使用 pnpm 作为包管理器
- 集成 RabbitMQ 消息队列
- 集成 Redis 缓存
- 集成 OSS（minio）对象存储
- 集成 Mailer（ejs）邮件服务
- 集成 Pino Logger 日志系统
- 集成 Swagger API 文档

## 开始使用

### 前置要求

- Node.js (推荐版本 20)
- pnpm
- PostgreSQL 数据库
- Redis
- RabbitMQ
- Minio

#### 1. 使用模版创建项目

点击 `Use this template` 按钮，创建项目。

#### 2. 修改项目名称及配置

- 修改 `package.json` 中的下列字段：

```json
  "name": "nest-template",
  "version": "0.0.1",
  "description": "",
  "author": "gylove1994",
  "private": true,
  "license": "MIT",
```

- 修改 `cd` 中的`your-repo-name` 至项目名称

- 根据 `.env.example` 文件，创建 `.env.development`、`.env.test` 和 `.env.production` 文件：

```bash
cp .env.example .env.development
cp .env.example .env.test
cp .env.example .env.production
```

> 注意：请根据实际情况修改 `.env.development`、`.env.test` 和 `.env.production` 文件中的配置。

> 如果使用 `docker-compose-dev.yml` 启动开发服务，那有关数据库、缓存、消息队列的配置不需要修改。

> 对象存储默认使用 Minio，但是由于Minio的配置复杂，故没有在 `docker-compose-dev.yml` 中启动 Minio 服务，如需本地启动 Minio 服务，请参考 `docker-compose-dev.yml` 文件中的注释内容。

> 如果需要在非本地环境使用 `Minio`服务，可以使用[sealos](https://cloud.sealos.run/?uid=OvC84TSUES)提供的对象存储服务，简单快捷。（使用前述连接注册账号，我可以获得返利，感谢您支持本项目）

> `邮件服务`可以使用腾讯企业邮或者是forwardemail提供的邮件服务，具体请参考您选择的邮件提供商的文档。

#### 3. 安装docker仓库

由于本项目使用docker进行自动部署，所以需要安装docker仓库以进行自动部署，并配置docker仓库的secret：

```text
DOCKER_USERNAME: <docker username>
DOCKER_PASSWORD: <docker password>
DOCKER_REGISTRY: <docker registry>
```

> 可以使用[sealos](https://cloud.sealos.run/?uid=OvC84TSUES)提供的docker仓库服务，一件部署，简单快捷。（使用前述连接注册账号，我可以获得返利，感谢您支持本项目）

如果使用docker的公开仓库，请将以下secret设置为下列值：

```text
DOCKER_USERNAME: <docker username>
DOCKER_PASSWORD: <docker password>
DOCKER_REGISTRY: docker.io
```

#### 4.移除不需要的服务

所有的服务配置文件都存放于`src/configs`目录下，如果不需要某个服务，可以删除该服务对应的配置文件,并删除位于`app.module.ts`中的配置以及相应的模块，否则会导致服务启动失败。

#### 4. 安装依赖

```bash
pnpm install
```

#### 5. 启动开发服务依赖

```bash
pnpm run env:start:dev
```


### 运行

- 开发模式:

```bash
pnpm run start:dev
```

- 生产模式:

```bash
pnpm run build
pnpm run start:prod
```
