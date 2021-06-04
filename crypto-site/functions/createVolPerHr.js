const {CREATE_VOL_PER_HR} = require('./utils/query.js');
const sendQuery = require('./utils/sendQuery.js')
const fr = require('./utils/formattedResponse')

exports.handler = async (event) => {

    const {coin, hr_id, volume} = JSON.parse(event.body);
    const vars = {coin, hr_id, volume};
    try {
        const {createVolumePreHr} = await sendQuery(CREATE_VOL_PER_HR,vars);
        
        return fr(200, createVolumePreHr)

    } catch (error) {
        console.log(error)
        return fr(500, {err:error})

    }
}