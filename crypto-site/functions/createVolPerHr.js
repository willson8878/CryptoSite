const {CREATE_VOL_PER_HR} = require('./utils/query.js');
const sendQuery = require('./utils/sendQuery.js')
const fr = require('./utils/formattedResponse')

exports.handler = async (event) => {
    console.log(event.body)
    const {coin_id} = JSON.parse(event.body);
    const vars = {coin_id};
    try {
        const {createVolPerHr} = await sendQuery(CREATE_VOL_PER_HR,vars);
        
        return fr(200, createVolPerHr)

    } catch (error) {
        console.log(error)
        return fr(500, {err:error})

    }
}