const GET_COINS = `query{
    allCoins{
      data{
        coin_id
        old_24h_volume
        new_24h_volume
      }
    }
  }
`;

const CREATE_COIN = `mutation($coin_id:String!, $old_24h_volume:Float!,$new_24h_volume:Float!){
  createCoin(data:{coin_id:$coin_id, old_24h_volume:$old_24h_volume, new_24h_volume:$new_24h_volume}){
    coin_id
    old_24h_volume
    new_24h_volume
  }
}
`

const INIT_VOL_PER_HR = `mutation($coin:String!, $hr_id:Int!,$volume:Float!){
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

const UPDATE_COIN = `mutation($coin_id:String!, $new_24h_volume:Float!){
  updataCoinVolById(coin_id:$coin_id,new_24h_volume:$new_24h_volume){
    coin_id
    old_24h_volume
    new_24h_volume
  }
}
`


const CREATE_VOL_PER_HR = `mutation($coin_id:String!){
  createVolPerHr(
    coin_id:$coin_id
    ){
      coin
      volume
      hr_id
    }
  }`



//Server as a backup for fauna query of the UDF, no actual propose server inside the script.
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

//Server as a backup for fauna query of the UDF, no actual propose server inside the script.
const CREATE_VOL_PER_HR_FQL = `Query(
  Lambda(
    ["coin_id"],
    Let(
      {
        hr_id: Select(
          [0],
          Max(
            Map(
              Paginate(
                Match(Index("findVolumePreHrsByCoinId"), Var("coin_id"))
              ),
              Lambda("X", Select(["data", "hr_id"], Get(Var("X"))))
            )
          )
        ),
        old_24Hr_Vol: Select(
          ["data", "old_24h_volume"],
          Get(Match(Index("findCoinByCoinID"), Var("coin_id")))
        ),
        new_24h_volume: Select(
          ["data", "new_24h_volume"],
          Get(Match(Index("findCoinByCoinID"), Var("coin_id")))
        ),
      },
      Create(Collection("VolumePreHr"), {
        data: {
          coin: Var("coin_id"),
          hr_id: Add(Var("hr_id"), 1),
          volume: Abs(
            Subtract(Var("new_24h_volume"), ToDouble(Var("old_24Hr_Vol")))
          )
        }
      })
    )
  )
)
`
//Server as a backup for fauna query of the UDF, no actual propose server inside the script.
const DELETE_VOL_PER_HR_FQL = `
Query(
  Lambda(
    "coin_id",
    Let(
      {
        hr_id: Select(
          [0],
          Max(
            Map(
              Paginate(
                Match(Index("findVolumePreHrsByCoinId"), Var("coin_id"))
              ),
              Lambda("X", Select(["data", "hr_id"], Get(Var("X"))))
            )
          )
        ),
      },
      If(LT(24,Var("hr_id")),
        Let(
          {
            ref: Select(["ref"],Get(Match(Index("DeleteVolPreHrIndex"),[Var("coin_id"),Abs(Subtract(Var("hr_id"),24))])))
          },
          Delete(Var("ref"))
          )
      ,"SMALLER")
    )
  )
)
`

module.exports = {
    GET_COINS,
    CREATE_COIN,
    INIT_VOL_PER_HR,
    FIND_VOL_BY_COIN_ID,
    UPDATE_COIN,
    CREATE_VOL_PER_HR
}