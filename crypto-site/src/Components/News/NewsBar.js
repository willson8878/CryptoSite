import { Image, Row, Col, Card } from "antd";
import styles from './NewsBar.module.css';

const NewsBar = (props) => {
  return (
    <Row  key={props.key}>
      <Col span={4}>
        <Image src={props.picture} />
      </Col>
      <Col span={1} />
      <Col span={17}>
        <Card title={props.title} bordered={false} className={styles.cardBody}>
            {props.content}
        </Card>
      </Col>
    </Row>
  );
};

export default NewsBar;
