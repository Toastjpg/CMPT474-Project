const db = require('../db-connection').pool

const createAccount = async (req, res) => {
    const insertQuery = "INSERT INTO Accounts (username, email, password) VALUE (?,?,?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]
    db.query(insertQuery, values, (err, data) => {
        if(err) {
            res.status(500).json(err)
        }else {
            res.status(200).json("account creation: success")
        }
    })
}
const verifyUniqueUsername = async (req, res) => {
    const selectQuery = "SELECT COUNT(*) AS count FROM Accounts WHERE username=?";
    const values = [
        req.body.username
    ]
    db.query(selectQuery, values, (err, data) => {
        if(err) {
            res.status(500).json(err)
        }else {
            res.status(200).json(data[0].count == 0 ? true :  false)
        }
    })
}

module.exports = { createAccount, verifyUniqueUsername }