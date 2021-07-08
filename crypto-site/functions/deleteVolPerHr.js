const {DELETE_VOL_PER_HR} = require('./utils/query.js');
const sendQuery = require('./utils/sendQuery.js')
const fr = require('./utils/formattedResponse')

exports.handler = async (event) => {

    const {coin_id} = JSON.parse(event.body);
    const vars = {coin_id};
    try {
        const {deleteVolPerHr} = await sendQuery(DELETE_VOL_PER_HR,vars);
        
        return fr(200, deleteVolPerHr)

    } catch (error) {
        console.log(error)
        return fr(500, {err:error})
    }
}