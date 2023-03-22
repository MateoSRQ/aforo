import style from './index.module.css'
import {Col, Collapse, ConfigProvider, Divider, InputNumber, Row, Slider} from "antd";
import ReactECharts from 'echarts-for-react';

const {Panel} = Collapse;
import Title from "antd/es/typography/Title";

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
                //_row['total'].data += _row['ciclo' + j].data
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


let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, .01, .01]
let h_por_semana = [27, 27, 28, 30, 29, 26, 27.5, 28.5, 20.5, 20.5]
let aforo_promedio = 32.06

let matriz = calcularMatriz(10, 12, 297, .43, .05, desercion);
console.log(matriz)


let data = {}
for (let i = 0; i < matriz.length - 1; i++) {
    let row = []
    Object.keys(matriz[i]).forEach(function (key, index) {
        if (data[key] == undefined) data[key] = 0
        data[key] += matriz[i][key].data
    })
}


let _series = []
let _data = []
Object.keys(data).forEach(function (key, index) {
    _series.push(key)
    _data.push(data[key])
})


export default () => {
    let options = {
        xAxis: {
            type: 'category',
            data: _series
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                fontFamily: "Archivo",
                fontSize: 10,
                data: _data,

                label: {
                    show: true,
                },
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };


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
                        <Title level={2} style={{color: "#444"}}>Sede Jesús María</Title>
                    </div>
                    <div style={{padding: '12px', width: 'calc(100% - 40px)'}}>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={22}>
                                <Slider
                                    min={1}
                                    max={1000}

                                    // onChange={(value: number) => {
                                    //     setInitial(value)
                                    // }}
                                    // value={typeof initial === 'number' ? initial : 0}
                                />
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={22}>
                                <div className={style.label}>Ejemplo de slider y adecuacion</div>
                            </Col>
                            <Col span={1}></Col>
                        </Row>

                        <Row>
                            <Col span={1}></Col>
                            <Col span={22}>
                                <Slider
                                    min={1}
                                    max={1000}

                                    // onChange={(value: number) => {
                                    //     setInitial(value)
                                    // }}
                                    // value={typeof initial === 'number' ? initial : 0}
                                />
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={22}>
                                <div className={style.label}>Ejemplo de slider y adecuacion</div>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </div>
                    <Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"
                              defaultActiveKey={['1']}>
                        <Panel header="This panel can only be collapsed by clicking text" key="1">
                            <div>
                                <ReactECharts option={options} style={{height: '300px'}}/>;
                            </div>
                        </Panel>
                    </Collapse>
                </div>


                <div className={style.card}></div>
                <div className={style.card}></div>
                <div className={style.card}></div>
                <div className={style.card}></div>
                <div className={style.card}></div>
                <div className={style.card}></div>
                <div className={style.card}></div>
                <div className={style.card}></div>
                <div className={style.card}></div>
                <div className={style.card}></div>
            </div>
        </ConfigProvider>
    )
}
