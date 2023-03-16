import style from './index.module.css'
// import Cube from '../cube'
import { Col, InputNumber, Row, Slider, Space } from 'antd';
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


export default (props: any) => {
    const [data, setData] = useState([])


    let columns = [
        {
            title: 'Sede',
            dataIndex: 'sede',
            key: 'sede',
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'center',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: (record: any) => {
                        if (record.sede == undefined || record.sede == '') {
                            return <div>{record.sede}</div>
                        }
                        
                    }
                }
            }
        },
        {
            title: 'Nivel',
            dataIndex: 'nivel',
            key: 'nivel',
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'center',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{record.nivel}</div>,
                }
            }
        },
        {
            title: 'Ambiente',
            dataIndex: 'ambiente',
            key: 'ambiente',
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'center',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{record.ambiente}</div>,
                }
            }
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo',
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'center',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{record.tipo}</div>,
                }
            }
        },
        {
            title: 'Metraje',
            dataIndex: 'metraje',
            key: 'metraje',
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'center',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{record.metraje}</div>,
                }
            }
        },
        {
            title: 'Aforo',
            dataIndex: 'aforo',
            key: 'aforo',
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'center',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{record.aforo}</div>,
                }
            }
        }
    ]


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
