import style from './index.module.css'
import {Col, Collapse, ConfigProvider, Divider, InputNumber, Row, Slider, Table} from "antd";
import ReactECharts from 'echarts-for-react';
import Title from "antd/es/typography/Title";
import "@fontsource/rubik"
import {calcularMatriz, calcularAforo, columnas, mmax} from './functions'
import numbro from "numbro";
import {useState} from "react";

const {Panel} = Collapse;


export default () => {

    // Negocios Internacioales
    const [inicial, setInicial] = useState(297)
    const [semestre, setSemestre] = useState(.43)
    const [crecimiento, setCrecimiento] = useState(0.05)
    const [asistencia, setAsistencia] = useState(0.9)

    let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, .01, .01]
    let aforo_promedio = 38.06
    let coeficientes = [27, 27, 28, 30, 29, 28, 27.5, 28.5, 20.5, 20.5]
    let matriz = calcularMatriz(10, 12, inicial, semestre, crecimiento, desercion);

    let rdata: any = {
        a: mmax(matriz, true),
        b: coeficientes,
        c: calcularAforo(matriz, coeficientes, aforo_promedio, asistencia)
    }
    let cdata: any = []
    let ccolumns: any = []
    let sum: any = {}
    Object.keys(rdata).forEach(function (key, index) {
        console.log(key)
        let row: any = {}
        if (key == 'a') row['title'] = 'Pos'
        if (key == 'b') row['title'] = 'H. x aula '
        if (key == 'c') row['title'] = 'H. totales '

        for (let j = 0; j < coeficientes.length; j++) {
            row['p' + j] = numbro(rdata[key][j]).format({mantissa: 2})
            if (sum[key] == undefined) sum[key] = 0
            sum[key] += rdata[key][j]
        }
        if (key == 'c') row['total'] = sum.c
        cdata.push(row)
    })

    ccolumns.push({
        key: 291,
        title: 'Descripción',
        dataIndex: 'title',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '140px',
                        lineHeight: '20px',
                        padding: '2px',
                        textAlign: 'right'
                    },
                },
                children: <div>{text}</div>,
            }
        }
    })
    for (let j = 0; j < coeficientes.length; j++) {
        ccolumns.push({
            key: j,
            title: 'P' + (j + 1),
            dataIndex: 'p' + j,
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '80px',
                            lineHeight: '20px',
                            padding: '2px',
                            textAlign: 'right'
                        },
                    },
                    children: <div>{isNaN(text) ? 0 : numbro(text).format({mantissa: 2})}</div>,
                }
            }
        })
    }
    ccolumns.push({
        key: 2912,
        title: 'Total',
        dataIndex: 'total',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '8px',
                        lineHeight: '20px',
                        padding: '2px',
                        textAlign: 'right',
                        fontWeight: 'bold'
                    },
                },
                children: <div>{isNaN(text) ? '' : numbro(text).format({mantissa: 2})}</div>,
            }
        }
    })

    let data = {}
    for (let i = 0; i < matriz.length - 1; i++) {
        let row = []
        Object.keys(matriz[i]).forEach(function (key, index) {
            if (data[key] == undefined) data[key] = 0
            data[key] += isNaN(matriz[i][key].data) ? 0 : matriz[i][key].data
        })
    }

    let _series = []
    let _data = []
    Object.keys(data).forEach(function (key, index) {
        _series.push(key)
        _data.push(data[key])
    })
    let columns = columnas(12, 80, 20);


    // CC y Financieras
    const [inicial2, setInicial2] = useState(43)
    const [semestre2, setSemestre2] = useState(.43)
    const [crecimiento2, setCrecimiento2] = useState(0.05)
    const [asistencia2, setAsistencia2] = useState(0.9)


    //let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, .01, .01]
    let aforo_promedio2 = 38.06
    let coeficientes2 = [28, 28, 28, 28, 28, 28, 23, 25, 20.5, 20.5]
    let matriz2 = calcularMatriz(10, 12, inicial2, semestre2, crecimiento2, desercion);

    let rdata2: any = {
        a: mmax(matriz2, true),
        b: coeficientes2,
        c: calcularAforo(matriz2, coeficientes2, aforo_promedio2, asistencia2)
    }
    let cdata2: any = []
    let ccolumns2: any = []
    let sum2: any = {}
    Object.keys(rdata2).forEach(function (key, index) {
        console.log(key)
        let row: any = {}
        for (let j = 0; j < coeficientes2.length; j++) {
            row['p' + j] = numbro(rdata2[key][j]).format({mantissa: 2})
            if (sum2[key] == undefined) sum2[key] = 0
            sum2[key] += rdata2[key][j]
        }
        if (key == 'c') row['total'] = sum2.c
        cdata2.push(row)
    })

    ccolumns2.push({
        key: 291,
        title: 'Descripción',
        dataIndex: 'title',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '140px',
                        lineHeight: '20px',
                        padding: '2px',
                        textAlign: 'right'
                    },
                },
                children: <div>{text}</div>,
            }
        }
    })
    for (let j = 0; j < coeficientes2.length; j++) {
        ccolumns2.push({
            key: j,
            title: 'P' + (j + 1),
            dataIndex: 'p' + j,
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '80px',
                            lineHeight: '20px',
                            padding: '2px',
                            textAlign: 'right'
                        },
                    },
                    children: <div>{isNaN(text) ? 0 : numbro(text).format({mantissa: 2})}</div>,
                }
            }
        })
    }
    ccolumns2.push({
        key: 2912,
        title: 'Total',
        dataIndex: 'total',
        render(text: any, record: any) {
            return {
                props: {
                    style: {
                        width: '8px',
                        lineHeight: '20px',
                        padding: '2px',
                        textAlign: 'right',
                        fontWeight: 'bold'
                    },
                },
                children: <div>{isNaN(text) ? '' : numbro(text).format({mantissa: 2})}</div>,
            }
        }
    })

    let data2: any = {}
    for (let i = 0; i < matriz2.length - 1; i++) {
        let row = []
        Object.keys(matriz2[i]).forEach(function (key, index) {
            if (data2[key] == undefined) data2[key] = 0
            data2[key] += isNaN(matriz2[i][key].data) ? 0 : matriz2[i][key].data
        })
    }

    let _series2 = []
    let _data2 = []
    Object.keys(data).forEach(function (key, index) {
        _series2.push(key)
        _data2.push(data2.key)
    })
    let columns2 = columnas(12, 80, 20);

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
                <div className={style.card}>
                    <div>
                        <Title level={3} style={{
                            color: "#444",
                            fontFamily: 'Rubik',
                            textTransform: 'uppercase',
                            letterSpacing: '-.6px'
                        }}>Administración de Negocios Internacionales</Title>
                    </div>
                    <Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"
                              defaultActiveKey={['1']}>
                        <Panel header="CONTROLES" key="1">
                            <div>
                                <Row>
                                    <Col span={6} style={{color: 'black'}}>
                                        # Inicial de alumnos
                                    </Col>
                                    <Col span={14}>
                                        <Slider
                                            min={1}
                                            max={2000}
                                            onChange={(value: number) => {
                                                setInicial(value)
                                            }}
                                            value={typeof inicial === 'number' ? inicial : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={2000}
                                            style={{margin: '0 16px'}}
                                            onChange={(value: number) => {
                                                setInicial(value)
                                            }}
                                            value={typeof inicial === 'number' ? inicial : 0}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} style={{color: 'black'}}>
                                        % Ratio ingreso en semestre par
                                    </Col>
                                    <Col span={14}>
                                        <Slider
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setSemestre(value)
                                            }}
                                            value={typeof semestre === 'number' ? semestre : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            style={{margin: '0 16px'}}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setSemestre(value)
                                            }}
                                            value={typeof semestre === 'number' ? semestre : 0}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} style={{color: 'black'}}>
                                        % Crecimiento anual
                                    </Col>
                                    <Col span={14}>
                                        <Slider
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setCrecimiento(value)
                                            }}
                                            value={typeof crecimiento === 'number' ? crecimiento : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            style={{margin: '0 16px'}}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setCrecimiento(value)
                                            }}
                                            value={typeof crecimiento === 'number' ? crecimiento : 0}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} style={{color: 'black'}}>
                                        % Asistencia
                                    </Col>
                                    <Col span={14}>
                                        <Slider
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setAsistencia(value)
                                            }}
                                            value={typeof asistencia === 'number' ? asistencia : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            style={{margin: '0 16px'}}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setAsistencia(value)
                                            }}
                                            value={typeof asistencia === 'number' ? asistencia : 0}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Panel>
                    </Collapse>
                    <Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"
                              defaultActiveKey={['1']}>
                        <Panel header="CAPACIDAD REQUERIDA POR CICLOS" key="1">
                            <div>
                                <Table
                                    columns={columns}
                                    dataSource={matriz}
                                    pagination={false}
                                />
                            </div>
                        </Panel>
                    </Collapse>


                    {/*<Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"*/}
                    {/*          defaultActiveKey={['1']}>*/}
                    {/*    <Panel header="AFORO REQUERIDO POR PERIODO" key="2">*/}
                    {/*        <div>*/}
                    {/*            <ReactECharts option={options} style={{height: '300px'}}/>*/}
                    {/*        </div>*/}
                    {/*    </Panel>*/}
                    {/*</Collapse>*/}
                    <Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"
                              defaultActiveKey={['1']}>
                        <Panel header="POSICIONES REQUERIDAS" key="3">
                            <div>
                                <Table
                                    columns={ccolumns}
                                    dataSource={cdata}
                                    pagination={false}
                                />
                            </div>
                        </Panel>
                    </Collapse>
                </div>


                <div className={style.card}>
                    <div>
                        <Title level={3} style={{
                            color: "#444",
                            fontFamily: 'Rubik',
                            textTransform: 'uppercase',
                            letterSpacing: '-.6px'
                        }}>Ciencias Contables y Financieras</Title>
                    </div>
                    <Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"
                              defaultActiveKey={['1']}>
                        <Panel header="CONTROLES" key="1">
                            <div>
                                <Row>
                                    <Col span={6} style={{color: 'black'}}>
                                        # Inicial de alumnos
                                    </Col>
                                    <Col span={14}>
                                        <Slider
                                            min={1}
                                            max={2000}
                                            onChange={(value: number) => {
                                                setInicial2(value)
                                            }}
                                            value={typeof inicial2 === 'number' ? inicial2 : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={2000}
                                            style={{margin: '0 16px'}}
                                            onChange={(value: number) => {
                                                setInicial2(value)
                                            }}
                                            value={typeof inicial2 === 'number' ? inicial2 : 0}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} style={{color: 'black'}}>
                                        % Ratio ingreso en semestre par
                                    </Col>
                                    <Col span={14}>
                                        <Slider
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setSemestre2(value)
                                            }}
                                            value={typeof semestre2 === 'number' ? semestre2 : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            style={{margin: '0 16px'}}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setSemestre2(value)
                                            }}
                                            value={typeof semestre2 === 'number' ? semestre2 : 0}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} style={{color: 'black'}}>
                                        % Crecimiento anual
                                    </Col>
                                    <Col span={14}>
                                        <Slider
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setCrecimiento2(value)
                                            }}
                                            value={typeof crecimiento2 === 'number' ? crecimiento2 : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            style={{margin: '0 16px'}}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setCrecimiento2(value)
                                            }}
                                            value={typeof crecimiento2 === 'number' ? crecimiento2 : 0}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} style={{color: 'black'}}>
                                        % Asistencia
                                    </Col>
                                    <Col span={14}>
                                        <Slider
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setAsistencia2(value)
                                            }}
                                            value={typeof asistencia2 === 'number' ? asistencia2 : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            style={{margin: '0 16px'}}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(value: number) => {
                                                setAsistencia2(value)
                                            }}
                                            value={typeof asistencia2 === 'number' ? asistencia2 : 0}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Panel>
                    </Collapse>
                    <Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"
                              defaultActiveKey={['1']}>
                        <Panel header="CAPACIDAD REQUERIDA POR CICLOS" key="1">
                            <div>
                                <Table
                                    columns={columns2}
                                    dataSource={matriz2}
                                    pagination={false}
                                />
                            </div>
                        </Panel>
                    </Collapse>


                    {/*<Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"*/}
                    {/*          defaultActiveKey={['1']}>*/}
                    {/*    <Panel header="AFORO REQUERIDO POR PERIODO" key="2">*/}
                    {/*        <div>*/}
                    {/*            <ReactECharts option={options} style={{height: '300px'}}/>*/}
                    {/*        </div>*/}
                    {/*    </Panel>*/}
                    {/*</Collapse>*/}
                    <Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"
                              defaultActiveKey={['1']}>
                        <Panel header="POSICIONES REQUERIDAS" key="3">
                            <div>
                                <Table
                                    columns={ccolumns2}
                                    dataSource={cdata2}
                                    pagination={false}
                                />
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </ConfigProvider>
    )
}
