module.exports = function (model) {
    return {
        async findOne (id) {
            const Q = await model.findById(id)
            return Q.exec()
        }
    }
}
