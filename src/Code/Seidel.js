import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Layout, Input, Button, Card, Table } from 'antd';
import { compile, range } from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const { Content } = Layout;


class Seidel extends Component {

   
    render() {
        return (
            <div >
                <Content onChange={this.handleChange} >
                    <Content
                        style={{
                            width: 500,
                        }}
                    >
                    <br/><br/>
                    <h1 style={{ marginLeft: "80%"}}>Function<Input size="large" name="fx"  style={{ width: 300, background: "#daedf5" }} /></h1>
                    <h1 style={{ marginLeft: "80%" }}>XL<Input size="large"   name="xl" style={{ width: 300, background: "#daedf5" }} /></h1>      
                    <h1 style={{ marginLeft: "80%" }}>XR<Input size="large"   name="xr" style={{ width: 299, background: "#daedf5" }} /></h1> <br/><br/>
                    <Button id="Button_OK" type="primary" onClick={
                        () => this.Seidel(parseFloat(this.state.xl), parseFloat(this.state.xr))}
                        style={{ marginLeft: "130%", background: "#8f6acf", color: "black", fontSize: "20px" }}>OK</Button> 
                    </Content>

                    <br /><br />
                   
                </Content>
            </div>
        )
    }
}
export default Seidel;
