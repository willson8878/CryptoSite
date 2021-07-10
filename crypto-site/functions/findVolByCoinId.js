const {FIND_VOL_BY_COIN_ID} = require('./utils/query.js');
const sendQuery = require('./utils/sendQuery.js')
const fr = require('./utils/formattedResponse')

exports.handler = async (event) => {

    const {coin} = JSON.parse(event.body);
    const vars = {coin};
    try {
        const {findVolumePreHrsByCoinId} = await sendQuery(FIND_VOL_BY_COIN_ID,vars);
        
        return fr(200, findVolumePreHrsByCoinId)

    } catch (error) {
        console.log(error)
        return fr(500, {err:error})

    }
}