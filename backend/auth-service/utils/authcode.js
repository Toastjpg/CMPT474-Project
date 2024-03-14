// helper functions
function generateAuthCode() {
    var code = '';

    // append random digits
    const len = 6;
    for(let i=0; i < len; i++) {
        const num = Math.floor(Math.random() * 10)
        code += num.toString()
    }
    
    return code
}

module.exports = {generateAuthCode}