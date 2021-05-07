import { Image, Row, Col, Card } from "antd";
import styles from './NewsBar.module.css';

const NewsBar = (props) => {
  return (
    <Row  key={props.key}>
      <Col span={4}>
        <Image       width={200}
      height={200}
      src={props.picture} />
      </Col>
      <Col span={18}>
        <Card title={props.title} bordered={false} className={styles.cardBody}>
            {props.content}
        </Card>
      </Col>
    </Row>
  );
};

export default NewsBar;
