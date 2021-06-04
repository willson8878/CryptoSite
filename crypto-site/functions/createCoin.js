const {CREATE_COIN} = require('./utils/query.js');
const sendQuery = require('./utils/sendQuery.js')
const fr = require('./utils/formattedResponse')

exports.handler = async (event) => {

    // deconstruct the coin_id and last_h24_volume from event
    const {coin_id,last_h24_volume} = JSON.parse(event.body);
    const vars = {coin_id,last_h24_volume};
    try {
        const {createCoin} = await sendQuery(CREATE_COIN,vars);
        
        return fr(200, createCoin)

    } catch (error) {
        console.log(error)
        return fr(500, {err:error})

    }
}