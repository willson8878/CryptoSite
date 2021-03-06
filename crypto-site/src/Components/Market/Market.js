import { useState, useEffect } from "react";
import MarketData from "../../Services/MarketData";
import updateCoinList from '../../Services/updateCoinList'
import { Table, Image, Statistic, Button } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const getStatistic = (value) => {
  return (
    <Statistic
      value={value}
      precision={2}
      valueStyle={value > 0 ? { color: "green" ,fontSize: "15px"} : { color: "red" ,fontSize: "15px"}}
      prefix={value > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      suffix="%"
    />
  );
};

const colHeader = [
  {
    title: "Coin",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
    render: (text, record) => {
      return (
        <>
          <Image width={20} src={record.image} />
          {record.symbol}
        </>
      );
    },
  },
  {
    title: "Current Price",
    dataIndex: "current_price",
    key: "current_price",
    render: (text, record) => {
      return <>${record.current_price}</>;
    },
  },
  {
    title: "1h",
    dataIndex: "price_change_1_hour",
    key: "price_change_1_hour",
    render: (text, record) => {
      return getStatistic(record.price_change_1_hour);
    },
  },
  {
    title: "24h",
    dataIndex: "price_change_24_hour",
    key: "price_change_24_hour",
    render: (text, record) => {
      return getStatistic(record.price_change_24_hour);
    },
  },
  {
    title: "7d",
    dataIndex: "price_change_7_day",
    key: "price_change_7_day",
    render: (text, record) => {
      return getStatistic(record.price_change_7_day);
    },
  },
  {
    title: "24h Volume",
    dataIndex: "total_volume",
    key: "total_volume",
    render: (text, record) => {
      return <>$ {record.total_volume}</>;
    },
  },
  {
    title: "Mkt Cap",
    dataIndex: "mkt_cap",
    key: "mkt_cap",
    render: (text, record) => {
      return <>$ {record.mkt_cap}</>;
    },
  },
];

const Market = (props) => {
  const [mkt_data, set_mkt_data] = useState();

  const setMkt_data = () => {
    MarketData().then((data) => {
      set_mkt_data(data);
    });
  };

  const cloinListUpdataTest = () => {
    const list = mkt_data.map(item =>{
      return {id: item.id, total_volume: item.total_volume}
    })
    updateCoinList(list);
  }
  

  //use timeout to update the market data every 10 sec
  useEffect(() => {
    setMkt_data();
    const timeoutHandler = setTimeout(() => {
      setMkt_data();
    }, 10000);
    return () => clearTimeout(timeoutHandler);
  }, [mkt_data]);

  return<>
  <Button onClick={cloinListUpdataTest}>Updata Coin List</Button>
  <Table dataSource={mkt_data} columns={colHeader} pagination={{ pageSize: 50 }}/>
  </> ;
};

export default Market;
