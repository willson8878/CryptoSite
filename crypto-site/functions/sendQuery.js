const axios = require("axios");
require("dotenv").config();
exports.handler = async (event, context, callback) => {
  const GET_LINKS = `
    query{
        allCoins{
          data{
            coin_id
            last_h24_volume
          }
        }
      }
    `;

  const { data } = await axios({
    url: 'https://graphql.fauna.com/graphql',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA}`
    },
    data: {
      query: GET_LINKS,
      variables: {}
    }
  });
  console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }

};