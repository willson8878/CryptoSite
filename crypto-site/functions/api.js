const getGraphData = require("./helper/getGraphData")

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        return await getGraphData(event);
    }  else {
        return formattedReturn(405, {});
    }
};