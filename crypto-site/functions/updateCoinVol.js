const {UPDATE_COIN} = require('./utils/query.js');
const sendQuery = require('./utils/sendQuery.js')
const fr = require('./utils/formattedResponse')

exports.handler = async (event) => {

    const {coin_id,last_h24_volume:new_24h_volume} = JSON.parse(event.body);
    const vars = {coin_id,new_24h_volume};
    try {
        const {updataCoinVolById} = await sendQuery(UPDATE_COIN,vars);
        
        return fr(200, updataCoinVolById)

    } catch (error) {
        console.log(error)
        return fr(500, {err:error})

    }
}