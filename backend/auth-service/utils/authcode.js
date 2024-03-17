function generateAuthCode() {
    var code = ''
    const AUTH_CODE_LENGTH = 6

    for (let i = 0; i < AUTH_CODE_LENGTH; i++) {
        const num = Math.floor(Math.random() * 10)
        code += num.toString()
    }

    return code
}

module.exports = { generateAuthCode }