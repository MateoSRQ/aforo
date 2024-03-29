import style from './index.module.css'
// import Cube from '../cube'
import {Col, InputNumber, Row, Slider, Space} from 'antd';
import '@fontsource/archivo'
import '@fontsource/fragment-mono'
import {ConfigProvider, Spin, Table, Tabs, List, Radio, Form, Input, Select, Switch, Divider} from 'antd';


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

let desercion       = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, .01, .01]
let h_por_semana    = [27, 27, 28, 30, 29, 26, 27.5, 28.5, 20.5, 20.5]
let aforo_promedio  = 32.06
const calcularMatriz = (ciclos: number, columnas: number, inicial: number, semestre: number,
                        crecimiento: number, desercion: number[]) => {
    let data = []
    let _initial = inicial
    let index = 0;

    let totalC: Record<string, { data: number }> = {}
    for (let i = 1; i <= columnas; i++) {
        totalC['ciclo' + i] = {data: 0}
    }

    for (let i = 1; i <= columnas; i++) {
        let _row: Record<string, { data: number, index?: number }> = {}
        for (let i = 1; i <= columnas; i++) {
            _row['ciclo' + i] = {data: 0}
        }
        //_row['total'] = {data: 0}
        for (let j = 1; j <= columnas && j <= (ciclos + i - 1); j++) {
            if (j == i) {
                let index: number = 0;
                _row['ciclo' + j] = {
                    data: Math.round(_initial * ((j % 2) ? 1 : semestre)),
                    index: index
                }
                if ((j % 2) == 0) {
                    _initial += Math.round(_initial * crecimiento)
                }
                //_row['total'].data += _row['ciclo' + j].data
                totalC['ciclo' + j].data += _row['ciclo' + j].data
            } else if (j > i && j <= columnas) {
                _row['ciclo' + j] = {
                    data: Math.round(_row['ciclo' + (j - 1)].data * ((1 - desercion[j - i - 1]))),
                    index: ++index
                }
                _row['total'].data += _row['ciclo' + j].data
                totalC['ciclo' + j].data += Math.round(_row['ciclo' + (j - 1)].data * ((1 - desercion[j - i - 1])))
            } else if (j == columnas) {
                //_row['total'].data = 0;
                //for (let k = 1; k <= columnas; k++) {
                //    _row['total'].data += _row['ciclo' + k].data
               // }
            }
        }
        data.push(_row)
    }
    data.push(totalC)
    return data;
}

