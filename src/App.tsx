import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import './styles/css/index.css'
import { Button, Layout, Tooltip, message } from 'antd'
import { HomeOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons'
import { createHashHistory } from 'history'

import Home from './views/Home'
import Add from './views/Add'
import Finish from './views/Finish'

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
})

const history = createHashHistory()
const { Header, Footer, Content } = Layout
function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="m-header centerF">
          <Tooltip title="home" className="m-right centeS">
            <Button
              shape="circle"
              icon={<HomeOutlined />}
              onClick={() => history.push('/')}
            />
          </Tooltip>
          <Tooltip title="add to-do" className="m-right">
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => history.push('/add')}
            />
          </Tooltip>
          <Tooltip title="finished" className="m-right">
            <Button
              shape="circle"
              icon={<CheckOutlined />}
              onClick={() => history.push('/finish')}
            />
          </Tooltip>
        </Header>
        <Content className="site-layout m-content">
          <div className="site-layout-background main">
            <Router>
              <Route exact path="/" component={Home} />
              <Route path="/add" component={Add} />
              <Route path="/finish" component={Finish} />
            </Router>
          </div>
        </Content>
        <Footer className="m-footer">
          <p className="centerF">
            <span className="centerS">to-do ©2020 created by ndzy</span>
          </p>
        </Footer>
      </Layout>
    </div>
  )
}

export default App
