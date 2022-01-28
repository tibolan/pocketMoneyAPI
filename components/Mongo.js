var axios = require('axios');

let Mongo = (function () {
    var connection = {
        "dataSource": "Cluster0",
        "database": "pocketMoney",
        // "collection": "user",s
    };

    var fetch = async function (collection, action = 'findOne', query) {
        var config = {
            method: 'post',
            url: `https://data.mongodb-api.com/app/data-wlfzk/endpoint/data/beta/action/${action}`,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': 'IpnyXHumLJbY47QVKT12fwqPB8O2dZhVBDHoLa4PbpDr6pxv9FP6ree83mMjMVnc'
            },
            data: JSON.stringify(
                Object.assign(
                    {
                        collection: collection
                    },
                    connection,
                    query)
            )
        };

        return axios(config)
            .then(res => res.data)
            .catch(e => {
                console.log('------- ERROR -------')
                console.log(e)
                console.log('------- /ERROR -------')
            })
    }

    return {
        async Create (collection, document) {
            return await fetch(collection, 'insertOne', {document})
        },
        async Read (collection, filter) {
            return await fetch(collection, 'findOne', {filter})
        },
        async ReadAll (collection, filter) {
            return await fetch(collection, 'find', filter)
        },
        async Update (collection, id, set) {
            return await fetch(collection, 'updateOne', {
                filter: { "_id": { "$oid": id } },
                update: {
                    $set: set
                }
            }, set)
        },
        async Delete (collection, id) {
            return await fetch(collection, 'deleteOne', {
                "filter": {"_id": {"$oid": id}}
            })
        },
        async Aggregate (collection, pipeline) {
            return await fetch(collection, 'aggregate', {pipeline})
        }
    }
})()

module.exports = Mongo
