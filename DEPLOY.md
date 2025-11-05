# Linux 部署指南

本指南介绍如何在Linux服务器上部署和运行本项目。

## 🚀 快速开始

### 方法一：使用快速启动脚本（最简单）

```bash
# 1. 赋予执行权限
chmod +x quick-start.sh

# 2. 一键启动（会自动打开设计器界面）
./quick-start.sh

# 3. 启动成功后会显示设计器地址，并自动打开浏览器
# 设计器地址: http://你的服务器IP:8091/designer
```

### 方法二：使用完整管理脚本（推荐）

```bash
# 1. 赋予执行权限
chmod +x start.sh

# 2. 启动服务（会自动打开设计器界面）
./start.sh start

# 3. 查看状态
./start.sh status

# 4. 查看日志
./start.sh logs

# 5. 停止服务
./start.sh stop
```

**注意**: 启动脚本会自动定位到设计器界面（`/designer`），如果有图形界面会自动打开浏览器。

## 📋 脚本功能

### start.sh - 完整服务管理脚本

提供完整的服务管理功能：

```bash
./start.sh start    # 启动服务（后台运行）
./start.sh stop     # 停止服务
./start.sh restart  # 重启服务
./start.sh status   # 查看服务状态
./start.sh logs     # 查看运行日志
./start.sh error    # 查看错误日志
```

### 自定义端口和主机

```bash
# 使用其他端口启动
PORT=8080 ./start.sh start

# 绑定到特定IP
HOST=192.168.1.100 PORT=8091 ./start.sh start
```

## 🔧 前置要求

1. **Node.js** (建议 v16+)
   ```bash
   node --version
   npm --version
   ```

2. **npm依赖**（脚本会自动安装）

## 📝 部署步骤

### 1. 上传项目到服务器

```bash
# 使用git克隆
git clone <your-repo-url>
cd pageVue1

# 或使用scp上传
scp -r ./pageVue1 user@server:/path/to/deploy
```

### 2. 安装依赖并构建

```bash
# 安装依赖
npm install

# 构建项目
npm run build
```

### 3. 启动服务

```bash
# 方式一：使用快速脚本
chmod +x quick-start.sh
./quick-start.sh

# 方式二：使用管理脚本
chmod +x start.sh
./start.sh start
```

### 4. 配置防火墙

确保防火墙允许访问端口：

```bash
# Ubuntu/Debian (ufw)
sudo ufw allow 8091/tcp
sudo ufw reload

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=8091/tcp
sudo firewall-cmd --reload

# 或直接关闭防火墙（不推荐生产环境）
sudo systemctl stop firewalld
```

### 5. 访问服务

启动成功后，脚本会自动：
- ✅ 显示设计器地址（自动定位到 `/designer` 路径）
- ✅ 如果有图形界面，会自动打开浏览器访问设计器
- ✅ 显示本地和公网访问地址

访问地址：
- 首页: `http://localhost:8091` 或 `http://你的服务器公网IP:8091`
- **设计器（自动定位）**: `http://localhost:8091/designer` 或 `http://你的服务器公网IP:8091/designer`

## 🔒 安全建议

1. **使用反向代理**（推荐）
   - 使用 Nginx 作为反向代理
   - 配置 HTTPS 证书
   - 隐藏真实端口

2. **配置防火墙**
   - 只开放必要端口
   - 限制访问来源

3. **使用进程管理工具**
   - 使用 PM2 管理进程
   - 使用 systemd 创建系统服务

## 📦 使用 PM2 管理（可选）

如果需要更强大的进程管理，可以使用 PM2：

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start npm --name "vue-website" -- run preview -- --host 0.0.0.0 --port 8091

# 查看状态
pm2 status

# 查看日志
pm2 logs vue-website

# 停止服务
pm2 stop vue-website

# 开机自启
pm2 startup
pm2 save
```

## 🌐 使用 Nginx 反向代理（推荐生产环境）

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8091;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 🐛 故障排查

### 1. 端口被占用

```bash
# 查看端口占用
lsof -i :8091
# 或
netstat -tlnp | grep 8091

# 使用其他端口
PORT=8080 ./start.sh start
```

### 2. 无法公网访问

- 检查防火墙设置
- 检查服务器安全组规则（云服务器）
- 确认服务绑定到 `0.0.0.0` 而不是 `127.0.0.1`

### 3. 查看日志

```bash
# 查看运行日志
./start.sh logs

# 查看错误日志
./start.sh error

# 或直接查看日志文件
tail -f logs/app.log
tail -f logs/error.log
```

### 4. 服务无法启动

- 检查 Node.js 版本: `node --version`
- 检查依赖是否安装: `ls node_modules`
- 检查构建是否成功: `ls dist`

## 📞 获取帮助

运行脚本时不带参数可查看帮助：

```bash
./start.sh
```

## 📂 文件说明

- `start.sh` - 完整服务管理脚本（推荐）
- `quick-start.sh` - 快速启动脚本（最简单）
- `logs/app.log` - 运行日志
- `logs/error.log` - 错误日志
- `vue-website.pid` - 进程ID文件

