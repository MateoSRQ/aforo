import style from './index.module.css'
import {Col, Collapse, ConfigProvider, Divider, Input, InputNumber, Radio, Row, Slider, Table} from "antd";
import "@fontsource/archivo"
import "@fontsource/anton"
import "@fontsource/roboto"
import "@fontsource/roboto/700.css"
import "@fontsource/open-sans"
import type {ColumnsType} from 'antd/es/table';
import {calcularMatriz, calcularAforo, columnas, mmax} from './functions'
import React, {useContext, useState} from "react";
import numbro from "numbro";
import _data from './data.json'
import _aforo from './aforo.json'
import _etca from './etca2.json'
import Aforo from "../aforo2";
import {InsertRowBelowOutlined} from "@ant-design/icons";
import {Tabs} from 'antd';
import type {TabsProps} from 'antd';


const {Panel} = Collapse;

const columns: any = [
    {
        title: 'Sede', dataIndex: 'sede', key: 'sede', width: 350, render: (text: any, record: any) => {
            return (
                <div style={{fontWeight: 500, fontSize: '22px'}}>
                    {record.sede}
                </div>
            )
        }
    },
    {title: 'Población Inicial', dataIndex: 'sede1', key: 'sede1'},
    {title: '% Crecimiento', dataIndex: 'sede2', key: 'sede2'},
    {title: '% Ingreso Semestre Par', dataIndex: 'sede3', key: 'sede3'},
    {title: '% Asistencia', dataIndex: 'sede5', key: 'sede5'},
    {
        title: 'Total', dataIndex: 'total', key: 'total', render: (text: any, record: any) => {
            return (
                <div style={{fontWeight: 500, fontSize: '22px'}}>
                    {record?.total ? numbro(record.total).format({mantissa: 2}) : ''} -
                    {record?.total ? numbro((parseFloat(record.total)/(28*90))*100).format({mantissa: 2})  + '%' : ''}
                </div>
            )
        }
    },
    // { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    // { title: 'Address', dataIndex: 'address', key: 'address' },
];

const columns2: any = [
    {
        title: 'Sede', dataIndex: 'sede', key: 'sede', width: 350, render: (text: any, record: any) => {
            return (
                <div style={{fontWeight: 500, fontSize: '22px'}}>
                    {record.sede}
                </div>
            )
        }
    }

    // { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    // { title: 'Address', dataIndex: 'address', key: 'address' },
];

const sede_columns: any = [
    {title: 'Carrera', dataIndex: 'carrera', key: 'carrera', width: 350},
    {
        title: 'Población inicial', dataIndex: 'inicial', key: 'inicial', render: (text: any, record: any) => {
            return record?.valores?.inicial ? numbro(record.valores.inicial).format({mantissa: 0}) : ''
        }
    },
    {
        title: '% Crecimiento', dataIndex: 'crecimiento', key: 'crecimiento', render: (text: any, record: any) => {
            return record?.valores?.crecimiento ? numbro(record.valores.crecimiento * 100).format({mantissa: 0}) + '%' : ''
        }
    },
    {
        title: '% Ingreso Semestre Par', dataIndex: 'semestre', key: 'semestre', render: (text: any, record: any) => {
            return record?.valores?.semestre ? numbro(record.valores.semestre * 100).format({mantissa: 0}) + '%' : ''
        }
    },
    //{title: 'Ciclos', dataIndex: 'valores.ciclos', key: 'ciclos'},
    {
        title: '% Asistencia', dataIndex: 'valores.asistencia', key: 'asistencia', render: (text: any, record: any) => {
            return record?.valores?.asistencia ? numbro(record.valores.asistencia * 100).format({mantissa: 0}) + '%' : ''
        }
    },
    {
        title: 'Total', dataIndex: 'total', key: 'total', render: (text: any, record: any) => {
            return record?.total ? numbro(record.total).format({mantissa: 2}) : ''
        }
    },
]

const carrera_columns: any = [
    {title: 'Población inicial', dataIndex: 'inicial', key: 'inicial'},
    {title: '% Crecimiento', dataIndex: 'crecimiento', key: 'crecimiento'},
    {title: '% Ingreso Semestre Par', dataIndex: 'semestre', key: 'semestre'},
    //{title: 'Ciclos', dataIndex: 'ciclos', key: 'ciclos'},
    {title: '% Asistencia', dataIndex: 'asistencia', key: 'asistencia'},
]

