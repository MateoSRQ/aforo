import style from './index.module.css'
// import Cube from '../cube'
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import '@fontsource/archivo'
import '@fontsource/fragment-mono'
import {ConfigProvider, Spin, Table, Tabs, List, Radio, Form, Input, Select, Switch} from 'antd';


import {Button, Modal} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars-2';
import numbro from "numbro";
import {useState} from "react";
import {Drawer} from 'antd';
import type {TabsProps} from 'antd';
import objectHash from "object-hash";
import {useLoading} from 'react-use-loading';
import {LoadingOutlined} from "@ant-design/icons";
import {format} from 'date-fns'

let colorindex = -1;
const colors = [
    '#B4D6D3', '#AA78A6', '#8FB8ED', '#A2AD91',
    '#EAF6FF', '#627264', '#AFD0D6', '#A7B0CA',
    '#DEE2D6', '#e16853', '#8fbac6', '#3a556f',
]

function convertToRoman(num: number) {
    var roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var str = '';

    for (var i of Object.keys(roman)) {
        var q = Math.floor(num / roman[i]);
        num -= q * roman[i];
        str += i.repeat(q);
    }

    return str;
}

export default (props: any) => {
    const [initial, setInitial] = useState(297)
    const [size, setSize] = useState(10)
    const [semestre, setSemestre] = useState(.43)
    const [crecimiento, setCrecimiento] = useState(.05)

    let columns = []
    for (let i=1; i<=size; i++) {
        let column = {
            title: convertToRoman(i),
            dataIndex: 'ciclo' + i,
            key: 'ciclo' + i,
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '80px',
                            textAlign: 'center',
                            lineHeight: '20px',
                            padding: '2px',
                            background: colors[record['ciclo' + i].index % size]
                        },
                    },
                    children: <div>{record['ciclo' + i].data}</div>,
                };
            }
        }
        columns.push(column)
    }

    columns.push({
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                    },
                },
                children: <div>{record.total.data}</div>,
            }
        }
    })

    let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, .01, .01]
    let data = []
    let _initial = initial
    let index = 0;

    let totalC = {}

    for (let i=1; i<=size; i++) {
        totalC['ciclo' + i] = {data: 0}
    }
    totalC['total']= {data: 0}

    for (let i = 1; i <= size; i++) {
        let _row: any = {}
        for (let i=1; i<=size; i++) {
            _row['ciclo' + i] = {data: 0}
        }
        _row['total'] = {data: 0}

        for (let j = 1; j <= size; j++) {
            if (j == i) {
                index = 0;
                _row['ciclo' + j] = {
                    data: Math.round(_initial * ((j % 2) ? 1 : semestre)),
                    index: index
                }
                totalC['ciclo' + j].data += _row['ciclo' + j].data
                if (j % 2) {
                    _initial += Math.round(_initial * crecimiento)
                }
            }
            if (j > i && j <= size) {
                _row['ciclo' + j] = {
                    data: Math.round(_row['ciclo' + (j - 1)].data * ((1 - desercion[j - i - 1]))),
                    index: ++index
                }
                totalC['ciclo' + j].data += Math.round(_row['ciclo' + (j - 1)].data * ((1 - desercion[j - i - 1])))
            }
            if (j == size ) {
                _row['total'].data = 0;
                for (let k = 1; k <= size; k++) {
                    console.log('K: ' + _row['ciclo' + k].data)
                    _row['total'].data += _row['ciclo' + k].data
                }
            }
        }
        data.push(_row)
    }

    data.push(totalC)
    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        colorPrimary: 'red',
                        lineHeight: 3
                    },
                    Tag: {
                        lineHeight: 2.4,
                        fontSize: 16
                    }
                },
                token: {
                    fontFamily: 'Archivo, sans-serif',
                },
            }}
        >
            <div className={style.component}>



                <div className={style.container}>
                    <Row>
                        <Col span={10}>
                            <Slider
                                min={1}
                                max={1000}
                                onChange={(value: number) => { setInitial(value)}}
                                value={typeof initial  === 'number' ? initial : 0}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={1}
                                max={1000}
                                style={{ margin: '0 16px' }}
                                value={initial}
                                onChange={(value: number) => { setInitial(value)}}
                            />
                        </Col>
                        <Col span={10}>
                            <Slider
                                min={0.05}
                                max={1.00}
                                step={0.01}
                                onChange={(value: number) => { setCrecimiento(value)}}
                                value={typeof crecimiento  === 'number' ?crecimiento : 0}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={0.05}
                                max={1.00}
                                style={{ margin: '0 16px' }}
                                value={typeof crecimiento  === 'number' ?crecimiento : 0}
                                onChange={(value: number) => { setCrecimiento(value)}}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Slider
                                min={1}
                                max={12}
                                onChange={(value: number) => { setSize(value)}}
                                value={typeof size  === 'number' ? size : 0}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={1}
                                max={12}
                                onChange={(value: number) => { setSize(value)}}
                                value={typeof size  === 'number' ? size : 0}
                                style={{ margin: '0 16px' }}

                            />
                        </Col>
                        <Col span={10}>
                            <Slider
                                min={0.05}
                                max={1.00}
                                step={0.01}
                                onChange={(value: number) => { setCrecimiento(value)}}
                                value={typeof crecimiento  === 'number' ?crecimiento : 0}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={0.05}
                                max={1.00}
                                style={{ margin: '0 16px' }}
                                value={typeof crecimiento  === 'number' ?crecimiento : 0}
                                onChange={(value: number) => { setCrecimiento(value)}}
                            />
                        </Col>
                    </Row>

                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                </div>
            </div>
        </ConfigProvider>
    )
}

