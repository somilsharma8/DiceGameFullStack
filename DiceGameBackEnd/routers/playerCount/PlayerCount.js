// Code for storing game info at the time of commencement

const { createPool } = require('mysql2');
let methods = {};

const pool = createPool({
    host: 'localhost',
    user: 'somilsharma8',
    password: 'somil528491',
    database: 'dicegame'
});

async function saveGameDetails(req, res) {
    try {
        let gameID = Math.floor(1000 + Math.random() * 9000);

        console.log(req.body);
        
        pool.query(`insert into games values(${gameID}, ${req.body.count}, NULL, "Started", ${req.body.maxScore})`, (err, result, fields) => {
            if (err) {
                return console.log(err);
            }
            return console.log(result);
        });

        res.status(200).json({
            message: 'Game details have been saved in backend',
            gameID: gameID,
            status: 200
        });
    }
    catch(err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
}


methods.execute = (req, res) => {
    return saveGameDetails(req, res);
}

module.exports = methods;