let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, .01, .01]
//let aforo = 38.06

const AppContext = React.createContext({})

const MasterTable = (props: any) => {

    const items: TabsProps['items'] = [
            {
                key: '1',
                label: `Análisis de ocupabilidad`,
                children: (
                    <>
                        {/*<div className={style.card}>*/}
                        <div className={style.title}>Universidad Alas Peruanas - Análisis de Aforo</div>
                        <Table
                            //key={Math.random()}
                            style={{width: '100%'}}
                            pagination={false}
                            columns={props.columns}
                            expandable={{
                                //defaultExpandAllRows: true,
                                expandedRowRender: (record) => {
                                    return <SedeTable data={record.carreras} sede={record.sede}/>
                                }
                            }}
                            dataSource={props.data}
                        />
                        {/*</div>*/}
                        {/*<div className={style.card}>*/}
                        <div style={{
                            height: '50px',
                            color: 'gray',
                            lineHeight: '50px',
                            textTransform: 'uppercase',
                            fontSize: '12px'
                        }}>Universidad Alas Peruanas - Gerencia de Tecnología
                        </div>

                        {/*</div>*/}
                    </>)
            },
            {
                key: '2',
                label: `Registro de generadores de aforo `,
                children: (
                    <div>
                        {/*<div className={style.card}>*/}
                        <div className={style.title}>Universidad Alas Peruanas - Registro de Generadores de Aforo</div>
                        <Table
                            //key={Math.random()}
                            style={{width: '100%'}}
                            pagination={false}
                            columns={props.columns}
                            expandable={{
                                //defaultExpandAllRows: true,
                                expandedRowRender: (record) => {
                                    return <Aforo data={_etca[record.sede]}/>
                                }
                            }}
                            dataSource={props.data}
                        />
                        {/*</div>*/}
                        {/*<div className={style.card}>*/}
                        <div style={{
                            height: '50px',
                            color: 'gray',
                            lineHeight: '50px',
                            textTransform: 'uppercase',
                            fontSize: '12px'
                        }}>Universidad Alas Peruanas - Gerencia de Tecnología
                        </div>
                    </div>
                )
            }
        ]
    return (
        <div className={style.card}>
            <Tabs defaultActiveKey="1" items={items} style={{width: '100%', padding: '24px'}}/>
        </div>
    )
}

const SedeAforoTable = (props: any) => {
    return (
        <div className={style.card}>
            <Table
                //key={Math.random()}
                style={{width: '100%'}}
                pagination={false}
                columns={sede_columns}
                expandable={{
                    //defaultExpandAllRows: true,
                    expandedRowRender: (record) => {
                        return <Aforo data={_aforo}/>
                    }
                }}
                dataSource={props.data}
            />
        </div>
    )
}

const SedeTable = (props: any) => {
    return (
        <div className={style.card}>
            <Table
                //key={Math.random()}
                style={{width: '100%'}}
                pagination={false}
                columns={sede_columns}
                expandable={{
                    //defaultExpandAllRows: true,
                    expandedRowRender: (record) => {
                        return <CarreraTable {...record.valores} sede={props.sede} carrera={record.carrera}/>
                    }
                }}
                dataSource={props.data}
            />
        </div>
    )
}

