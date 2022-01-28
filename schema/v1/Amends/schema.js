const dayjs = require('dayjs')
const AmendType = [
    "RAN",
    "VET",
    "CUI",
    "CHA",
    "FOR"
]
module.exports = {
    fee: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        },
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: true
    },
    comment: String,
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        get: (date) => {
            console.log("get date", date, dayjs(date).format('YYYY-MM-DD'))
            return dayjs(date).format('YYYY-MM-DD')
        },
        set: (date) => {
            console.log("set date", date, dayjs(date).format('YYYY-MM-DD'))
            return dayjs(date).format('YYYY-MM-DD')
        }
    },
    kind: {
        type: String,
        enum: AmendType,
        default: "FOR"
    }
}
