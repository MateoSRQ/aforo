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


export default () => {


    const columns = [
        {
          title: 'I',
          dataIndex: 'ciclo01',
          key: 'ciclo01',
          render: (text) => <a>{text}</a>,
        },
        {
            title: 'II',
            dataIndex: 'ciclo02',
            key: 'ciclo02',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'III',
            dataIndex: 'ciclo03',
            key: 'ciclo03',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'IV',
            dataIndex: 'ciclo04',
            key: 'ciclo04',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'V',
            dataIndex: 'ciclo05',
            key: 'ciclo05',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'VI',
            dataIndex: 'ciclo06',
            key: 'ciclo06',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'VII',
            dataIndex: 'ciclo01',
            key: 'ciclo01',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'VIII',
            dataIndex: 'ciclo01',
            key: 'ciclo01',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'IX',
            dataIndex: 'ciclo01',
            key: 'ciclo01',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'X',
            dataIndex: 'ciclo01',
            key: 'ciclo01',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'XI',
            dataIndex: 'ciclo01',
            key: 'ciclo01',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'XII',
            dataIndex: 'ciclo01',
            key: 'ciclo01',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'A',
            dataIndex: 'ciclo01',
            key: 'ciclo01',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'B',
            dataIndex: 'ciclo01',
            key: 'ciclo01',
            render: (text) => <a>{text}</a>,
          },
      ];

    let initial = 297

    let desercion = [.15, .12, .12, .10, .05, .04, .03, .02, .02, .01]
    let semestre = .43
    let crecimiento = .05


    let data = []

    let _initial = initial


    for (let i=0; i<5; i++) {
        let _row: any = {
            0: 0, 1: 0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0
        }
        for (let j = 0; j <= 10; j++) {
            if (j == i) {
                _row[j] = Math.round(_initial*((j%2)?semestre:1)*(1 + crecimiento*Math.floor(j/2)))
            }
            if (j > i) {

                _row[j] = Math.round(_row[j-1]*((1 - desercion[j - i - 1])))
            }

        }
        data.push(_row)
    }
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
            <Table columns={columns} dataSource={data} />
 </div>
            </div>

        </ConfigProvider>
    )
}

