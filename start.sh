#!/bin/bash

# Vue项目Linux后台启动脚本
# 支持公网访问，自动后台运行

# 配置参数
APP_NAME="vue-website"
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="$APP_DIR/logs"
PID_FILE="$APP_DIR/$APP_NAME.pid"
LOG_FILE="$LOG_DIR/app.log"
ERR_LOG_FILE="$LOG_DIR/error.log"
PORT=${PORT:-8091}
HOST=${HOST:-"0.0.0.0"}

# 创建日志目录
mkdir -p "$LOG_DIR"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查Node.js是否安装
check_node() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}错误: 未找到Node.js，请先安装Node.js${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}错误: 未找到npm，请先安装npm${NC}"
        exit 1
    fi
}

# 检查依赖是否安装
check_dependencies() {
    if [ ! -d "$APP_DIR/node_modules" ]; then
        echo -e "${YELLOW}正在安装依赖...${NC}"
        cd "$APP_DIR"
        npm install
    fi
}

# 启动服务
start() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${YELLOW}服务已在运行中 (PID: $PID)${NC}"
            return 1
        else
            rm -f "$PID_FILE"
        fi
    fi
    
    echo -e "${GREEN}正在启动服务...${NC}"
    cd "$APP_DIR"
    
    # 构建项目（如果dist目录不存在或index.html不存在）
    if [ ! -d "$APP_DIR/dist" ] || [ ! -f "$APP_DIR/dist/index.html" ]; then
        echo -e "${YELLOW}检测到未构建或构建不完整，正在构建项目...${NC}"
        if ! npm run build; then
            echo -e "${RED}✗ 构建失败，请检查错误信息${NC}"
            return 1
        fi
        echo -e "${GREEN}✓ 构建完成${NC}"
    fi
    
    # 后台启动服务，绑定到0.0.0.0以支持公网访问，禁用自动打开浏览器
    nohup npm run preview -- --host $HOST --port $PORT --no-open > "$LOG_FILE" 2> "$ERR_LOG_FILE" &
    PID=$!
    echo $PID > "$PID_FILE"
    
    # 验证构建文件
    if [ ! -f "$APP_DIR/dist/index.html" ]; then
        echo -e "${RED}✗ 错误: dist/index.html 不存在，构建可能失败${NC}"
        echo -e "${YELLOW}请手动运行: npm run build${NC}"
        rm -f "$PID_FILE"
        return 1
    fi
    
    # 等待服务启动
    echo -e "${YELLOW}等待服务启动...${NC}"
    sleep 3
    
    # 检查服务是否启动成功
    for i in {1..15}; do
        if ! ps -p $PID > /dev/null 2>&1; then
            echo -e "${RED}✗ 服务进程已退出，请查看错误日志: $ERR_LOG_FILE${NC}"
            rm -f "$PID_FILE"
            return 1
        fi
        
        # 尝试连接服务，确认服务已就绪
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT" 2>/dev/null || echo "000")
        if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "404" ]; then
            echo -e "${GREEN}✓ 服务响应正常 (HTTP $HTTP_CODE)${NC}"
            break
        fi
        
        if [ $i -eq 15 ]; then
            echo -e "${YELLOW}⚠ 警告: 服务可能未完全启动，但进程仍在运行${NC}"
        fi
        
        sleep 1
    done
    
    if ps -p $PID > /dev/null 2>&1; then
        # 获取服务器IP地址（用于公网访问）
        SERVER_IP=$(hostname -I 2>/dev/null | awk '{print $1}' || curl -s ifconfig.me || curl -s ip.sb || echo "localhost")
        DESIGNER_URL="http://$SERVER_IP:$PORT/designer"
        LOCAL_URL="http://localhost:$PORT/designer"
        
        echo -e "${GREEN}✓ 服务启动成功！${NC}"
        echo -e "${GREEN}  PID: $PID${NC}"
        echo -e "${GREEN}  访问地址: http://$HOST:$PORT${NC}"
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}  设计器地址（本地）: $LOCAL_URL${NC}"
        echo -e "${GREEN}  设计器地址（公网）: $DESIGNER_URL${NC}"
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}  日志文件: $LOG_FILE${NC}"
        echo -e "${GREEN}  错误日志: $ERR_LOG_FILE${NC}"
        echo ""
        
        # 尝试自动打开设计器界面（仅在检测到图形界面时）
        if [ -n "$DISPLAY" ] && command -v xdg-open &> /dev/null 2>&1; then
            echo -e "${YELLOW}正在尝试打开设计器界面...${NC}"
            sleep 2
            (xdg-open "$LOCAL_URL" 2>/dev/null &) || true
        elif [ "$(uname)" = "Darwin" ] && command -v open &> /dev/null 2>&1; then
            echo -e "${YELLOW}正在尝试打开设计器界面...${NC}"
            sleep 2
            (open "$LOCAL_URL" 2>/dev/null &) || true
        elif command -v curl &> /dev/null 2>&1; then
            # 尝试触发一次访问，确保服务就绪
            echo -e "${YELLOW}正在检查服务状态...${NC}"
            curl -s -o /dev/null "$LOCAL_URL" 2>/dev/null && echo -e "${GREEN}✓ 设计器服务已就绪${NC}"
        fi
        
        echo ""
        echo -e "${YELLOW}💡 提示:${NC}"
        echo -e "${YELLOW}  - 设计器地址已自动定位到: /designer${NC}"
        echo -e "${YELLOW}  - 如需停止服务，请运行: $0 stop${NC}"
        echo -e "${YELLOW}  - 查看日志: $0 logs${NC}"
    else
        echo -e "${RED}✗ 服务启动失败，请查看错误日志: $ERR_LOG_FILE${NC}"
        rm -f "$PID_FILE"
        return 1
    fi
}