const CarreraTable = (props: any) => {
    let matriz = calcularMatriz(props.ciclos, props.columnas, props.inicial, props.semestre, props.crecimiento, desercion);
    let columns = columnas(12, 80, 20);

    const {data, setData} = useContext(AppContext)

    let rdata: any = {
        a: mmax(matriz, true),
        b: props.coeficientes,
        c: calcularAforo(matriz, props.coeficientes, 38.06, props.asistencia)
    }
    let cdata: any = []
    let ccolumns: any = []
    let sum: any = {}
    Object.keys(rdata).forEach(function (key, index) {
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
                        width: '120px',
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
            return {
                props: {
                    style: {
                        width: '120px',
                        lineHeight: '20px',
                        padding: '2px',
                        textAlign: 'right',
                        fontWeight: 'bold',
                        fontSize: '16px'
                    },
                },
                children: <div>{isNaN(text) ? '' : numbro(text).format({mantissa: 2})}</div>,
            }
        }
    })

    let _caforo = calcularAforo(matriz, props.coeficientes, 38.06, props.asistencia).length ? calcularAforo(matriz, props.coeficientes, 38.06, props.asistencia).reduce((sum = 0, current = 0) => {
        return sum + current
    }) : 0

    const sedepl = (json: any) => {
        let dirty = false
        for (let i = 0; i < json.length; i++) {
            let prev_total = json[i].total
            let sede_total = 0
            for (let j = 0; j < json[i].carreras.length; j++) {
                sede_total += json[i].carreras[j].total ? json[i].carreras[j].total : 0
            }
            if (sede_total != prev_total) {
                dirty = true
                json[i].total = sede_total
            }
        }
        return json
        //return null
    }

    const repl = (json: any, sede: string, carrera: string, tipo: string, valor: number) => {
        for (let i = 0; i < json.length; i++) {
            if (json[i].sede == sede) {
                for (let j = 0; j < json[i].carreras.length; j++) {
                    if (json[i].carreras[j].carrera == carrera) {
                        if (['inicial', 'crecimiento', 'semestre', 'ciclos', 'columnas', 'asistencia'].includes(tipo)) {
                            if (json[i].carreras[j].valores[tipo] != valor) {
                                json[i].carreras[j].valores[tipo] = valor
                                return json
                            }
                            return null
                        } else {
                            if (json[i].carreras[j][tipo] != valor) {
                                json[i].carreras[j][tipo] = valor
                                return json
                            }
                            return null
                        }
                    }
                }
            }
        }
        return null
    }

    const vrepl = (sede: string, carrera: string, tipo: string, value: any) => {
        let _tdata = JSON.parse(JSON.stringify(data))
        let _repl = repl(_tdata, sede, carrera, tipo, value)
        if (_repl) {
            _repl = sedepl(_repl)
            setData(_repl)
        }
    }

    const branch = (json: any, carrera: string, from: string, to: string) => {
        let _tdata = JSON.parse(JSON.stringify(json));
        let temp;
        outerBlock: {
            for (let i = 0; i < _tdata.length; i++) {
                if (_tdata[i].sede == from) {
                    for (let j = 0; j < _tdata[i].carreras.length; j++) {
                        if (_tdata[i].carreras[j].carrera == carrera) {
                            temp = _tdata[i].carreras[j]
                            _tdata[i].carreras.splice(j, 1);
                            //delete _tdata[i].carreras[j]
                            break outerBlock;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < _tdata.length; i++) {
            if (_tdata[i].sede == to) {
                _tdata[i].carreras.push(temp)
            }
        }
        return _tdata;
    }

    const vbranch = (carrera: string, from: string, to: string) => {
        let _tdata = branch(data, carrera, from, to)
        if (_tdata && _tdata != data) {
            _tdata = sedepl(_tdata)
            setData(_tdata)
        }
    }
    vrepl(props.sede, props.carrera, 'total', _caforo)

    const sedeChange = (e) => {
        vbranch(props.carrera, props.sede, e.target.value)
    }

    return (
        <>
            <div className={style.card}>
                <Row gutter={16} style={{width: '100%'}}>
                    <Col className="gutter-row" span={6} style={{height: '30px'}}>
                        <InputNumber
                            size="small"
                            min={0}
                            max={2000}
                            value={props.inicial}
                            onChange={(value: number) => {
                                //setInicial(value)
                                vrepl(props.sede, props.carrera, 'inicial', value)
                            }}
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '8px',
                                border: 'none',
                                fontSize: '20px'
                            }}
                        />
                    </Col>
                    <Col className="gutter-row" span={6} style={{height: '30px'}}>
                        <InputNumber
                            size="small"
                            min={0}
                            step={0.01}
                            max={1}
                            value={props.crecimiento}
                            onChange={(value: number) => {
                                vrepl(props.sede, props.carrera, 'crecimiento', value)
                            }}
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '8px',
                                border: 'none',
                                fontSize: '20px'
                            }}
                        />
                    </Col>
                    <Col className="gutter-row" span={6} style={{height: '30px'}}>
                        <InputNumber
                            size="small"
                            step={0.01}
                            min={0}
                            max={1}
                            value={props.semestre}
                            onChange={(value: number) => {
                                //setSemestre(value)
                                vrepl(props.sede, props.carrera, 'semestre', value)
                            }}
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '8px',
                                border: 'none',
                                fontSize: '20px'
                            }}
                        />
                    </Col>
                    <Col className="gutter-row" span={6} style={{height: '30px'}}>
                        <InputNumber
                            size="small"
                            step={0.01}
                            min={0}
                            max={1}
                            value={props.asistencia}
                            onChange={(value: number) => {
                                //setAsistencia(value)
                                vrepl(props.sede, props.carrera, 'asistencia', value)
                            }}
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '8px',
                                border: 'none',
                                fontSize: '20px'
                            }}
                        />
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <Slider
                            min={0}
                            max={2000}
                            value={props.inicial}
                            onChange={(value: number) => {
                                //setInicial(value)
                                vrepl(props.sede, props.carrera, 'inicial', value)
                            }}
                            style={{filter: 'grayscale(1)', marginBottom: '16px'}}
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Slider
                            step={0.01}
                            min={0}
                            max={1}
                            value={props.crecimiento}
                            onChange={(value: number) => {
                                //setCrecimiento(value)
                                vrepl(props.sede, props.carrera, 'crecimiento', value)
                            }}
                            style={{filter: 'grayscale(1)'}}
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Slider
                            step={0.01}
                            min={0}
                            max={1}
                            value={props.semestre}
                            onChange={(value: number) => {
                                //setSemestre(value)
                                vrepl(props.sede, props.carrera, 'semestre', value)
                            }}
                            style={{filter: 'grayscale(1)'}}
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Slider
                            step={0.01}
                            min={0}
                            max={1}
                            value={props.asistencia}
                            onChange={(value: number) => {
                                //setAsistencia(value)
                                vrepl(props.sede, props.carrera, 'asistencia', value)
                            }}
                            style={{filter: 'grayscale(1)'}}
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className={style.controllabel}>INGRESANTES</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className={style.controllabel}>FACTOR ANUAL DE CRECIMIENTO</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className={style.controllabel}>FACTOR DE DE DECRECIMIENTO SEMESTRAL</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className={style.controllabel}>FACTOR DE ASISTENCIA</div>
                    </Col>
                </Row>
            </div>
            <div className={style.card}>
                <Table
                    //key={Math.random()}
                    style={{width: 'calc(100% - 20px)', filter: 'grayscale(0.7)'}}
                    dataSource={matriz}
                    columns={columns}
                    pagination={false}
                />
            </div>
            <div className={style.card} style={{paddingTop: '33px', 'paddingBottom': '20px'}}>
                <div className={style.controllabel}>RESUMEN</div>
                <Table
                    //key={Math.random()}
                    style={{width: 'calc(100% - 20px)', filter: 'grayscale(0.7)'}}
                    dataSource={cdata}
                    columns={ccolumns}
                    pagination={false}
                />
            </div>
            <div className={style.card} style={{paddingTop: '33px', 'paddingBottom': '20px'}}>
                <div className={style.controllabel}>SEDE</div>
                <Radio.Group defaultValue={props.sede} onChange={sedeChange}>
                    <Radio.Button value="Jesús María">Jesús María</Radio.Button>
                    <Radio.Button value="La Victoria">La Victoria</Radio.Button>
                    <Radio.Button value="Pueblo Libre">Pueblo Libre</Radio.Button>
                    <Radio.Button value="Arequipa">Arequipa</Radio.Button>
                    <Radio.Button value="Chiclayo">Chiclayo</Radio.Button>
                    <Radio.Button value="Piura">Piura</Radio.Button>
                    <Radio.Button value="Coronel Portillo">Coronel Portillo</Radio.Button>
                </Radio.Group>
            </div>
        </>
    )
}

export default () => {
    const [data, setData] = useState(_data)
    return (
        <AppContext.Provider value={{data, setData}}>
            <div className={style.component}>
                <MasterTable columns={columns} data={data}/>
            </div>
        </AppContext.Provider>
    )
}