/*
const columns = [
    {
        title: 'I',
        dataIndex: 'ciclo0',
        key: 'ciclo0',

    },
    {
        title: 'II',
        dataIndex: 'ciclo1',
        key: 'ciclo1',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo1.index % 12]
                    },
                },
                children: <div>{record.ciclo1.data}</div>,
            };
        }
    },
    {
        title: 'III',
        dataIndex: 'ciclo2',
        key: 'ciclo2',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo2.index % 12]
                    },
                },
                children: <div>{record.ciclo2.data}</div>,
            };
        }
    },
    {
        title: 'IV',
        dataIndex: 'ciclo3',
        key: 'ciclo3',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo3.index % 12]
                    },
                },
                children: <div>{record.ciclo3.data}</div>,
            };
        }
    },
    {
        title: 'V',
        dataIndex: 'ciclo4',
        key: 'ciclo4',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo4.index % 12]
                    },
                },
                children: <div>{record.ciclo4.data}</div>,
            };
        }
    },
    {
        title: 'VI',
        dataIndex: 'ciclo5',
        key: 'ciclo5',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo5.index % 12]
                    },
                },
                children: <div>{record.ciclo5.data}</div>,
            };
        }
    },
    {
        title: 'VII',
        dataIndex: 'ciclo6',
        key: 'ciclo6',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo6.index % 12]
                    },
                },
                children: <div>{record.ciclo6.data}</div>,
            };
        }
    },
    {
        title: 'VIII',
        dataIndex: 'ciclo7',
        key: 'ciclo7',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo7.index % 12]
                    },
                },
                children: <div>{record.ciclo7.data}</div>,
            };
        }
    },
    {
        title: 'IX',
        dataIndex: 'ciclo8',
        key: 'ciclo8',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo8.index % 12]
                    },
                },
                children: <div>{record.ciclo8.data}</div>,
            };
        }
    },
    {
        title: 'X',
        dataIndex: 'ciclo9',
        key: 'ciclo9',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo9.index % 12]
                    },
                },
                children: <div>{record.ciclo9.data}</div>,
            };
        }
    },
    {
        title: 'XI',
        dataIndex: 'ciclo10',
        key: 'ciclo10',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo10.index % 12]
                    },
                },
                children: <div>{record.ciclo10.data}</div>,
            };
        }
    },
    {
        title: 'XII',
        dataIndex: 'ciclo11',
        key: 'ciclo11',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                        background: colors[record.ciclo11.index % 12]
                    },
                },
                children: <div>{record.ciclo11.data}</div>,
            };
        }
    },
    {
        title: 'A',
        dataIndex: 'ciclo12',
        key: 'ciclo12',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',

                    },
                },
                children: <div>{record.ciclo12.data}</div>,
            };
        }
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '80px',
                        textAlign: 'center',
                        lineHeight: '20px',
                        padding: '2px',
                    },
                },
                children: <div>{record.total.data}</div>,
            };
        }
    },
];




let semestre = .43
let crecimiento = .05
let rl = 12
*/