# 停止服务
stop() {
    if [ ! -f "$PID_FILE" ]; then
        echo -e "${YELLOW}服务未运行${NC}"
        return 1
    fi
    
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        echo -e "${YELLOW}正在停止服务 (PID: $PID)...${NC}"
        kill $PID
        
        # 等待进程结束
        for i in {1..10}; do
            if ! ps -p $PID > /dev/null 2>&1; then
                break
            fi
            sleep 1
        done
        
        # 如果还在运行，强制杀死
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${YELLOW}强制停止服务...${NC}"
            kill -9 $PID
        fi
        
        rm -f "$PID_FILE"
        echo -e "${GREEN}✓ 服务已停止${NC}"
    else
        echo -e "${YELLOW}服务未运行${NC}"
        rm -f "$PID_FILE"
    fi
}

# 重启服务
restart() {
    echo -e "${YELLOW}正在重启服务...${NC}"
    stop
    sleep 2
    start
}

# 查看状态
status() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${GREEN}✓ 服务运行中${NC}"
            echo -e "  PID: $PID"
            echo -e "  访问地址: http://$HOST:$PORT"
            echo -e "  设计器地址: http://$HOST:$PORT/designer"
            echo -e "  日志文件: $LOG_FILE"
            
            # 显示进程信息
            echo ""
            echo "进程信息:"
            ps -p $PID -o pid,ppid,cmd,%mem,%cpu,etime
            
            # 显示端口占用
            echo ""
            echo "端口占用:"
            netstat -tlnp 2>/dev/null | grep ":$PORT " || lsof -i :$PORT 2>/dev/null || ss -tlnp | grep ":$PORT "
        else
            echo -e "${RED}✗ 服务未运行（PID文件存在但进程不存在）${NC}"
            rm -f "$PID_FILE"
        fi
    else
        echo -e "${RED}✗ 服务未运行${NC}"
    fi
}

# 查看日志
logs() {
    if [ -f "$LOG_FILE" ]; then
        tail -f "$LOG_FILE"
    else
        echo -e "${YELLOW}日志文件不存在: $LOG_FILE${NC}"
    fi
}

# 查看错误日志
error_logs() {
    if [ -f "$ERR_LOG_FILE" ]; then
        tail -f "$ERR_LOG_FILE"
    else
        echo -e "${YELLOW}错误日志文件不存在: $ERR_LOG_FILE${NC}"
    fi
}

# 主函数
main() {
    check_node
    
    case "$1" in
        start)
            check_dependencies
            start
            ;;
        stop)
            stop
            ;;
        restart)
            check_dependencies
            restart
            ;;
        status)
            status
            ;;
        logs)
            logs
            ;;
        error)
            error_logs
            ;;
        *)
            echo "用法: $0 {start|stop|restart|status|logs|error}"
            echo ""
            echo "命令说明:"
            echo "  start   - 启动服务（后台运行，支持公网访问）"
            echo "  stop    - 停止服务"
            echo "  restart - 重启服务"
            echo "  status  - 查看服务状态"
            echo "  logs    - 查看运行日志"
            echo "  error   - 查看错误日志"
            echo ""
            echo "环境变量:"
            echo "  PORT    - 服务端口（默认: 8091）"
            echo "  HOST    - 绑定地址（默认: 0.0.0.0）"
            echo ""
            echo "示例:"
            echo "  PORT=8080 HOST=0.0.0.0 $0 start  # 在8080端口启动"
            exit 1
            ;;
    esac
}

main "$@"

