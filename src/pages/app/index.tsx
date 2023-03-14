import style from './index.module.css'
// import Cube from '../cube'
import Header from '../header'
import Cube from '../cube'
import '@fontsource/archivo'
import '@fontsource/fragment-mono'
import {ConfigProvider, Spin, Table, Tabs, List, Radio, Form, Input, Select, Switch} from 'antd';
import cubejs from '@cubejs-client/core';

import {Button, Modal} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars-2';
import useDimensions from "react-use-dimensions";
import numbro from "numbro";
import {useState} from "react";
import {Drawer} from 'antd';
import type {TabsProps} from 'antd';
import objectHash from "object-hash";
import {useLoading} from 'react-use-loading';
import {LoadingOutlined} from "@ant-design/icons";
import {format} from 'date-fns'


const antIcon = <LoadingOutlined style={{fontSize: 48}} spin/>
const CUBEJS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzY4MzMzMjd9.RE5KaVbp40TkQgnzJ0qOp-1XxAw7d-OaI_aDs25cTzU'
const CUBEJS_API = 'http://23.254.203.210:4000/cubejs-api/v1'

export default () => {
    const [ref, {x, y, width, height}] = useDimensions();
    const [modal1Open, setModal1Open] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [swCheck, setSwCheck] = useState(true)
    const [data, setData] = useState(null);
    const cubejsApi = cubejs(CUBEJS_TOKEN, {
        apiUrl: CUBEJS_API,
    });
    const [{isLoading}] = useLoading(false);
    const [loading, setLoading] = useState(false);
    const cubejs_query = {
        "actividad": {
            "measures": [
                "Data.totalAmount"
            ],
            "dimensions": [
                "Data.actividadNivel1",
                "Data.date"
            ],
            "order": [
                [
                    "Data.actividadNivel1",
                    "asc"
                ],
                [
                    "Data.actividadNivel2",
                    "asc"
                ],
                [
                    "Data.actividadNivel3",
                    "asc"
                ],
                [
                    "Data.actividadNivel4",
                    "asc"
                ],
                [
                    "Data.actividadNivel5",
                    "asc"
                ],
                [
                    "Data.actividadNivel6",
                    "asc"
                ],
                [
                    "Data.actividadNivel7",
                    "asc"
                ]
            ]
        },
        "categoria": {
            "measures": [
                "Data.totalAmount"
            ],
            "dimensions": [
                "Data.categoriaNivel1",
                "Data.date"
            ],
            "order": [
                [
                    "Data.categoriaNivel1",
                    "asc"
                ],
                [
                    "Data.categoriaNivel2",
                    "asc"
                ]
            ]
        },
        "centro": {
            "measures": [
                "Data.totalAmount"
            ],
            "dimensions": [
                "Data.centroNivel1",
                "Data.date"
            ],
            "order": [
                [
                    "Data.centroNivel1",
                    "asc"
                ],
                [
                    "Data.centroNivel2",
                    "asc"
                ]
            ]
        },
    }
    const direct_cubejs_query = {
        "measures": [
            "Data.totalAmount"
        ],
        "timeDimensions": [
            {
                "dimension": "Data.date",
                "granularity": "month",
                "dateRange": [
                    "2023-01-01",
                    "2023-01-01"
                ]
            }
        ],
        "filters": [
            {
                "member": "Data.actividadNivel2",
                "operator": "equals",
                "values": [
                    "Actividad 1.2"
                ]
            }
        ],
        "dimensions": [
            "Data.categoriaNivel1",
            "Data.categoriaNivel2",
        ],
        "order": [
            [
                "Data.categoriaNivel1",
                "asc"
            ],
            [
                "Data.categoriaNivel2",
                "asc"
            ],
            [
                "Data.actividadNivel1",
                "asc"
            ],
            [
                "Data.actividadNivel2",
                "asc"
            ],
            [
                "Data.actividadNivel3",
                "asc"
            ],
            [
                "Data.actividadNivel4",
                "asc"
            ],
            [
                "Data.actividadNivel5",
                "asc"
            ],
            [
                "Data.actividadNivel6",
                "asc"
            ],
            [
                "Data.actividadNivel7",
                "asc"
            ],
            [
                "Data.centroNivel1",
                "asc"
            ],
            [
                "Data.centroNivel2",
                "asc"
            ]
        ]
    }
    const [dim, setDim]= useState('actividad');
    const dimensions = {
        actividad: [
            "Data.actividadNivel1",
            "Data.actividadNivel2",
            "Data.actividadNivel3",
            "Data.actividadNivel4",
            "Data.actividadNivel5",
            "Data.actividadNivel6",
            "Data.actividadNivel7",
        ],
        categoria: [
            'Data.categoriaNivel1',
            'Data.categoriaNivel2'
        ],
        centro: [
            'Data.centroNivel1',
            'Data.centroNivel2'
        ]
    }
    let label1 = ''
    let label2 = ''

    const switchCheck = (checked: boolean) => {
        //console.log(`switch to ${checked}`);
        setSwCheck(!swCheck);
    };

    const handleUpdateButton = () => {
        console.log('update')
        setUpdateOpen(true)
    }
    const handleCell = async (record: any, rowIndex: any, date: any) => {
        setLoading(true)
        let i = 0
        switch (dim) {
            case 'actividad':
                i = 7;
                break;
            case 'categoria':
                i = 2;
                break;
            case 'centro':
                i = 2;
                break;
        }
        for (i; i >= 1; i--) {
            if (record["Data." + dim + "Nivel" + i] != undefined) {
                break;
            }
        }

        let _query = {...direct_cubejs_query}
        _query.timeDimensions = [
            {
                "dimension": "Data.date",
                "granularity": "month",
                "dateRange": [
                    date,
                    date
                ]
            }
        ];
        _query.filters = [
            {
                "member": "Data." +  dim + "Nivel" + i,
                "operator": "equals",
                "values": [
                    record["Data." + dim + "Nivel" + i]
                ]
            }
        ]

        let result1, result2;


        switch (dim) {
            case 'actividad':
                _query.dimensions = [
                    "Data.categoriaNivel1",
                    "Data.categoriaNivel2",
                ]
                result1 = await cubejsApi.load(_query)
                _query.dimensions = [
                    "Data.centroNivel1",
                    "Data.centroNivel2"
                ]
                result2 = await cubejsApi.load(_query)
                break;
            case 'categoria':
                _query.dimensions = [
                    "Data.actividadNivel1",
                    "Data.actividadNivel2",
                    "Data.actividadNivel3",
                    "Data.actividadNivel4",
                    "Data.actividadNivel5",
                    "Data.actividadNivel6",
                    "Data.actividadNivel7",
                ]
                result1 = await cubejsApi.load(_query)
                _query.dimensions = [
                    "Data.centroNivel1",
                    "Data.centroNivel2"
                ]
                result2 = await cubejsApi.load(_query)

                break;
            case 'centro':
                _query.dimensions = [
                    "Data.actividadNivel1",
                    "Data.actividadNivel2",
                    "Data.actividadNivel3",
                    "Data.actividadNivel4",
                    "Data.actividadNivel5",
                    "Data.actividadNivel6",
                    "Data.actividadNivel7",
                ]
                result1 = await cubejsApi.load(_query)
                _query.dimensions = [
                    "Data.categoriaNivel1",
                    "Data.categoriaNivel2"
                ]
                result2 = await cubejsApi.load(_query)
                break;
        }
        //console.log(categoriaResult.loadResponse.results[0].data);
        //console.log(centroResult.loadResponse.results[0].data);

        for (let i = 0; i < result1.loadResponse.results[0].data; i++) {
            result1.loadResponse.results[0].data[i].key = objectHash(result1.loadResponse.results[0].data[i])
        }

        for (let i = 0; i < result2.loadResponse.results[0].data; i++) {
            result2.loadResponse.results[0].data[i].key = objectHash(result2.loadResponse.results[0].data[i])
        }

        setData({
            result1: result1,
            result2: result2,
            record: record,
            date: date
        })
        setLoading(false)
        setModal1Open(true)
    }

    const fx = (n: number) => {
        if (n > 80) return 1
        if (n > 60) return .8
        if (n > 40) return .5
        if (n > 20) return .2
        return 0
    }

    const columns = [
        {
            "title": "Categoría Presupuestal",
            "dataIndex": "Data.categoria",
            "name": "Data.categoria",
            render: (text: any, record: any) => (
                <div style={{width: '400px', whiteSpace: 'pre-wrap', textAlign: 'left'}}>
                    {text}
                </div>
            ),
        },
        {
            "title": "ene-23",
            "dataIndex": "2023-01-01T00:00:00.000,Data.totalAmount",
            "name": "2023-01-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-01-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            // 
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "feb-23",
            "dataIndex": "2023-02-01T00:00:00.000,Data.totalAmount",
            "name": "2023-02-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-02-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "mar-23",
            "dataIndex": "2023-03-01T00:00:00.000,Data.totalAmount",
            "name": "2023-03-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-03-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "abr-23",
            "dataIndex": "2023-04-01T00:00:00.000,Data.totalAmount",
            "name": "2023-04-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-04-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "may-23",
            "dataIndex": "2023-05-01T00:00:00.000,Data.totalAmount",
            "name": "2023-05-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-05-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "jun-23",
            "dataIndex": "2023-06-01T00:00:00.000,Data.totalAmount",
            "name": "2023-06-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-06-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "jul-23",
            "dataIndex": "2023-07-01T00:00:00.000,Data.totalAmount",
            "name": "2023-07-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-07-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "ago-23",
            "dataIndex": "2023-08-01T00:00:00.000,Data.totalAmount",
            "name": "2023-08-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-08-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "sep-23",
            "dataIndex": "2023-09-01T00:00:00.000,Data.totalAmount",
            "name": "2023-09-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-09-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "oct-23",
            "dataIndex": "2023-10-01T00:00:00.000,Data.totalAmount",
            "name": "2023-10-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-10-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "nov-23",
            "dataIndex": "2023-11-01T00:00:00.000,Data.totalAmount",
            "name": "2023-11-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-11-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "dic-23",
            "dataIndex": "2023-12-01T00:00:00.000,Data.totalAmount",
            "name": "2023-12-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2023-12-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "2023",
            "dataIndex": "s2023",
            "name": "s2023",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "ene-24",
            "dataIndex": "2024-01-01T00:00:00.000,Data.totalAmount",
            "name": "2024-01-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-01-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "feb-24",
            "dataIndex": "2024-02-01T00:00:00.000,Data.totalAmount",
            "name": "2024-02-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-02-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "mar-24",
            "dataIndex": "2024-03-01T00:00:00.000,Data.totalAmount",
            "name": "2024-03-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-03-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "abr-24",
            "dataIndex": "2024-04-01T00:00:00.000,Data.totalAmount",
            "name": "2024-04-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-04-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "may-24",
            "dataIndex": "2024-05-01T00:00:00.000,Data.totalAmount",
            "name": "2024-05-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-05-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "jun-24",
            "dataIndex": "2024-06-01T00:00:00.000,Data.totalAmount",
            "name": "2024-06-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-06-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "jul-24",
            "dataIndex": "2024-07-01T00:00:00.000,Data.totalAmount",
            "name": "2024-07-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-07-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "ago-24",
            "dataIndex": "2024-08-01T00:00:00.000,Data.totalAmount",
            "name": "2024-08-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-08-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "sep-24",
            "dataIndex": "2024-09-01T00:00:00.000,Data.totalAmount",
            "name": "2024-09-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-09-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "oct-24",
            "dataIndex": "2024-10-01T00:00:00.000,Data.totalAmount",
            "name": "2024-10-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-10-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "nov-24",
            "dataIndex": "2024-11-01T00:00:00.000,Data.totalAmount",
            "name": "2024-11-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-11-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "dic-24",
            "dataIndex": "2024-12-01T00:00:00.000,Data.totalAmount",
            "name": "2024-12-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        if (record['Data.actividadNivel1'] != 'Total') {
                            handleCell(record, rowIndex, '2024-12-01')
                        }
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        },
        {
            "title": "2024",
            "dataIndex": "s2024",
            "name": "s2024",
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return {
                    props: {
                        style: {
                            backgroundColor: swCheck ? 'rgba(89,205,29,' + text / 100 + ')' : 'white',
                            color: (swCheck && text > 70)?'white':'black'

                        }
                    },
                    children:
                        <div
                            style={{
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                width: '140px',
                                textAlign: 'right',
                            }}
                            className={(record['Data.actividadNivel1'] != 'Total') ? style.item : style.bold}
                        >
                            {isNaN(text) ? 0.00 : numbro(text).format({
                                mantissa: 2,
                                thousandSeparated: true
                            })} {swCheck ? '%' : null}
                        </div>
                }
            }
        }
    ]
    const [form] = Form.useForm();
    let result1Columns, result2Columns;
    const actividadColumns = [
        {
            "title": "Actividad Nivel 1",
            "dataIndex": "Data.actividadNivel1",
            "name": "Data.actividadNivel1",
            render: (text: any, record: any) => (
                <div style={{width: '260px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Actividad Nivel 2",
            "dataIndex": "Data.actividadNivel2",
            "name": "Data.actividadNivel2",
            render: (text: any, record: any) => (
                <div style={{width: '160px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Actividad Nivel 3",
            "dataIndex": "Data.actividadNivel3",
            "name": "Data.actividadNivel3",
            render: (text: any, record: any) => (
                <div style={{width: '160px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Actividad Nivel 4",
            "dataIndex": "Data.actividadNivel4",
            "name": "Data.actividadNivel4",
            render: (text: any, record: any) => (
                <div style={{width: '160px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Actividad Nivel 5",
            "dataIndex": "Data.actividadNivel5",
            "name": "Data.actividadNivel5",
            render: (text: any, record: any) => (
                <div style={{width: '160px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Actividad Nivel 6",
            "dataIndex": "Data.actividadNivel6",
            "name": "Data.actividadNivel6",
            render: (text: any, record: any) => (
                <div style={{width: '160px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Actividad Nivel 7",
            "dataIndex": "Data.actividadNivel7",
            "name": "Data.actividadNivel7",
            render: (text: any, record: any) => (
                <div style={{width: '160px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Monto",
            "dataIndex": "Data.totalAmount",
            "name": "Data.totalAmount",
            render: (text: any, record: any) => (
                <div
                    style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                    className={style.item}
                >
                    {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                </div>
            )
        }
    ]
    const categoriaColumns = [
        {
            "title": "Categoría Nivel 1",
            "dataIndex": "Data.categoriaNivel1",
            "name": "Data.categoriaNivel1",
            render: (text: any, record: any) => (
                <div style={{width: '260px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Actividad Nivel 2",
            "dataIndex": "Data.categoriaNivel2",
            "name": "Data.categoriaNivel2",
            render: (text: any, record: any) => (
                <div style={{width: '160px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Monto",
            "dataIndex": "Data.totalAmount",
            "name": "Data.totalAmount",
            render: (text: any, record: any) => (
                <div
                    style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                    className={style.item}
                >
                    {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                </div>
            )
        }
    ]
    const centroColumns = [
        {
            "title": "Centro de Costo",
            "dataIndex": "Data.centroNivel1",
            "name": "Data.centroNivel1",
            render: (text: any, record: any) => (
                <div style={{width: '260px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Sub Centro de Costo",
            "dataIndex": "Data.centroNivel2",
            "name": "Data.centroNivel2",
            render: (text: any, record: any) => (
                <div style={{width: '160px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "Monto",
            "dataIndex": "Data.totalAmount",
            "name": "Data.totalAmount",
            render: (text: any, record: any) => (
                <div
                    style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                    className={style.item}
                >
                    {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                </div>
            )
        }
    ]
    switch (dim) {
        case 'actividad':
            columns[0].title = "Actividad"
            columns[0].dataIndex = "Data.actividad"
            columns[0].name = "Data.actividad"
            label1 = 'Categorías'
            label2 = 'Centro de Costos'
            result1Columns = categoriaColumns
            result2Columns = centroColumns

            break;
        case 'categoria':
            columns[0].title = "Categoría presupuestal"
            columns[0].dataIndex = "Data.categoria"
            columns[0].name = "Data.categoria"
            label1 = 'Actividades'
            label2 = 'Centro de Costos'
            result1Columns = actividadColumns
            result2Columns = centroColumns
            break;
        case 'centro':
            columns[0].title = "Centro de costos"
            columns[0].dataIndex = "Data.centro"
            columns[0].name = "Data.centro"
            label1 = 'Actividades'
            label2 = 'Categorías'
            result1Columns = actividadColumns
            result2Columns = categoriaColumns
            break;
    }


    let tab1 = null
    let tab2 = null
    if (data) {
        tab1 = (
            <Table
                size="small"
                pagination={false}
                dataSource={data.result1.loadResponse.results[0].data}
                columns={result1Columns}
            />
        )
        tab2 = (
            <Table
                size="small"
                pagination={false}
                dataSource={data.result2.loadResponse.results[0].data}
                columns={result2Columns}
            />
        )
    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: label1,
            children: tab1
        },
        {
            key: '2',
            label: label2,
            children: tab2
        },
    ];

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
                {
                    (isLoading || loading) &&
                    <div className={style.loader}>
                        <Spin indicator={antIcon}/>
                    </div>
                }
                <div className={style.container} ref={ref}>
                    <div className={style.menuContainer}>
                        Presupuesto 2023 - 2024
                        <div style={{marginTop: '-30px'}}>
                            <Radio.Group defaultValue="actividad"  value={dim} size="small"
                                         onChange ={(e:any) => { setDim(e.target.value)}} buttonStyle="solid">
                                <Radio.Button value="actividad">Por Actividad</Radio.Button>
                                <Radio.Button value="categoria">Por Categoría Presupuestal</Radio.Button>
                                <Radio.Button value="centro">Por Centro de Costo</Radio.Button>
                            </Radio.Group>
                            <div style={{
                                position: 'relative',
                                top: '-67px',
                                left: '581px',
                            }}>
                            <Switch checkedChildren="#" unCheckedChildren="%" checked={swCheck} onChange={switchCheck}/>
                            </div>
                        </div>
                    </div>
                    <>
                        <Scrollbars
                            className={style.tableContainer}
                            style={{
                                width: (width - 60) + 'px',
                                height: (height - 190) + 'px',
                                marginLeft: '30px',
                                marginTop: '40px'
                            }}
                            autoHide={false}
                        >
                            <Cube
                                cube_api={CUBEJS_API}
                                cube_token={CUBEJS_TOKEN}
                                cube_query={cubejs_query[dim]}
                                columns={columns}
                                depth={1}
                                percentage={swCheck}
                                dimensions={dimensions[dim]}
                                dimension={dim}
                                //handleItemClick={handleItemClick}
                            />
                        </Scrollbars>
                        <Drawer
                            title="Ejes"
                            placement="right"
                            style={{color: 'black'}}
                            width={'50%'}
                            open={data}
                            onClose={() => {
                                setData(false)
                            }}>

                            {data && <div
                                style={{
                                    color: '#066ec1',
                                    textAlign: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    letterSpacing: '-.5px',
                                    textTransform: 'uppercase'
                                }}
                            >{data.date}</div>}
                            <Scrollbars
                                className={style.tableContainer}
                                style={{
                                    //outline: '1px solid red',
                                    height: 'calc(100% - 60px)'
                                }}
                                autoHide={false}
                            >
                                {
                                    data &&
                                    <div style={{width: 'calc(100% - 10px)'}}>
                                        {/*<code>*/}
                                        {/*    {JSON.stringify(data)}*/}
                                        {/*</code>*/}
                                        {/*<List*/}
                                        {/*    itemLayout="horizontal"*/}
                                        {/*    style={{marginBottom: '20px'}}*/}
                                        {/*    size="small"*/}
                                        {/*    dataSource={data.record}*/}
                                        {/*    renderItem={(item: any, index: any) => (*/}
                                        {/*        <List.Item>*/}
                                        {/*            <List.Item.Meta*/}
                                        {/*                title={item.title}*/}
                                        {/*                description={item.description}*/}
                                        {/*            />*/}
                                        {/*        </List.Item>*/}
                                        {/*    )}*/}
                                        {/*/>*/}
                                    </div>
                                }

                                <Tabs defaultActiveKey="1" items={items}/>
                            </Scrollbars>
                        </Drawer>

                        <Drawer
                            title="Actualizar item"
                            placement="right"
                            style={{color: 'black'}}
                            width={'500px'}
                            open={updateOpen}
                            onClose={() => {
                                setUpdateOpen(false)
                            }}
                        >
                            <Scrollbars
                                className={style.tableContainer}
                                style={{
                                    //outline: '1px solid red',
                                    height: 'calc(100% - 60px)'
                                }}
                                autoHide={false}
                            >
                                <Form
                                    layout='vertical'
                                    form={form}
                                    //onValuesChange={onFormLayoutChange}
                                    //style={{ maxWidth: 600 }}
                                >
                                    <Form.Item label="Actividad">
                                        <Select
                                            showSearch
                                            //placeholder="Select a person"
                                            //optionFilterProp="children"
                                            //onChange={onChange}
                                            //onSearch={onSearch}
                                            //filterOption={(input, option) =>
                                            //>    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            //>}
                                            options={[
                                                {
                                                    value: 'Subtarea 1.1.1.1.1.1.1',
                                                    label: 'Subtarea 1.1.1.1.1.1.1',
                                                },
                                                {
                                                    value: 'Subtarea 1.1.1.1.1.1.2',
                                                    label: 'Subtarea 1.1.1.1.1.1.2',
                                                },
                                                {
                                                    value: 'Subtarea 1.1.1.1.1.1.3',
                                                    label: 'Subtarea 1.1.1.1.1.1.3',
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Categoría Presupuestal">

                                        <Select
                                            showSearch
                                            //placeholder="Select a person"
                                            //optionFilterProp="children"
                                            //onChange={onChange}
                                            //onSearch={onSearch}
                                            //filterOption={(input, option) =>
                                            //>    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            //>}
                                            options={[
                                                {
                                                    value: 'Subtarea 1.1.1.1.1.1.1',
                                                    label: 'Subtarea 1.1.1.1.1.1.1',
                                                },
                                                {
                                                    value: 'Subtarea 1.1.1.1.1.1.2',
                                                    label: 'Subtarea 1.1.1.1.1.1.2',
                                                },
                                                {
                                                    value: 'Subtarea 1.1.1.1.1.1.3',
                                                    label: 'Subtarea 1.1.1.1.1.1.3',
                                                },
                                            ]}
                                        />

                                    </Form.Item>
                                    <Form.Item label="Centro de Costo">

                                        <Select
                                            showSearch
                                            //placeholder="Select a person"
                                            //optionFilterProp="children"
                                            //onChange={onChange}
                                            //onSearch={onSearch}
                                            //filterOption={(input, option) =>
                                            //>    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            //>}
                                            options={[
                                                {
                                                    value: 'Subtarea 1.1.1.1.1.1.1',
                                                    label: 'Subtarea 1.1.1.1.1.1.1',
                                                },
                                                {
                                                    value: 'Subtarea 1.1.1.1.1.1.2',
                                                    label: 'Subtarea 1.1.1.1.1.1.2',
                                                },
                                                {
                                                    value: 'Subtarea 1.1.1.1.1.1.3',
                                                    label: 'Subtarea 1.1.1.1.1.1.3',
                                                },
                                            ]}
                                        />

                                    </Form.Item>
                                    <Form.Item label="Monto">
                                        <Input placeholder="" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary">Actualizar</Button>
                                    </Form.Item>
°

                                </Form>
                            </Scrollbars>
                        </Drawer>
                    </>
                </div>
            </div>
            <img src="assets/logo.png" className={style.logo}/>
            <Button className={style.updateButton } onClick={handleUpdateButton}>Actualizar ítem</Button>
        </ConfigProvider>
    )
}

