const dayjs = require("dayjs");
const Mongo = require("../components/Mongo")
let PocketMoney = (function () {

    const throwError = function (message = "Erreur") {
        return {
            type: "error",
            message
        }
    }

    return {
        "toot": 12,
        Zadig () {
            return sendUser("zadig")
        },
        Swann () {
            return sendUser("swann")
        },
        user (user) {
            return sendUser(user)
        },
        start (o) {
            if (!data) {
                data = Object.assign({}, o)
            }
        },
        addFee (user, payload = false) {

        },

        throwError (error) {
            return throwError(error)
        },

        toString () {
            return JSON.stringify(data, null, 4)
        }


    }
})();

module.exports = PocketMoney
