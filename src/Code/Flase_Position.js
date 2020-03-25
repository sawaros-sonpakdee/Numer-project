import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Layout, Input, Button, Card, Table } from 'antd';
import { compile } from 'mathjs';
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
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
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



var fx;

class FlasePosition extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            showGraph: false,
            moveLeft: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.buttonflase = this.buttonflase.bind(this);
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
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
    buttonflase(xl, xr) {
        fx = this.state.fx;
        var increaseFunction = false;
        var xm = 0;
        var sum = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (this.func(xl) < this.func(xr)) {
            increaseFunction = true;
        }


        do {
            xm = xr - ((this.func(xr)) * (xl - xr) / (this.func(xl) - this.func(xr)));
            if (this.func(xm) * this.func(xl) < 0) {
                sum = this.error(xm, xr);
                xr = xm;
            }
            else {
                sum = this.error(xm, xl);
                xl = xm;
            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xm.toFixed(8);
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;
        } while (Math.abs(sum) > 0.000001);

        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
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
                        <br /><br />
                        <h1 style={{ marginLeft: "80%", fontSize: "30px" }}>Function<br /><Input size="large" name="fx" style={{ width: 300, background: "#daedf5" }} /></h1>
                        <h1 style={{ marginLeft: "80%", fontSize: "30px" }}>XL<br /><Input size="large" name="xl" style={{ width: 300, background: "#daedf5" }} /></h1>
                        <h1 style={{ marginLeft: "80%", fontSize: "30px" }}>XR<br /><Input size="large" name="xr" style={{ width: 299, background: "#daedf5" }} /></h1> <br /><br />
                        <Button id="Button_OK" type="primary" onClick={
                            () => this.buttonflase(parseFloat(this.state.xl), parseFloat(this.state.xr))}
                            style={{ marginLeft: "130%", background: "#8f6acf", color: "black", fontSize: "20px" }}>OK</Button>
                    </Content>

                    <br /><br />
                    {this.state.showGraph &&
                        <Card
                            style={{ borderRadius: "20px", colorRendering: 'black' }}
                        >
                            <LineChart width={730} height={250} data={dataInTable}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="error" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Line name="error" type="black" dataKey="error" stroke="#8884d8" />
                            </LineChart>
                        </Card>
                    }
                    <br /><br />
                    {this.state.showOutputCard &&

                        <Card
                            style={{ borderRadius: "10px" }}
                        >
                            <Table columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black", backgroundColor: '#008080 ' }}></Table>
                        </Card>
                    }
                    <br /><br />
                </Content>
            </div>
        );
    }
}
export default FlasePosition;
