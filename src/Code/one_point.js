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


var fx ,x;

class one_point extends Component {

    constructor() {
        super();
        this.state = {
            fx: " ",
            x: 0,
            showOutputCard: false,
            showGraph: false,
     
        }
        this.handleChange = this.handleChange.bind(this);
        this.onepoint= this.onepoint.bind(this);
    }
    function(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) , e : Math.exp(x) };

        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(x, error) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                error: error[i]
            });
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    onepoint(x) {
        fx = this.state.fx;
        var xn=x;
        var xo=0;
        var sum = parseFloat(0.000000);
        var keepdata=[]
        keepdata['x']=[]
        keepdata['error']=[]  
        var n = 0;
        do{
            xn=this.function(xn);
            if(n==0){
                sum =1;
             }
             else{
                 sum=this.error(xn,xo);
                 xo=xn;
             }
            
                keepdata['x'][n]=xn;
                keepdata['error'][n] = Math.abs(sum).toFixed(8); 
            n++;
            
        }while(Math.abs(sum) > 0.000001);

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
                    <h1 style={{ marginLeft: "80%" , fontSize: "30px"}}>Function<br/><Input size="large" name="fx"  style={{ width: 300, background: "#daedf5" }} /></h1>
                    <h1 style={{ marginLeft: "80%" , fontSize: "30px" }}>X<br/><Input size="large"   name="x" style={{ width: 300, background: "#daedf5" }} /></h1>      
                    <br/><br/>
                    <Button id="Button_OK" type="primary" onClick={
                        () => this.onepoint(parseFloat(this.state.x)) }
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
export default one_point;
