const {GET_COINS} = require('./utils/query.js');
const sendQuery = require('./utils/sendQuery.js')
const fr = require('./utils/formattedResponse')

exports.handler = async (event) => {
    try {
        const res = await sendQuery(GET_COINS);
        const data = res.allCoins.data;
        return fr(200, data)

    } catch (error) {
        return fr(500, {err:error})

    }
}