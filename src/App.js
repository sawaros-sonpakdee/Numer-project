import Bisection from './Code/Bisection';
import Flase_Position from './Code/Flase_Position';
import one_point  from './Code/one_point';
import Newton from './Code/NewtonRaphon';
import Cramer from './Code/Cramer';
import GaussEiliminate from './Code/GaussEiliminate';
import GaussJordan from './Code/GaussJordan';
import Jacobi from './Code/Jacobi';
import Seidel from './Code/Seidel';
import Conjugate from './Code/Conjugate'; 
import LU from './Code/LU';
import NewtonDD from './Code/NewtonDD';
import Lagrange from './Code/Lagrange'
import Spline from './Code/Spline';
import LinearRegression from './Code/LinearRegression';
import Polynomial from './Code/Polynomial';
import Trapzoidal from './Code/Trapzoidal';
import Simpson from "./Code/Simpson";

import page from './page';
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { CrownOutlined, QqOutlined, RedditOutlined, GitlabOutlined, SketchOutlined, DribbbleOutlined } from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'tachyons';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  render() {
    return (

      <Layout >
        <Header className="header" style={{ padding: '20px 0', backgroundColor: 'black ' }} >
          <div className="logo" />
          <h1 align='center' style={{marginLeft: "20%" }}><font color="#008080"  >Numerical</font></h1>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
          </Menu>

        </Header>

        <Content >
          <Layout className="site-layout-background" style={{backgroundColor: '#008080 ' }}>
            <Router>
              <Sider className="site-layout-background" width={250}  >


                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >

                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Link to="/page" > <CrownOutlined />Root of </Link>
                      </span>
                    }
                  >

                    <Menu.Item key="Bisection"><QqOutlined />Bisection<Link to="/Bisection" /></Menu.Item>
                    <Menu.Item key="2_Flase_Position"><QqOutlined />Flase Position<Link to="/Flase_Position" /></Menu.Item>
                    <Menu.Item key="3_One"><QqOutlined />One-Point Iteration<Link to="/one_point" /></Menu.Item>
                    <Menu.Item key="4_Newton"><QqOutlined />Newton-Raphson<Link to="/Newton" /></Menu.Item>

                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <CrownOutlined />
                    Linear Algebra
                  </span>
                    }
                  >
                    <Menu.Item key="5"><RedditOutlined />Cramer Rule<Link to="/Cramer"/></Menu.Item>
                    <Menu.Item key="6"><RedditOutlined />Gauss Elimination<Link to ="/GaussEiliminate"/></Menu.Item>
                    <Menu.Item key="7"><RedditOutlined />Gauss Jordan Method<Link to ="/GaussJordan"/></Menu.Item>
                    <Menu.Item key="8"><RedditOutlined />LU Decomposition<Link to ="/LU"/></Menu.Item>
                    <Menu.Item key="9"><RedditOutlined />Jacobi Iteration Method<Link to ="/Jacobi"/></Menu.Item>
                    <Menu.Item key="10"><RedditOutlined />Gauss Seidel Iteration<Link to ="/Seidel"/></Menu.Item>
                    <Menu.Item key="11"><RedditOutlined />Conjugate Gradient Method<Link to ="/Conjugate"/></Menu.Item>

                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    title={
                      <span>
                        <CrownOutlined />
                    Interpolation
                  </span>
                    }
                  >
                    <Menu.Item key="12"><GitlabOutlined />Newton Divide Difference<Link to="/NewtonDD"/></Menu.Item>
                    <Menu.Item key="13"><GitlabOutlined />Lagrange<Link to="/Lagrange"/></Menu.Item>
                    <Menu.Item key="14"><GitlabOutlined />Spline<Link to="/Spline"/></Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub4"
                    title={
                      <span>
                        <CrownOutlined />
                  Least Square Error
                </span>
                    }
                  >
                    <Menu.Item key="15"><SketchOutlined />Linear Regression<Link to ="/LinearRegression"/></Menu.Item>
                    <Menu.Item key="16"><SketchOutlined />Polynomial Regressi<Link to ="/Polynomial"/>on</Menu.Item>
                    <Menu.Item key="17"><SketchOutlined />Multiple Linear Regression<Link to="/MultipleLinear"/></Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub5"
                    title={
                      <span>
                        <CrownOutlined />
                        Integration
                </span>
                    }
                  >
                    <Menu.Item key="18"><DribbbleOutlined />Composite Trapzoidal Rule<Link to="/Trapzoidal"/></Menu.Item>
                    <Menu.Item key="19"><DribbbleOutlined />Composite Simpson Rule<Link to="/Simpson"/></Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              
              <Content style={{ padding: '0 20px', minHeight: 700 }} >
                <Switch>
                  <Route path="/page" component={page} />
                  <Route path="/Bisection" component={Bisection} />
                  <Route path="/Flase_Position" component={Flase_Position} />
                  <Route path="/one_point" component={one_point} />
                  <Route path="/Newton" component={Newton} />
                  <Route path="/Cramer" component={Cramer} />
                  <Route path="/GaussEiliminate" component={GaussEiliminate} />
                  <Route path="/GaussJordan" component={GaussJordan} />
                  <Route path="/LU" component={LU} />
                  <Route path="/Jacobi" component={Jacobi} />
                  <Route path="/Seidel" component={Seidel} />
                  <Route path="/Conjugate" component={Conjugate} />
                  <Route path="/NewtonDD" component={NewtonDD} />
                  <Route path="/Lagrange" component={Lagrange} />
                  <Route path="/Spline" component={Spline} />
                  <Route path="/LinearRegression" component={LinearRegression} />
                  <Route path="/Polynomial" component={Polynomial} />
                  <Route path="/Trapzoidal" component={Trapzoidal} />
                  <Route path="/Simpson"component={Simpson} />


                </Switch>
              </Content>

            </Router>


          </Layout>

        </Content>

      </Layout>
    );

  }
}
export default App;
