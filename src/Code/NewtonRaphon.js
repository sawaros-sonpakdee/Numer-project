import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Layout, Input, Button, Card, Table } from 'antd';
import { compile} from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const { Content } = Layout;

var dataInTable = []

const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
var fx1,fx2;

class Newton extends Component {

    constructor() {
        super();
        this.state = {
            fx1: "",
            fx2: "",
            x: 0,
       
            showOutputCard: false,
            showGraph: false,
            moveLeft: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.Newton = this.Newton.bind(this);
    }
    function(X) {
        var expr = compile(this.state.fx1);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(xn, error) {
        dataInTable = []
        for (var i = 0; i < xn.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: xn[i],
                error: error[i]
            });
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    Newton(x){
        fx1=this.state.fx1;
        fx2=this.state.fx2;
        var e=parseFloat(0.000000);
        var xnew=0;
        var n = 0;
        var keepdata=[]
        keepdata['x']=[]
        keepdata['error']=[]  
        var xold=x; 
        do{

             xnew=(xold- this.function(xold))/(this.function(xold));
             if(n==0){
                 e=1;
             }
             else{
                   e=this.error(xnew,xold);
             }
           
             xold=xnew;
             keepdata['x'][n]=xold;
             keepdata['error'][n] = Math.abs(e).toFixed(8); 
             n++;
        }while(Math.abs(e) > 0.000001);

        this.createTable(keepdata['x'],keepdata['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })
    }

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
                    <h1 style={{ marginLeft: "80%" , fontSize: "30px"}}>Function f(x)<br/><Input size="large" name="fx1"  style={{ width: 300, background: "#daedf5" }} /></h1>
                    <h1 style={{ marginLeft: "80%" , fontSize: "30px" }}>Function f'(x)<br/><Input size="large"   name="fx2" style={{ width: 300, background: "#daedf5" }} /></h1>
                    <h1 style={{ marginLeft: "80%" }}>XR<Input size="large"   name="x" style={{ width: 299, background: "#daedf5" }} /></h1> <br/><br/>      
                    <br/><br/>
                    <Button id="Button_OK'" type="primary" onClick={
                        () => this.Newton(parseFloat(this.state.x)) }
                        style={{ marginLeft: "130%", background: "#8f6acf", color: "black", fontSize: "20px" }}>OK</Button> 
                    </Content>
                    <br /><br />
                    {this.state.showGraph &&
                        <Card
                            style={{ borderRadius: "20px"   ,colorRendering :'black'}}
                        >
                            <LineChart width={730} height={250} data={dataInTable}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="error" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Line name="error" type="black" dataKey="error" stroke="#8884d8"/>
                            </LineChart>
                        </Card>
                    }
                    <br /><br />
                    {this.state.showOutputCard &&

                        <Card
                            style={{ borderRadius: "10px" }}
                        >
                            <Table columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" ,backgroundColor: '#008080 '}}></Table>
                        </Card>
                    }
                    <br /><br />

                 
                </Content>
            </div>
        );
    }
}
export default Newton;
