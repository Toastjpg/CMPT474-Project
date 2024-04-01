const mailService = require("nodemailer");

function generateAuthCode() {
    var code = ''
    const AUTH_CODE_LENGTH = 6

    for (let i = 0; i < AUTH_CODE_LENGTH; i++) {
        const num = Math.floor(Math.random() * 10)
        code += num.toString()
    }

    return code
}

async function generateEmail(email, subject, content) {
    let transport = mailService.createTransport({
        service: "Gmail",
        auth: {
            user: "sfusynapse@gmail.com",
            pass: "zsgqshvvsldtfjrn",
        },
    });

    let mailOptions = {
        from: "sfusynapse@sfu.ca",
        to: email,
        subject: subject,
        text: content,
    };

    await transport.sendMail(mailOptions)
}

module.exports = { generateAuthCode, generateEmail }