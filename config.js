// config.js
module.exports = {
    email: {
        host: 'smtp.qq.com', // 邮箱服务器
        user: 'XXXXXX@qq.com', // 发送邮件的邮箱地址
        pass: 'your_token', // 发送邮件的邮箱密码
        to: 'XXXXXXX@example.com' // 接收邮件的邮箱地址
    },
    web: {
        hostname: 'ele.hit.edu.cn', // 网页的hostname
        port: 80, // 端口,如果是https，需要改为443
        path: '/eleServer/api/roomMea.htm?rId=123', // 请求的路径
        cookie: 'XXXXXXXXXXXXXXXXXXXXXXXXX' // Cookie信息
    },
    dormNum: '123', // 宿舍号
    dataNode: 'surplusPayAmt', // 待提取数据的JSON节点名字
    interval: 600000 // 定时任务的间隔时间，单位毫秒
};