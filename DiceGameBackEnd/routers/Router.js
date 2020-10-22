// Parser function
const gameEnd = require('./gameEnd/GameEnd');
const playerCount = require('./playerCount/PlayerCount');


const applicationRouter = {
    "/gameEnd": function (req, res) {
        return gameEnd.execute(req, res);
    },

    "/playerCount": function (req, res) {
        return playerCount.execute(req, res);
    }

}

module.exports = applicationRouter;