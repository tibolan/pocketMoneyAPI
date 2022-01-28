const ThrowApiError = function (status, error) {
        if (!error) {
            error = status
            status = 500
        }

    if (error.errors) {
        for(let err in error.errors) {
            console.log("ERROR", err, "-->", error.errors[err].message)
        }
    } else {
        console.log("ERROR", error.path, "-->", error.message)
    }

    return {
        status,
        messages: error.errors || [error]
    }
}

module.exports = ThrowApiError
