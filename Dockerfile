# 构建阶段
FROM node:18 AS builder

# 设置工作目录
WORKDIR /usr/src/app

ENV PRISMA_ENGINES_MIRROR=https://cdn.npmmirror.com/binaries/prisma

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN npm config set registry https://registry.npmmirror.com

# 安装pnpm
RUN npm install -g pnpm

RUN pnpm config set registry https://registry.npmmirror.com

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 生成Prisma客户端
RUN pnpm run prisma:generate

# 构建应用
RUN pnpm run build

# 生产阶段
FROM node:18

WORKDIR /usr/src/app

# 复制构建产物和必要文件
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/prisma ./prisma

# 安装仅生产环境需要的依赖
RUN npm install -g pnpm && pnpm install

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/src/main"]