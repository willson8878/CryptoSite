const GET_COINS = `query{
    allCoins{
      data{
        coin_id
        last_h24_volume
      }
    }
  }
`;

const CREATE_COIN = `mutation($coin_id:String!, $last_h24_volume:Float!){
  createCoin(data:{coin_id:$coin_id, last_h24_volume:$last_h24_volume}){
    coin_id
    last_h24_volume
  }
}
`

const CREATE_VOL_PER_HR = `mutation($coin:String!, $hr_id:Int!,$volume:Float!){
  createVolumePreHr(data:{
  	coin:$coin,
    hr_id:$hr_id,
    volume:$volume
  }){
    coin
    volume
    hr_id
  }
}`

const FIND_VOL_BY_COIN_ID = `query($coin:String!){
  findVolumePreHrsByCoinId(coin:$coin){
    data{
      volume
      hr_id
    }
  }
}`

const UPDATE_COIN = `mutation($coin_id:String!, $last_h24_volume:Float!){
  updataCoinVolById(coin_id:$coin_id,last_h24_volume:$last_h24_volume){
    _id
    last_h24_volume
  }
}
`
const UPDATE_COIN_FQL = `Query(
  Lambda(
    ["coin_id", "last_h24_volume"],
    Let(
      {
        coin: Get(Match(Index("findCoinByCoinID"), Var("coin_id"))),
        coinRef: Select(["ref"], Var("coin"))
      },
      Update(Var("coinRef"), {
        data: { last_h24_volume: Var("last_h24_volume") }
      })
    )
  )
)
`

module.exports = {
    GET_COINS,
    CREATE_COIN,
    CREATE_VOL_PER_HR,
    FIND_VOL_BY_COIN_ID,
    UPDATE_COIN
}