const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb"); // import faunaDB
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNA });


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type  coin{
        id:ID!
        coin_id: String!
        volume_pre_hour: [volume_pre_hr]
        last_h24_volume:Float
    }
    type volume_pre_hr{
        coin: coin!
        hr_id: Int!
        volume:Float!
    }

    type Query {
        allVolumePreHrs(last: Int):[volume_pre_hr]
    }

    type Mutation {
        addCoin(coin_id: coin, volume_pre_hour: volume_pre_hr, last_h24_volume:Float):coin
        addVolumePreHour(coin: coin!,hr_id: Int!,volume:Float!):volume_pre_hr
        updateLaast_h24_volume(coin_id: String!,last_h24_volume:Float):last_h24_volume:Float
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query:{

    },
    Mutation:{

    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground:true,
    introspection:true
});

exports.handler = server.createHandler();

