#!/usr/bin/env python3
"""剪映教学APP - 一键启动工具"""
import webbrowser
import http.server
import socketserver
import threading
import os
import sys

PORT = 8080
DIR = os.path.dirname(os.path.abspath(__file__))

os.chdir(DIR)

def start_server():
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"服务器运行中：http://localhost:{PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    t = threading.Thread(target=start_server, daemon=True)
    t.start()
    url = f"http://localhost:{PORT}/index.html"
    print(f"正在打开：{url}")
    webbrowser.open(url)
    print("按 Ctrl+C 停止服务器...")
    try:
        while True:
            pass
    except KeyboardInterrupt:
        print("服务器已停止")
