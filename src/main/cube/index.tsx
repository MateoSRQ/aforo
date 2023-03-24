import {useEffect, useState} from 'react'
import cubejs from '@cubejs-client/core';
import {useCubeQuery} from '@cubejs-client/react';
import style from './index.module.css'
import type {ColumnsType} from 'antd/es/table';
import {StyleProvider} from '@ant-design/cssinjs';
import numbro from 'numbro'
import {ConfigProvider, Table} from 'antd';
import {format, add} from 'date-fns'
import {es} from 'date-fns/locale';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import hash from 'object-hash'

const userInput = '\u200B';
const antIcon = <LoadingOutlined style={{fontSize: 48}} spin/>

const Cube = (props: any) => {
    const cubejsApi = cubejs(props.cube_token, {
        apiUrl: props.cube_api,
    });
    const {resultSet, isLoading, error, progress} = useCubeQuery(props.cube_query, {cubejsApi: cubejsApi});
    let _dataSource: any = []
    let _dataColor: any = []
    let _columns = new Set()

    if (resultSet) {
        _dataSource = resultSet?.tablePivot({
            x: ['Data.' + props.dimension],
            y: ['Data.date', 'measures']
        });
        _columns = props.columns
    }

    let lastLine: any = []
    lastLine['Data.actividadNivel1']= 'Total';
    lastLine['2023-01-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-02-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-03-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-04-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-05-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-06-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-07-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-08-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-09-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-10-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-11-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2023-12-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-01-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-02-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-03-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-04-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-05-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-06-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-07-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-08-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-09-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-10-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-11-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['2024-12-01T00:00:00.000,Data.totalAmount']= 0;
    lastLine['s2023']= 0;
    lastLine['s2024']= 0;

    for (let i = 0; i < _dataSource.length; i++) {
        _dataSource[i]['Data.' + props.dimension] = ''
        for (let j = 1; j <= props.dimensions.length; j++) {
            if (_dataSource[i]['Data.' + props.dimension + 'Nivel' + j] != undefined) {
                _dataSource[i]['Data.' + props.dimension] = userInput.padEnd(j * 5) + _dataSource[i]['Data.' + props.dimension + 'Nivel' + j]
            } else {
                // return
            }
        }
        
        lastLine['2023-01-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-01-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-02-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-02-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-03-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-03-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-04-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-04-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-05-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-05-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-06-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-06-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-07-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-07-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-08-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-08-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-09-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-09-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-10-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-10-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-11-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-11-01T00:00:00.000,Data.totalAmount'])
        lastLine['2023-12-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2023-12-01T00:00:00.000,Data.totalAmount'])

        lastLine['2024-01-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-01-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-02-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-02-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-03-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-03-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-04-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-04-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-05-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-05-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-06-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-06-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-07-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-07-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-08-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-08-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-09-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-09-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-10-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-10-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-11-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-11-01T00:00:00.000,Data.totalAmount'])
        lastLine['2024-12-01T00:00:00.000,Data.totalAmount'] +=  Number(_dataSource[i]['2024-12-01T00:00:00.000,Data.totalAmount'])

        _dataSource[i].key = hash(_dataSource[i])
        _dataSource[i]['s2023'] =
            Number(_dataSource[i]['2023-01-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-02-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-03-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-04-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-05-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-06-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-07-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-08-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-09-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-10-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-11-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2023-12-01T00:00:00.000,Data.totalAmount'])
        _dataSource[i]['s2024'] =
            Number(_dataSource[i]['2024-01-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-02-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-03-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-04-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-05-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-06-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-07-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-08-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-09-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-10-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-11-01T00:00:00.000,Data.totalAmount']) +
            Number(_dataSource[i]['2024-12-01T00:00:00.000,Data.totalAmount'])

        lastLine['s2023'] += _dataSource[i]['s2023'];
        lastLine['s2024'] += _dataSource[i]['s2024']
    }
    //lastLine.key   = hash(lastLine)
    //console.log('lastline')
    _dataSource.push(lastLine)

    console.log('xxx')
    console.log(props)

    if (props.percentage) {
        for (let i = 0; i < _dataSource.length; i++) {
            _dataSource[i]['2023-01-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-01-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-01-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-02-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-02-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-02-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-03-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-03-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-03-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-04-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-04-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-04-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-05-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-05-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-05-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-06-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-06-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-06-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-07-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-07-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-07-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-08-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-08-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-08-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-09-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-09-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-09-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-10-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-10-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-10-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-11-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-11-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-11-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2023-12-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2023-12-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2023-12-01T00:00:00.000,Data.totalAmount'] * 100

            _dataSource[i]['2024-01-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-01-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-01-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-02-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-02-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-02-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-03-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-03-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-03-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-04-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-04-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-04-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-05-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-05-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-05-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-06-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-06-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-06-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-07-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-07-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-07-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-08-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-08-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-08-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-09-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-09-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-09-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-10-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-10-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-10-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-11-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-11-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-11-01T00:00:00.000,Data.totalAmount'] * 100
            _dataSource[i]['2024-12-01T00:00:00.000,Data.totalAmount'] = _dataSource[i]['2024-12-01T00:00:00.000,Data.totalAmount'] / _dataSource[_dataSource.length - 1]['2024-12-01T00:00:00.000,Data.totalAmount'] * 100
        }
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
                    {(!resultSet || isLoading) &&
                        <div className={style.loader}>
                            <Spin indicator={antIcon}/>
                        </div>
                    }

                    <div className={style.tableContainer}>
                        <Table
                            dataSource={_dataSource}
                            columns={[..._columns]}
                            pagination={false}
                            expandable={{
                                expandedRowRender: (record) => {
                                    if (props.depth < 7) {
                                        let query = {...props.cube_query}
                                        query.dimensions = [
                                            ...props.dimensions.slice(0, props.depth + 1),
                                            "Data.date"
                                        ]

                                        let filters = []
                                        for (let i = 0; i <= props.depth; i++) {
                                            filters.push(
                                                {
                                                    "member": "Data." + props.dimension + "Nivel" + props.depth,
                                                    "operator": "equals",
                                                    "values": [record["Data." + props.dimension + "Nivel" + props.depth]]
                                                }
                                            )
                                        }

                                        query.filters = filters;

                                        return (
                                            <Cube
                                                cube_query={query}
                                                cube_api={props.cube_api}
                                                cube_token={props.cube_token}
                                                columns={props.columns ? props.columns : null}
                                                depth={props.depth + 1}
                                                dimensions={props.dimensions}
                                                dimension={props.dimension}
                                                percentage={props.percentage}
                                            />
                                        )
                                    }
                                },
                                showExpandColumn: true,
                                rowExpandable: (record) => {
                                    return (props.depth < props.dimensions.length &&  record['Data.actividadNivel1'] != 'Total')
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}

export default Cube;