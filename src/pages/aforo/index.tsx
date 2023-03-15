import style from './index.module.css'
// import Cube from '../cube'

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
    '#DEE2D6',  '#e16853', '#8fbac6', '#3a556f', 

]

export default () => {


    const columns = [
        {
          title: 'I',
          dataIndex: 'ciclo0',
          key: 'ciclo0',
          render(text: any, record: any) {

            return {
              props: {
                style: {
                    width: '80px',
                    textAlign: 'center',
                    lineHeight: '20px',
                    padding: '2px',
                    background: colors[record.ciclo0.index%12]
                },
              },
              children: <div>{record.ciclo0.data} - {record.ciclo0.index}</div>,
            };
          }
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
                        background: colors[record.ciclo1.index%12]
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
                        background: colors[record.ciclo2.index%12]
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
                        background: colors[record.ciclo3.index%12]
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
                        background: colors[record.ciclo4.index%12]
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
                        background: colors[record.ciclo5.index%12]
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
                        background: colors[record.ciclo6.index%12]
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
                        background: colors[record.ciclo7.index%12]
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
                        background: colors[record.ciclo8.index%12]
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
                        background: colors[record.ciclo9.index%12]
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
                        background: colors[record.ciclo10.index%12]
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
                        background: colors[record.ciclo11.index%12]
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

    let initial = 297

    let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01, 1, 1, 1]
    let semestre = .43
    let crecimiento = .05
    let rl = 12

    let data = []

    let _initial = initial

    let index = 0;

    let totalC : any = {
        ciclo0: {data: 0},
        ciclo1: {data: 0},
        ciclo2: {data: 0},
        ciclo3: {data: 0},
        ciclo4: {data: 0},
        ciclo5: {data: 0},
        ciclo6: {data: 0},
        ciclo7: {data: 0},
        ciclo8: {data: 0},
        ciclo9: {data: 0},
        ciclo10: {data: 0},
        ciclo11: {data: 0},
        ciclo12: {data: 0},
        total: {data: 0}
    }




    for (let i=0; i<14; i++) {
        let _row: any = {
            ciclo0: {data: 0},
            ciclo1: {data: 0},
            ciclo2: {data: 0},
            ciclo3: {data: 0},
            ciclo4: {data: 0},
            ciclo5: {data: 0},
            ciclo6: {data: 0},
            ciclo7: {data: 0},
            ciclo8: {data: 0},
            ciclo9: {data: 0},
            ciclo10: {data: 0},
            ciclo11: {data: 0},
            ciclo12: {data: 0},
            total: {data: 0}
        }
        for (let j = 0; j < rl; j++) {
            console.log('j: ' + j + ' -> ' + _initial)
            if (j == i) {
                index = 0;
                _row['ciclo' + j] = {
                    data: Math.round(_initial*((j%2)?semestre:1)),
                    index: index
                }
                totalC['ciclo' + j].data += Math.round(_initial*((j%2)?semestre:1))
                if (j%2) {_initial += Math.round(_initial*crecimiento) }
            }
            if (j > i && j < rl) {
                _row['ciclo' + j] = {
                    data: Math.round(_row['ciclo' + (j-1)].data*((1 - desercion[j - i - 1]))),
                    index: ++index
                }
                totalC['ciclo' + j].data += Math.round(_row['ciclo' + (j-1)].data*((1 - desercion[j - i - 1])))
            }
            if (j == rl - 1) {
                _row['total'].data = 0;
                for (let k=0; k<rl; k++) {
                    console.log('K: ' + _row['ciclo' + k].data)
                    _row['total'].data +=  _row['ciclo' + k].data
                }
            }
        }

        data.push(_row)

    }

    data.push(totalC)


    console.log('data')
    console.log(data)


    for (let i = 0; i < data.length; i++) {
        console.log(Object.entries(data[i]).sort().reduce( (o,[k,v]) => (o[k]=v,o), {} ));
    }
 
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

