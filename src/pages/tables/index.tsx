import style from './index.module.css'
import {Col, Collapse, ConfigProvider, Divider, InputNumber, Row, Slider, Table} from "antd";
import ReactECharts from 'echarts-for-react';
import Title from "antd/es/typography/Title";
import "@fontsource/rubik"
import  {calcularMatriz, calcularAforo, columnas} from './functions'
const {Panel} = Collapse;

let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, .01, .01]
let h_por_semana = [27, 27, 28, 30, 29, 26, 27.5, 28.5, 20.5, 20.5]
let aforo_promedio = 32.06

let coeficientes = [27, 27, 28, 30, 29, 28, 27.5, 28.5, 20.5, 20.5]

let matriz = calcularMatriz(10, 12, 297, .43, .05, desercion);

console.log('AFORO')
console.log(calcularAforo(matriz, coeficientes, 38.03, .9))


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



let columns = columnas(12, 80, 20);



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
                        <Title level={2} style={{color: "#444", fontFamily: 'Rubik', textTransform: 'uppercase', letterSpacing: '-.6px'}}>Sede Jesús María</Title>
                    </div>

                    <Collapse style={{width: '100%'}} bordered={false} ghost collapsible="header"
                              defaultActiveKey={['1']}>
                        <Panel header="This panel can only be collapsed by clicking text" key="1">
                            <div>
                                <ReactECharts option={options} style={{height: '300px'}}/>;
                            </div>
                            <div>
                                <Table
                                    columns={columns}
                                    dataSource={matriz}
                                    pagination={false}
                                />
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
