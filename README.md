# HIT-Dorm-Elec-Alert

自动检查宿舍的剩余电量，并在电费达到预设的预警值时向设定的邮箱发送预警邮件。

## 配置文件

`config.js` 是配置文件，您应根据需要自行修改，文件中包含注释，说明了每项配置的意义。

## 脚本

`get-ele.js` 是主要脚本。如果请求的协议是 HTTPS，那么需要在脚本中自行修改，默认为 HTTP。

## 示例配置文件

`sample-config.js` 是示例配置文件，它不在脚本执行中起任何作用，仅供参考。

## Windows 启动脚本

`start.bat` 是用于在 Windows 系统中启动`get-ele.js`的启动脚本。启动成功的前提是已经安装了 nodejs 并且配置好了环境变量。

## Linux 启动脚本

`start.sh` 是用于在 Linux 系统中启动脚本的启动脚本。启动成功的前提是已经安装了 nodejs 并且配置好了环境变量。

## Linux 服务

`get-elec.service` 是服务文件，用于在 Linux 系统中自动启动脚本。请在使用前自行配置 nodejs 路径和 `get-ele.js` 路径。
