#!/bin/bash

# 快速启动脚本 - 一键启动，后台运行
# 使用方法: ./quick-start.sh

cd "$(dirname "$0")"

# 检查并安装依赖
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install
fi

# 构建项目（如果未构建或构建不完整）
if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
    echo "正在构建项目..."
    if ! npm run build; then
        echo "✗ 构建失败，请检查错误信息"
        exit 1
    fi
    echo "✓ 构建完成"
fi

# 后台启动（绑定0.0.0.0支持公网访问，禁用自动打开浏览器）
echo "正在启动服务..."
nohup npm run preview -- --host 0.0.0.0 --port 8091 --no-open > logs/app.log 2>&1 &

# 获取PID
PID=$!
echo $PID > vue-website.pid

# 等待服务启动
echo "等待服务启动..."
sleep 3

# 检查服务是否启动成功
for i in {1..10}; do
    if ps -p $PID > /dev/null 2>&1; then
        # 尝试连接服务，确认服务已就绪
        if curl -s -o /dev/null -w "%{http_code}" "http://localhost:8091" | grep -q "200\|404"; then
            break
        fi
    fi
    sleep 1
done

if ps -p $PID > /dev/null 2>&1; then
    # 获取服务器IP地址
    SERVER_IP=$(hostname -I 2>/dev/null | awk '{print $1}' || curl -s ifconfig.me 2>/dev/null || curl -s ip.sb 2>/dev/null || echo "localhost")
    DESIGNER_URL="http://$SERVER_IP:8091/designer"
    LOCAL_URL="http://localhost:8091/designer"
    
    echo ""
    echo "✓ 启动成功！"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "设计器地址（本地）: $LOCAL_URL"
    echo "设计器地址（公网）: $DESIGNER_URL"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    # 尝试自动打开设计器（仅在检测到图形界面时，静默失败）
    if [ -n "$DISPLAY" ] && command -v xdg-open &> /dev/null 2>&1; then
        echo "正在尝试打开设计器界面..."
        sleep 2
        (xdg-open "$LOCAL_URL" 2>/dev/null &) || true
    elif [ "$(uname)" = "Darwin" ] && command -v open &> /dev/null 2>&1; then
        echo "正在尝试打开设计器界面..."
        sleep 2
        (open "$LOCAL_URL" 2>/dev/null &) || true
    elif command -v curl &> /dev/null 2>&1; then
        # 尝试触发一次访问，确保服务就绪
        echo "正在检查服务状态..."
        curl -s -o /dev/null "$LOCAL_URL" 2>/dev/null && echo "✓ 设计器服务已就绪"
    fi
    
    echo ""
    echo "💡 提示:"
    echo "  - 设计器地址已自动定位到: /designer"
    echo "  - 停止服务: kill $PID"
    echo "  - 查看日志: tail -f logs/app.log"
else
    echo "✗ 启动失败，请查看 logs/app.log"
fi

