import axios from 'axios';

const updateCoinList = async (params) => {
    await params.map(coin => {
        return axios.post('./api/createCoin', {
            coin_id: coin.id,
            last_h24_volume: coin.total_volume
        }).then(() => {
            axios.post('./api/initVolPerHr', {
                coin_id: coin.id,
                hr_id: 1,
                last_h24_volume: coin.total_volume
            }).catch(e => console.log(e));
        }).catch(async (e) => {
            if (e.response.data.err === 'Instance is not unique.') {
                await axios.post('./api/updateCoinVol', {
                    coin_id: coin.id,
                    last_h24_volume: coin.total_volume
                }).catch(e => console.log(e));

                await axios.post('./api/createVolPerHr', {
                    coin_id: coin.id,
                }).catch(e => console.log(e));

                await axios.post('./api/deleteVolPerHr', {
                    coin_id: coin.id,
                }).catch(e=>{console.log(e)})
            } else {
                console.log(e)
            }

        });
    });
}

export default updateCoinList;