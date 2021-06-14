const axios = require("axios");
require("dotenv").config();
module.exports = async (query, variables) => {
  const {
    data: {
      data,
      errors
    }
  } = await axios({
    url: 'https://graphql.fauna.com/graphql',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA}`
    },
    data: {
      query,
      variables
    }
  });
  if (errors) {
    throw new Error(errors[0].message);
  }
  return data;
}