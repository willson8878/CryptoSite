import { Table } from 'antd';

const Market = (props) => {
    const getCol = () => {
        const col = [];
        for(const [key] of Object.entries(props.data[0])){
            col.push({
                title: key,
                dataIndex: key,
                key: key,
            })
        }
        return col;
    }
    
    return(
        <Table dataSource={props.data} columns={getCol()} />
    )


}



export default Market;