console.log('-------------------------------------')
let matriz = calcularMatriz(10, 12, 297, .43, .05, desercion);
console.log(matriz)

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
    const [creditos, setCreditos] = useState(20)
    const [plazas, setPlazas] = useState(36)

    let inputs: any = []
    let aforo = 0;
    let promedio = 0;
    if (props.data) {
        inputs = props.data.filter((item: any) => {
            return (item.activo == "Activo")
        });
        for (let i = 0; i < inputs.length; i++) {
            aforo += inputs[i].aforo
        }
        promedio = aforo / inputs.length
    }

    console.log('FILTER')
    console.log(inputs)
    console.log(aforo)
    console.log(promedio)

    let columns = []
    for (let i = 1; i <= size; i++) {
        let column = {
            title: convertToRoman(i),
            dataIndex: 'ciclo' + i,
            key: 'ciclo' + i,
            render(text: any, record: any) {
                if (record['ciclo' + i].data.toString().indexOf("%") != -1) {

                    let n = parseFloat(record['ciclo' + i].data.toString().substring(0, record['ciclo' + i].data.toString().length - 1))


                    return {
                        props: {
                            style: {
                                width: '80px',
                                textAlign: 'center',
                                lineHeight: '20px',
                                padding: '2px',
                                color: (n >= 100) ? 'red' : 'blue'
                            },
                        },
                        children: <div>{record['ciclo' + i].data}</div>,
                    };

                } else {

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
    let totalD = {}
    let totalE = {}

    for (let i = 1; i <= size; i++) {
        totalC['ciclo' + i] = {data: 0}
        totalD['ciclo' + i] = {data: 0}
        totalE['ciclo' + i] = {data: 0}
    }
    totalC['total'] = {data: 0}
    totalD['total'] = {data: 0}
    totalE['total'] = {data: 0}

    for (let i = 1; i <= size; i++) {
        let _row: any = {}
        for (let i = 1; i <= size; i++) {
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
                totalD['ciclo' + j].data += _row['ciclo' + j].data * creditos
                totalE['ciclo' + j].data = numbro(1 - (((plazas * aforo) - totalD['ciclo' + j].data) / (plazas * aforo))).format({
                    output: 'percent',
                    mantissa: 2
                })
                //totalE['ciclo' + j].data = numbro((plazas*aforo)).format({mantissa: 2})
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
                totalD['ciclo' + j].data += Math.round(_row['ciclo' + (j - 1)].data * ((1 - desercion[j - i - 1]))) * creditos
                totalE['ciclo' + j].data = numbro(1 - (((plazas * aforo) - totalD['ciclo' + j].data) / (plazas * aforo))).format({
                    output: 'percent',
                    mantissa: 2
                })
                //totalE['ciclo' + j].data = numbro((plazas*aforo)).format({mantissa: 2})
            }
            if (j == size) {
                _row['total'].data = 0;
                for (let k = 1; k <= size; k++) {
                    _row['total'].data += _row['ciclo' + k].data
                }
            }
        }
        data.push(_row)
    }

    data.push(totalC)
    //data.push(totalD)
    data.push(totalE)
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
                        <Col span={4} style={{color: 'black'}}>
                            # Ingresantes iniciales
                        </Col>
                        <Col span={6}>
                            <Slider
                                min={1}
                                max={1000}
                                onChange={(value: number) => {
                                    setInitial(value)
                                }}
                                value={typeof initial === 'number' ? initial : 0}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={1}
                                max={1000}
                                style={{margin: '0 16px'}}
                                value={initial}
                                onChange={(value: number) => {
                                    setInitial(value)
                                }}
                            />
                        </Col>
                        <Col span={4} style={{color: 'black'}}>
                            % de crecimiento anual
                        </Col>
                        <Col span={6}>
                            <Slider
                                min={0.05}
                                max={1.00}
                                step={0.01}
                                onChange={(value: number) => {
                                    setCrecimiento(value)
                                }}
                                value={typeof crecimiento === 'number' ? crecimiento : 0}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={0.05}
                                max={1.00}
                                style={{margin: '0 16px'}}
                                value={typeof crecimiento === 'number' ? crecimiento : 0}
                                onChange={(value: number) => {
                                    setCrecimiento(value)
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4} style={{color: 'black'}}>
                            # Número de ciclos
                        </Col>
                        <Col span={6}>
                            <Slider
                                min={1}
                                max={14}
                                onChange={(value: number) => {
                                    setSize(value)
                                }}
                                value={typeof size === 'number' ? size : 0}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={1}
                                max={12}
                                onChange={(value: number) => {
                                    setSize(value)
                                }}
                                value={typeof size === 'number' ? size : 0}
                                style={{margin: '0 16px'}}

                            />
                        </Col>
                        <Col span={4} style={{color: 'black'}}>
                            % Semestre final
                        </Col>
                        <Col span={6}>
                            <Slider
                                min={0.05}
                                max={1.00}
                                step={0.01}
                                onChange={(value: number) => {
                                    setSemestre(value)
                                }}
                                value={typeof semestre === 'number' ? semestre : 0}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={0.05}
                                max={1.00}
                                style={{margin: '0 16px'}}
                                onChange={(value: number) => {
                                    setSemestre(value)
                                }}
                                value={typeof semestre === 'number' ? semestre : 0}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={4} style={{color: 'black'}}>
                            # Horas alumno/semana
                        </Col>
                        <Col span={6}>
                            <Slider
                                min={1}
                                max={30}
                                onChange={(value: number) => {
                                    setCreditos(value)
                                }}
                                value={typeof creditos === 'number' ? creditos : 0}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={1}
                                max={30}
                                onChange={(value: number) => {
                                    setCreditos(value)
                                }}
                                value={typeof creditos === 'number' ? creditos : 0}
                                style={{margin: '0 16px'}}

                            />
                        </Col>
                        <Col span={4} style={{color: 'black'}}>
                            % Horas aforo/semana
                        </Col>
                        <Col span={6}>
                            <Slider
                                min={1}
                                max={140}
                                onChange={(value: number) => {
                                    setPlazas(value)
                                }}
                                value={typeof plazas === 'number' ? plazas : 0}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={1}
                                max={140}
                                style={{margin: '0 16px'}}
                                onChange={(value: number) => {
                                    setPlazas(value)
                                }}
                                value={typeof plazas === 'number' ? plazas : 0}
                            />
                        </Col>
                    </Row>
                    <Divider/>
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
