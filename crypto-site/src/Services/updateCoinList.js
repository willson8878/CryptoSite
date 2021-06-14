import axios from 'axios';

const updateCoinList = async (params) => {
    await params.map(coin=>{
         axios.post('./api/createCoin', {coin_id:coin.id, last_h24_volume:coin.total_volume}).catch(e=>{
            if (e.response.data.err === 'Instance is not unique.') {
                axios.post('./api/updateCoinVol', {coin_id:coin.id, last_h24_volume:coin.total_volume}).catch(e=>console.log(e))
            } else {
                return console.log(e)
            }
            
        });
    });
}

export default updateCoinList; 