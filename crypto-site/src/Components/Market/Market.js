import { Table, Image } from "antd";
import { useState, useEffect } from "react";
import MarketData from "../../Services/MarketData";

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
          <Image width={15} src={record.image} />
          {record.symbol}
        </>
      );
    },
  },
  {
    title: "Price",
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
      return (
        <div
          style={
            record.price_change_1_hour > 0
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {record.price_change_1_hour.toFixed(2)}%
        </div>
      );
    },
  },
  {
    title: "24h",
    dataIndex: "price_change_24_hour",
    key: "price_change_24_hour",
    render: (text, record) => {
      return (
        <div
          style={
            record.price_change_24_hour > 0
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {record.price_change_24_hour.toFixed(2)}%
        </div>
      );
    },
  },
  {
    title: "7d",
    dataIndex: "price_change_7_day",
    key: "price_change_7_day",
    render: (text, record) => {
      return (
        <div
          style={
            record.price_change_7_day > 0
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {record.price_change_7_day.toFixed(2)}%
        </div>
      );
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

  useEffect(() => {
    setMkt_data();
    const interval = setInterval(() => {
      setMkt_data();
    }, 20000);
    return ()=>clearInterval(interval);
  }, []);

  return <Table dataSource={mkt_data} columns={colHeader} />;
};

export default Market;
