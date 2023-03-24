import style from './index.module.css'
import {Col, Collapse, ConfigProvider, Divider, InputNumber, Row, Slider, Table} from "antd";
import ReactECharts from 'echarts-for-react';
import Title from "antd/es/typography/Title";
import "@fontsource/rubik"
import {calcularMatriz, calcularAforo, columnas, mmax} from './functions'
import numbro from "numbro";
import {useState} from "react";

const {Panel} = Collapse;

const DTable = (props: any) => {
    // Negocios Internacioales
    const [inicial, setInicial] = useState(props.inicial)
    const [semestre, setSemestre] = useState(props.semestre)
    const [crecimiento, setCrecimiento] = useState(props.crecimiento)
    const [asistencia, setAsistencia] = useState(props.asistencia)

    //let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, .01, .01]
    //let aforo_promedio = 38.06
    //let coeficientes = [27, 27, 28, 30, 29, 28, 27.5, 28.5, 20.5, 20.5]
    let matriz = calcularMatriz(props.ciclos, props.columnas, inicial, semestre, crecimiento, props.desercion);

    let rdata: any = {
        a: mmax(matriz, true),
        b: props.coeficientes,
        c: calcularAforo(matriz, props.coeficientes, props.aforo_promedio, asistencia)
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

        for (let j = 0; j < props.coeficientes.length; j++) {
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
    for (let j = 0; j < props.coeficientes.length; j++) {
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
            props.setTotal(text)
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


    let data: any = {}
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


    return (
        <div className={style.card}>
            <div>
                <Title level={3} style={{
                    color: "#444",
                    fontFamily: 'Rubik',
                    textTransform: 'uppercase',
                    letterSpacing: '-.6px'
                }}>{props.titulo}</Title>
            </div>
            <Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"
                      defaultActiveKey={['3']}>
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
                <Panel header="CAPACIDAD REQUERIDA POR CICLOS" key="2">
                    <div>
                        <Table
                            columns={columns}
                            dataSource={matriz}
                            pagination={false}
                        />
                    </div>
                </Panel>


                {/*<Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"*/}
                {/*          defaultActiveKey={['1']}>*/}
                {/*    <Panel header="AFORO REQUERIDO POR PERIODO" key="2">*/}
                {/*        <div>*/}
                {/*            <ReactECharts option={options} style={{height: '300px'}}/>*/}
                {/*        </div>*/}
                {/*    </Panel>*/}
                {/*</Collapse>*/}

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
    )

}


export default () => {
    let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, .01, .01]
    let aforo = 38.06
    let coeficientes_01 = [27, 27, 28, 30, 29, 28, 27.5, 28.5, 20.5, 20.5]
    let coeficientes_02 = [28, 28, 28, 28, 28, 28, 23, 25, 20.5, 20.5]
    let coeficientes_03 = [30, 30, 29, 28, 27, 27.5, 24, 26.5, 28, 28, 23.5, 19.5]
    let coeficientes_04 = [0, 16, 13, 24, 25, 16, 18, 18, 18.5, 18.5]
    let coeficientes_05 = [5, 12, 11, 15, 11, 19, 21, 18, 17.5, 16.5]
    let coeficientes_06 = [1, 0, 10, 15, 11, 11, 16, 14, 19.5, 19.5]

    const [total1, setTotal1] = useState(0)
    const [total2, setTotal2] = useState(0)
    const [total3, setTotal3] = useState(0)
    const [total4, setTotal4] = useState(0)
    const [total5, setTotal5] = useState(0)
    const [total6, setTotal6] = useState(0)

    let total = total1 + total2 + total3 + total4 + total5 + total6
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
                <div className={style.card} style={{minHeight: '0px'}}>
                    <Title level={1} style={{
                        color: "#444",
                        fontFamily: 'Rubik',
                        textTransform: 'uppercase',
                        letterSpacing: '-.6px'
                    }}>Sede Jesús María</Title>
                </div>
                <DTable
                    titulo={"Administración de Negocios Internacionales"}
                    inicial={297}
                    semestre={.43}
                    crecimiento={.05}
                    asistencia={.90}
                    ciclos={10}
                    columnas={12}
                    desercion={desercion}
                    coeficientes={coeficientes_01}
                    aforo_promedio={aforo}
                    setTotal={setTotal1}
                />
                <DTable
                    titulo={"Ciencias Contables y Financieras"}
                    inicial={43}
                    semestre={.43}
                    crecimiento={.05}
                    asistencia={.90}
                    ciclos={10}
                    columnas={12}
                    desercion={desercion}
                    coeficientes={coeficientes_02}
                    aforo_promedio={aforo}
                    setTotal={setTotal2}
                />
                <DTable
                    titulo={"Derecho y Ciencias Políticas"}
                    inicial={66}
                    semestre={.43}
                    crecimiento={.05}
                    asistencia={.90}
                    ciclos={12}
                    columnas={12}
                    desercion={desercion}
                    coeficientes={coeficientes_03}
                    aforo_promedio={aforo}
                    setTotal={setTotal3}
                />
                <DTable
                    titulo={"Enfermería"}
                    inicial={66}
                    semestre={.43}
                    crecimiento={.05}
                    asistencia={.90}
                    ciclos={10}
                    columnas={12}
                    desercion={desercion}
                    coeficientes={coeficientes_04}
                    aforo_promedio={aforo}
                    setTotal={setTotal4}
                />
                <DTable
                    titulo={"Estomatología"}
                    inicial={30}
                    semestre={.43}
                    crecimiento={.05}
                    asistencia={.90}
                    ciclos={10}
                    columnas={12}
                    desercion={desercion}
                    coeficientes={coeficientes_05}
                    aforo_promedio={aforo}
                    setTotal={setTotal5}
                />
                <DTable
                    titulo={"Tecnología Médica"}
                    inicial={30}
                    semestre={.43}
                    crecimiento={.05}
                    asistencia={.90}
                    ciclos={10}
                    columnas={12}
                    desercion={desercion}
                    coeficientes={coeficientes_06}
                    aforo_promedio={aforo}
                    setTotal={setTotal6}
                />
                <div className={style.card}>
                    <Title level={4} style={{
                        color: "#444",
                        fontFamily: 'Rubik',
                        letterSpacing: '-.6px',
                        textAlign: 'right',
                        width: 'calc(100% - 40px)',
                        fontWeight: 'bold'
                    }}>
                        {numbro(total).format({mantissa: 2})} de {28*90} horas - {numbro(total/(28*90)*100).format({mantissa: 2})}% de Ocupación.
                    </Title>

                </div>
            </div>

        </ConfigProvider>
    )
}
