const {    GET_COINS,
    CREATE_COIN,
    INIT_VOL_PER_HR,
    FIND_VOL_BY_COIN_ID,
    UPDATE_COIN,
    CREATE_VOL_PER_HR,
    DELETE_VOL_PER_HR
} = require('./utils/query.js');

const sendQuery = require('./utils/sendQuery.js')
const fr = require('./utils/formattedResponse')


exports.handler = async (data) => {
    
}