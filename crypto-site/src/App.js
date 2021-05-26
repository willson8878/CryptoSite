import "./App.css";
import "antd/dist/antd.css";
import { Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";

import Market from './Components/Market/Market';
import News from './Components/News/News'

const { Header, Content, Footer } = Layout;

const dataMarket = require('./data/testData.json');
for(let index = 0; index < dataMarket.length; index++){
  dataMarket[index]['key']=index;
}

const dataNews = require('./data/newsTestData.json');
for(let index = 0; index < dataNews.length; index++){
  dataNews[index]['key']=index;
}





function App() {
  return (
    <Layout>
      <Header>
        <div className="logo" />

        {/* implement ANTD Menu component in Nav bar */}
        <Menu theme="dark" mode="horizontal" >
          <Menu.Item key="1"> <Link to='/market'>Market</Link></Menu.Item>
          <Menu.Item key="2"> <Link to='/news'>News</Link></Menu.Item>
        </Menu>
      </Header>

      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 10 }}
      >
        {/* Setting router in each nav bar options */}
        <Route path="/market">
          <div className="site-layout-content"><Market data={dataMarket} /></div>
        </Route>
        <Route path="/news">
          <div className="site-layout-content"><News data={dataNews}/></div>
        </Route>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
