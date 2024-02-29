const http = require('http');
const nodemailer = require('nodemailer');

// 设置邮件发送配置
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    auth: {
        user: '2925715364@qq.com', // 你的邮箱地址
        pass: 'pijtzbtthgddddja'   // 你的邮箱密码或者应用密码
    }
});

// 定义获取数据函数
function checkSurplusPayAmt() {
    const options = {
        hostname: 'ele.hit.edu.cn',
        port: 80,
        path: '/eleServer/api/roomMea.htm?rId=16374',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 13; V2199A Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/121.0.6167.178 Mobile Safari/537.36 Html5Plus/1.0',
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=2E8DD9E1B146FD772284442FE8D41F9B'
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
                const surplusPayAmt = parsedData.data.surplusPayAmt;
                console.log('surplusPayAmt:', surplusPayAmt);

                // 检查金额是否小于3
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

// 定义发送邮件函数
function sendAlertEmail(amount) {
    const mailOptions = {
        from: '2925715364@qq.com',
        to: 'jmstrand@qq.com',
        subject: '余额提醒',
        text: `306当前剩余电量为${amount}度，请及时充值。`
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
    console.log(error)
    }else{
    console.log('email is ready')
    }
})

checkSurplusPayAmt();
// 设置定时任务，每10分钟执行一次
setInterval(checkSurplusPayAmt, 600000);
