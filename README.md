# Nest Template

这是一个基于 NestJS 框架的项目模板。

## 项目特性

- 使用 TypeScript 开发
- 集成 Prisma ORM
- 支持多语言国际化 (i18n)
- 包含用户角色和权限管理
- 集成 CI/CD 工作流
- 使用 pnpm 作为包管理器

## 开始使用

### 前置要求

- Node.js (推荐版本 20)
- pnpm
- PostgreSQL 数据库

### 安装

1. 克隆仓库:

```bash
git clone <仓库URL>
cd nest-template
```

2. 安装依赖:

```bash
pnpm install
```

3. 配置环境变量:

复制 `.env.example` 文件并重命名为 `.env.development`、`.env.test` 和 `.env.production`，根据不同环境填写相应的配置。

4. 运行数据库迁移:

```bash
pnpm run p:migrate:dev
```

5. 填充初始数据:

```bash
pnpm prisma db seed
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
