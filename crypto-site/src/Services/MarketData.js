import axios from 'axios';

const MarketData = async (props) => {
    //Getting data from coingecko use its http request
    let mkt_data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
    .then(data=>{
       return data.data.map((item,index)=>{
           return{
               // filter the only need data
                name:item.name,
                image:item.image,
                symbol:item.symbol.toUpperCase().trim(),
                current_price:item['current_price'],
                price_change_1_hour:item['price_change_percentage_1h_in_currency'],
                price_change_24_hour:item['price_change_percentage_24h_in_currency'],
                price_change_7_day:item['price_change_percentage_7d_in_currency'],
                mkt_cap:item['market_cap'],
                total_volume:item['total_volume'],
                key:item.name+index
           }
       })
    }).catch(err => console.log(err));
    return await mkt_data;
}


export default MarketData;