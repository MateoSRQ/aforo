import style from './index.module.css'
// import Cube from '../cube'
import Header from '../header'
import Cube from '../cube'
import '@fontsource/archivo'
import {ConfigProvider, Spin, Table, Tabs, List, Radio} from 'antd';
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

const dimensions = [
    "Data.actividadNivel1",
    "Data.actividadNivel2",
    "Data.actividadNivel3",
    "Data.actividadNivel4",
    "Data.actividadNivel5",
    "Data.actividadNivel6",
    "Data.actividadNivel7",
]

export default () => {
    const [ref, {x, y, width, height}] = useDimensions();
    const [modal1Open, setModal1Open] = useState(false);
    const [data, setData] = useState(null);
    const cubejsApi = cubejs(CUBEJS_TOKEN, {
        apiUrl: CUBEJS_API,
    });
    const [{isLoading}] = useLoading(false);
    const [loading, setLoading] = useState(false);
    const cubejs_query = {
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
            ]
        ]
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

    const handleCell = async (record: any, rowIndex: any, date: any) => {
        setLoading(true)
        let i = 7
        for (i; i >= 1; i--) {
            if (record["Data.actividadNivel" + i] != undefined) {
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
                "member": "Data.actividadNivel" + i,
                "operator": "equals",
                "values": [
                    record["Data.actividadNivel" + i]
                ]
            }
        ]
        console.log('onClick')
        //setModal1Open(true);
        let categoriaResult = await cubejsApi.load(_query)

        _query.dimensions = [
            "Data.centroNivel1",
            "Data.centroNivel2",
        ]
        let centroResult = await cubejsApi.load(_query)

        //console.log(categoriaResult.loadResponse.results[0].data);
        //console.log(centroResult.loadResponse.results[0].data);

        for (let i = 0; i < categoriaResult.loadResponse.results[0].data; i++) {
            categoriaResult.loadResponse.results[0].data[i].key = objectHash(categoriaResult.loadResponse.results[0].data[i])
        }

        for (let i = 0; i < centroResult.loadResponse.results[0].data; i++) {
            centroResult.loadResponse.results[0].data[i].key = objectHash(centroResult.loadResponse.results[0].data[i])
        }

        //{"Data.actividadNivel1":"Actividad 2","Data.actividadNivel2":"Actividad 2.1","Data.actividadNivel3":"Actividad 2.1.4","Data.actividadNivel4":"Actividad 2.1.4.1","Data.actividadNivel5":"Actividad 2.1.4.1.2","2024-08-01T00:00:00.000,Data.totalAmount":"110636.92","2023-08-01T00:00:00.000,Data.totalAmount":"148418.17","2024-12-01T00:00:00.000,Data.totalAmount":"214835.50999999998","2024-03-01T00:00:00.000,Data.totalAmount":"52548.00000000001","2023-06-01T00:00:00.000,Data.totalAmount":"117555.69","2023-10-01T00:00:00.000,Data.totalAmount":"205803.52999999997","2023-02-01T00:00:00.000,Data.totalAmount":"46483.95999999999","2024-07-01T00:00:00.000,Data.totalAmount":"95982.84000000001","2023-04-01T00:00:00.000,Data.totalAmount":"93310.05","2023-01-01T00:00:00.000,Data.totalAmount":"32320.940000000002","2023-03-01T00:00:00.000,Data.totalAmount":"39090.57","2024-04-01T00:00:00.000,Data.totalAmount":"73518.78000000001","2023-05-01T00:00:00.000,Data.totalAmount":"64946.130000000005","2024-02-01T00:00:00.000,Data.totalAmount":"33993.850000000006","2024-11-01T00:00:00.000,Data.totalAmount":"196194.05999999997","2024-09-01T00:00:00.000,Data.totalAmount":"155395.56","2023-07-01T00:00:00.000,Data.totalAmount":"113147.25999999998","2024-10-01T00:00:00.000,Data.totalAmount":"163313.84999999998","2023-11-01T00:00:00.000,Data.totalAmount":"199313.38","2023-12-01T00:00:00.000,Data.totalAmount":"208806.47999999995","2024-06-01T00:00:00.000,Data.totalAmount":"122465.56","2024-05-01T00:00:00.000,Data.totalAmount":"92941.29999999999","2024-01-01T00:00:00.000,Data.totalAmount":"35357.69","2023-09-01T00:00:00.000,Data.totalAmount":"150362.09000000005","Data.actividad":"​ Actividad 2.1.4.1.2","key":"ae23d34e6b551fd84f0afea1b5c0cb0d3ced3aab","s2023":1419558.25,"s2024":1347183.92}
        //2023-01-01//

        let _record = [
            {
                title: 'Actividad Nivel 1',
                description: record["Data.actividadNivel1"] ? record["Data.actividadNivel1"] : ''
            },
            {
                title: 'Actividad Nivel 2',
                description: record["Data.actividadNivel2"] ? record["Data.actividadNivel2"] : ''
            },
            {
                title: 'Actividad Nivel 3',
                description: record["Data.actividadNivel3"] ? record["Data.actividadNivel3"] : ''
            },
            {
                title: 'Actividad Nivel 4',
                description: record["Data.actividadNivel4"] ? record["Data.actividadNivel4"] : ''
            },
            {
                title: 'Actividad Nivel 5',
                description: record["Data.actividadNivel5"] ? record["Data.actividadNivel5"] : ''
            },
            {
                title: 'Actividad Nivel 6',
                description: record["Data.actividadNivel6"] ? record["Data.actividadNivel6"] : ''
            },
            {
                title: 'Actividad Nivel 7',
                description: record["Data.actividadNivel7"] ? record["Data.actividadNivel7"] : ''
            }
        ]


        setData({
            categoria: categoriaResult,
            centro: centroResult,
            record: _record,
            date: date
        })
        setLoading(false)
        setModal1Open(true)
    }

    const columns = [
        {
            "title": "Actividad",
            "dataIndex": "Data.actividad",
            "name": "Data.actividad",
            render: (text: any, record: any) => (
                <div style={{width: '300px', whiteSpace: 'pre-wrap'}}>
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
                        handleCell(record, rowIndex, '2023-01-01')
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "feb-23",
            "dataIndex": "2023-02-01T00:00:00.000,Data.totalAmount",
            "name": "2023-02-01T00:00:00.000,Data.totalAmount",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-02-01')
                    }
                }
            },
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "mar-23",
            "dataIndex": "2023-03-01T00:00:00.000,Data.totalAmount",
            "name": "2023-03-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-03-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "abr-23",
            "dataIndex": "2023-04-01T00:00:00.000,Data.totalAmount",
            "name": "2023-04-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-04-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "may-23",
            "dataIndex": "2023-05-01T00:00:00.000,Data.totalAmount",
            "name": "2023-05-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-05-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "jun-23",
            "dataIndex": "2023-06-01T00:00:00.000,Data.totalAmount",
            "name": "2023-06-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-06-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "jul-23",
            "dataIndex": "2023-07-01T00:00:00.000,Data.totalAmount",
            "name": "2023-07-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-07-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "ago-23",
            "dataIndex": "2023-08-01T00:00:00.000,Data.totalAmount",
            "name": "2023-08-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-08-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "sep-23",
            "dataIndex": "2023-09-01T00:00:00.000,Data.totalAmount",
            "name": "2023-09-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-09-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "oct-23",
            "dataIndex": "2023-10-01T00:00:00.000,Data.totalAmount",
            "name": "2023-10-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-10-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "nov-23",
            "dataIndex": "2023-11-01T00:00:00.000,Data.totalAmount",
            "name": "2023-11-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-11-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "dic-23",
            "dataIndex": "2023-12-01T00:00:00.000,Data.totalAmount",
            "name": "2023-12-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2023-12-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "2023",
            "dataIndex": "s2023",
            "name": "s2023",
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return (
                    <div style={{
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        width: '140px',
                        textAlign: 'right',
                        textShadow: '.5px 0 0 currentColor'
                    }}>
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "ene-24",
            "dataIndex": "2024-01-01T00:00:00.000,Data.totalAmount",
            "name": "2024-01-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-01-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "feb-24",
            "dataIndex": "2024-02-01T00:00:00.000,Data.totalAmount",
            "name": "2024-02-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-02-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "mar-24",
            "dataIndex": "2024-03-01T00:00:00.000,Data.totalAmount",
            "name": "2024-03-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-03-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "abr-24",
            "dataIndex": "2024-04-01T00:00:00.000,Data.totalAmount",
            "name": "2024-04-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-04-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "may-24",
            "dataIndex": "2024-05-01T00:00:00.000,Data.totalAmount",
            "name": "2024-05-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-05-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "jun-24",
            "dataIndex": "2024-06-01T00:00:00.000,Data.totalAmount",
            "name": "2024-06-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-06-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "jul-24",
            "dataIndex": "2024-07-01T00:00:00.000,Data.totalAmount",
            "name": "2024-07-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-07-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "ago-24",
            "dataIndex": "2024-08-01T00:00:00.000,Data.totalAmount",
            "name": "2024-08-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-08-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "sep-24",
            "dataIndex": "2024-09-01T00:00:00.000,Data.totalAmount",
            "name": "2024-09-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-09-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "oct-24",
            "dataIndex": "2024-10-01T00:00:00.000,Data.totalAmount",
            "name": "2024-10-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-10-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "nov-24",
            "dataIndex": "2024-11-01T00:00:00.000,Data.totalAmount",
            "name": "2024-11-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-11-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "dic-24",
            "dataIndex": "2024-12-01T00:00:00.000,Data.totalAmount",
            "name": "2024-12-01T00:00:00.000,Data.totalAmount",
            "width": "200px",
            onCell: (record: any, rowIndex: any) => {
                return {
                    onClick: () => {
                        handleCell(record, rowIndex, '2024-12-01')
                    }
                }
            },
            "render": function (text: any, record: any, index: any) {
                return (
                    <div
                        style={{wordWrap: 'break-word', wordBreak: 'break-word', width: '140px', textAlign: 'right'}}
                        className={style.item}
                    >
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        },
        {
            "title": "2024",
            "dataIndex": "s2024",
            "name": "s2024",
            "width": "200px",
            "render": function (text: any, record: any, index: any) {
                return (
                    <div style={{
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        width: '140px',
                        textAlign: 'right',
                        textShadow: '.5px 0 0 currentColor'
                    }}>
                        {isNaN(text) ? 0.00 : numbro(text).format({mantissa: 2, thousandSeparated: true})}
                    </div>
                )
            }
        }
    ]
    const categoriaColumns = [
        {
            "title": "Categoría",
            "dataIndex": "Data.categoriaNivel1",
            "name": "Data.categoriaNivel1",
            render: (text: any, record: any) => (
                <div style={{width: '160px', whiteSpace: 'pre-wrap'}}>
                    {text}
                </div>
            )
        },
        {
            "title": "SubCategoría",
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
                <div style={{width: '160px', whiteSpace: 'pre-wrap'}}>
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

    let tab1 = null
    let tab2 = null
    if (data) {
        tab1 = (
            <Table
                size="small"
                pagination={false}
                dataSource={data.categoria.loadResponse.results[0].data}
                columns={categoriaColumns}
            />
        )
        tab2 = (
            <Table
                size="small"
                pagination={false}
                dataSource={data.centro.loadResponse.results[0].data}
                columns={centroColumns}
            />
        )
    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Por Categoría`,
            children: tab1
        },
        {
            key: '2',
            label: `Por Centro de Costo`,
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
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a">POR ACTIVIDAD</Radio.Button>
                                <Radio.Button value="b">POR CATEGORÍA PRESUPUESTAL</Radio.Button>
                                <Radio.Button value="c">POR CENTRO DE COSTO</Radio.Button>
                            </Radio.Group>
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
                                cube_query={cubejs_query}
                                columns={columns}
                                depth={1}
                                //handleItemClick={handleItemClick}
                            />
                        </Scrollbars>
                        <Drawer
                            title="Categorías / Centros"
                            placement="right"
                            style={{color: 'black'}}
                            width={600}
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
                                    outline: '1px solid red',
                                    height: 'calc(100% - 60px)'
                                }}
                                autoHide={false}
                            >
                                {
                                    data &&
                                    <div style={{width: 'calc(100% - 10px)'}}>
                                        <List
                                            itemLayout="horizontal"
                                            style={{marginBottom: '20px'}}
                                            size="small"
                                            dataSource={data.record}
                                            renderItem={(item: any, index: any) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        description={item.description}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                }

                                <Tabs defaultActiveKey="1" items={items}/>
                            </Scrollbars>
                        </Drawer>
                    </>
                </div>
            </div>
            <img src="assets/logo.png" className={style.logo}/>

        </ConfigProvider>
    )
}

