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
        console.log(`update games set Winner="${req.body.player}", GameStatus="Completed" where GameID="${req.body.gameID}"`);

        pool.query(`update games set Winner=${req.body.player}, GameStatus="Completed" where GameID=${req.body.gameID}`, (err, result, fields) => {
            if (err) {
                return console.log(err);
            }
            return console.log(result);
        });

        res.status(200).json({
            message: 'Game has been marked completed in backend',
            status: 200
        });
    }
    catch (err) {
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