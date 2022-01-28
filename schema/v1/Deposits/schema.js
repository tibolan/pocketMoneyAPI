const DepositType = [
    "LIQ",
    "VIR"
]
module.exports = {
    user: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        enum: DepositType,
        default: "FOR",
        required: true
    },
    amount: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        },
        required: true
    },
}
