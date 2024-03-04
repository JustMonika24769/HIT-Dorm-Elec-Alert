const http = require('http'); // http模块，如果是https模块，需要改为require('https')
const nodemailer = require('nodemailer');
const config = require('./config.js'); // 导入配置文件

// 设置邮件发送配置
const transporter = nodemailer.createTransport({
    host: config.email.host,
    auth: {
        user: config.email.user, // 邮箱地址
        pass: config.email.pass  // 邮箱密码
    }
});

// 获取数据函数
function checkSurplusPayAmt() {
    const options = {
        hostname: config.web.hostname,
        port: config.web.port,
        path: config.web.path,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 13; V2199A Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/121.0.6167.178 Mobile Safari/537.36 Html5Plus/1.0',
            'Content-Type': 'application/json',
            'Cookie': config.web.cookie
        }
    };

    http.get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                const surplusPayAmt = parsedData.data[config.dataNode];
                console.log('surplusPayAmt:', surplusPayAmt);

                // 检查剩余电量是否小于3度
                if (surplusPayAmt < 3) {
                    sendAlertEmail(surplusPayAmt);
                }
            } catch (e) {
                console.error('Parsing error:', e);
            }
        });
    }).on('error', (e) => {
        console.error('Request error:', e);
    });
}

// 发送邮件函数
function sendAlertEmail(amount) {
    const mailOptions = {
        from: config.email.user,
        to: config.email.to,
        subject: '余额提醒',
        text: `${config.dormNum}宿舍当前剩余电量为${amount}度，请及时充值。`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
        process.exit(1); // 验证失败，退出程序
    } else {
        console.log('Email server is ready.');
        checkSurplusPayAmt(); // 验证成功，执行主函数
        // 设置定时任务
        setInterval(checkSurplusPayAmt, config.interval);
    }
})
