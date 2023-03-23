import style from './index.module.css'
import {Col, Collapse, ConfigProvider, Divider, InputNumber, Row, Slider, Table} from "antd";
import ReactECharts from 'echarts-for-react';
import Title from "antd/es/typography/Title";
import "@fontsource/rubik"

const {Panel} = Collapse;

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
        for (let j = 1; j <= columnas && j <= (ciclos + i - 1); j++) {
            if (j == i) {
                index = 0;
                _row['ciclo' + j] = {
                    data: Math.round(_initial * ((j % 2) ? 1 : semestre)),
                    index: index
                }
                if ((j % 2) == 0) {
                    _initial += Math.round(_initial * crecimiento)
                }
                totalC['ciclo' + j].data += _row['ciclo' + j].data
            }
            else if (j > i && j <= columnas) {
                _row['ciclo' + j] = {
                    data: Math.round(_row['ciclo' + (j - 1)].data * ((1 - desercion[j - i - 1]))),
                    index: ++index%(columnas)
                }
                totalC['ciclo' + j].data += Math.round(_row['ciclo' + (j - 1)].data * ((1 - desercion[j - i - 1])))
            }
        }
        data.push(_row)
    }
    data.push(totalC)
    return data;
}

function convertToRoman(num: number) {
    let roman : Record<string, number> = {
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

const colors = [
    '#B4D6D3', '#AA78A6', '#8FB8ED', '#A2AD91',
    '#EAF6FF', '#627264', '#AFD0D6', '#A7B0CA',
    '#DEE2D6', '#e16853', '#8fbac6', '#3a556f',
]

const mmax = (matriz: any, type?: boolean) => {
    let datasum = matriz[matriz.length - 1];
    let max = 0;
    let maxrow = ''
    let lastrow = ''
    let result = []
    Object.keys(datasum).forEach(function (key, index) {
        if (datasum[key].data > max) {
            max = datasum[key].data
            maxrow = key
        }
        lastrow = key
    })
    if (type) maxrow = lastrow

    for (let i=0; i< matriz.length - 1; i++) {
        if (matriz[i][maxrow].data) result.push(matriz[i][maxrow].data);
    }
    return result
}

const columnas = (columnas: number, width: number, height: number) => {
    let columns = []
    for (let i = 1; i <= columnas; i++) {
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
                                width: width + 'px',
                                textAlign: 'center',
                                lineHeight: height + 'px',
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
                                background: colors[record['ciclo' + i].index % columnas]
                            },
                        },
                        children: <div>{record['ciclo' + i].data}</div>,
                    };
                }
            }
        }
        columns.push(column)
    }
    return columns;
}

const calcularAforo = (matriz: any, coeficientes: any, aforo_promedio: number, asistencia: number) => {
    const _max = mmax(matriz, true)
    let result = []
    for (let i=0; i<_max.length; i++)  {
        console.log(_max[i] + "/" + aforo_promedio +"*" + coeficientes[i] + " = " + _max[i]/(aforo_promedio*coeficientes[i])*asistencia)
        result.push(Math.ceil(_max[i]/aforo_promedio)*coeficientes[i]*asistencia)
    }
    return result
}


let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, .01, .01]
let h_por_semana = [27, 27, 28, 30, 29, 26, 27.5, 28.5, 20.5, 20.5]
let aforo_promedio = 32.06

let coeficientes = [27, 27, 28, 30, 29, 28, 27.5, 28.5, 20.5, 20.5]

let matriz = calcularMatriz(10, 12, 297, .43, .05, desercion);

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
