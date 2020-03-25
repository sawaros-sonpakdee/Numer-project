import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Layout, Input, Button, Card, Table } from 'antd';
import { compile} from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const { Content } = Layout;
var math=require('mathjs')
var dataT=[]
const columns = [
    {
        title: "DetA",
        dataIndex: "DetA",
        key: "DetA"
    },
    {
        title: "x1",
        dataIndex: "Detx1",
        key: "Detx1"
    },
    {
        title: "x2",
        dataIndex: "Detx2",
        key: "Detx2"
    },
    {
        title: "x3",
        dataIndex: "Detx3",
        key: "Detx3"
    },
];
class Cramer extends Component {
    constructor(){
        super();
        this.state={
            a11:0,
            a12:0,
            a13:0,
            a21:0,
            a22:0,
            a23:0,
            a31:0,
            a32:0,
            a33:0,
            b11:0,
            b12:0,
            b13:0,
            showTable: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.Cramer = this.Cramer.bind(this);
    }
    createTable(DetA,Detx1,Detx2,Detx3) {
        DetA=DetA;
        Detx1=Detx1;
        Detx3=Detx3;
        Detx2=Detx2;
        dataT.push({
            DetA : DetA,
            Detx1: Detx1,
            Detx2: Detx2,
            Detx3: Detx3
        });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value 
        });
    }
    Cramer(a11,a12,a13,a21,a22,a23,a31,a32,a33,b11,b12,b13){
        var i = 0;
        var data = []
        var DetA =0;
        var Detx1 =0;
        var Detx2 =0;
        var Detx3 =0;
        DetA=((a11*a22*a33)+(a12*a23*a31)+(a13*a21*a32))-((a31*a22*a13)+(a32*a23*a11)+(a33*a21*a12));
        Detx1=((b11*a22*a33)+(a12*a23*b13)+(a13*b12*a32))-((b13*a22*a13)+(a32*a23*b11)+(a33*b12*a12))/DetA;
        Detx2=((a11*b12*a33)+(b12*a23*a31)+(a13*a21*b13))-((a31*b12*a13)+(b13*a23*a11)+(a33*a21*b11))/DetA;
        Detx3=((a11*a22*b13)+(a12*b12*a31)+(b11*a21*a32))-((a31*a22*b11)+(a32*b12*a11)+(b13*a21*a12))/DetA;
        this.createTable(DetA,Detx1,Detx2,Detx3);
        this.setState({
            showTable: true,
        })

    }
 
  
    render() {
        return (
            <div >
                <Content onChange={this.handleChange} >
                    <Content
                        style={{
                            width: 1000,
                        }}
                    >
                    <br/><br/>
                    <div   style={{ marginLeft: "50%" }}>
                    <h2  style={{fontSize: "30px"}} >Matrix A</h2>   

                        <Input size="large" name="a11" style={{ width: 50 , background: "#daedf5"  }}></Input> &nbsp;
                        <Input size="large" name="a12" style={{ width: 50 , background: "#daedf5" }}></Input> &nbsp;
                        <Input size="large" name="a13" style={{ width: 50 , background: "#daedf5" }}></Input> &nbsp;
                        <br/>
                        <br/>
                        <Input size="large" name="a21" style={{ width: 50 , background: "#daedf5" }}></Input> &nbsp;
                        <Input size="large" name="a22" style={{ width: 50 , background: "#daedf5" }}></Input> &nbsp;
                        <Input size="large" name="a23" style={{ width: 50 , background: "#daedf5" }}></Input> &nbsp;
                        <br/>   <br/>
                        <Input size="large" name="a31" style={{ width: 50 , background: "#daedf5" }}></Input> &nbsp;
                        <Input size="large" name="a32" style={{ width: 50 , background: "#daedf5" }}></Input> &nbsp;
                        <Input size="large" name="a33" style={{ width: 50 , background: "#daedf5" }}></Input> &nbsp;
                        <br/>
                        <br/>
                        </div>
                        <div  style={{ marginLeft: "50%"}}>
                        <h2 style={{fontSize: "30px"}} >Matrix B</h2><br/>
                        <Input size="large" name="b11" style={{ width: 50 , background: "#daedf5" }}></Input><br/><br/>
                        <Input size="large" name="b21" style={{ width: 50 , background: "#daedf5" }}></Input><br/><br/>
                        <Input size="large" name="b31" style={{ width: 50 , background: "#daedf5" }}></Input><br/><br/>
                        </div>
                        <br/>
                        <Button onClick={() => this.Cramer(parseInt(this.state.a11), parseInt(this.state.a12), parseInt(this.state.a13),
                        parseInt(this.state.a21), parseInt(this.state.a22), parseInt(this.state.a23),
                        parseInt(this.state.a31), parseInt(this.state.a32), parseInt(this.state.a33),
                        parseInt(this.state.b11), parseInt(this.state.b12), parseInt(this.state.b13))}
                        style={{ marginLeft: "100%", background: "#8f6acf", color: "black", fontSize: "20px"}}>Submit</Button><br /><br />


                    </Content>
                    {this.state.showTable &&
                        <div
                        title={"Output12"}
                        bordered={true}
                        style={{ width: "50%", Int: "inline-start", marginBlockStart: "2%" }}
                        id="output12"
                    >
                         <br /><br /> <Table style={{ width: 800 }} columns={columns} dataSource={dataT} pagination={{ pageSize: 10 }} >
                         </Table>    
                    </div>    
                    }

                   
                </Content>
            </div>
        );
    }
}
export default Cramer;
