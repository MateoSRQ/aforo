import style from './index.module.css'
// import Cube from '../cube'
import {Checkbox, Col, InputNumber, InputRef, Row, Slider, Space} from 'antd';
import '@fontsource/archivo'
import '@fontsource/fragment-mono'
import {ConfigProvider, Spin, Table, Tabs, List, Radio, Form, Input, Select, Switch, Divider} from 'antd';


import {Button, Modal} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars-2';
import numbro from "numbro";
import React, {ReactNode, useContext, useEffect, useRef, useState} from "react";
import {Drawer} from 'antd';
import type {TabsProps} from 'antd';
import objectHash from "object-hash";
import {useLoading} from 'react-use-loading';
import {LoadingOutlined} from "@ant-design/icons";
import {format} from 'date-fns'
import { Popconfirm } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface Item {
    key: string;
    nivel: string;
    ambiente: string;
    tipo: string;
    metraje: number;
    aforo: number;
    activo: string;
}

interface EditableRowProps {
    index: number;
}

interface EditableRowPropsFunction {
    (s: EditableRowProps): ReactNode;
}

const EditableRow: EditableRowPropsFunction = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

interface EditableCellPropsFunction {
    (s: EditableCellProps): ReactNode;
}
const EditableCell: EditableCellPropsFunction  = ({title, editable, children, dataIndex, record, handleSave, ...restProps}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            console.log('values')
            console.log(values)
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        // console.log('++++++')
        // console.log(title)
        // console.log(dataIndex)
        // console.log(record)

        switch (dataIndex) {
            case 'nivel':
                childNode = editing ? (
                    <Form.Item
                        style={{ margin: 0 }}
                        name={dataIndex}
                        rules={[
                            {
                                required: true,
                                message: `${title} is required.`,
                            },
                        ]}
                    >
                        <Select ref={inputRef} onPressEnter={save} onBlur={save}
                                options={[
                                    { value: 'Sótano 3', label: 'Sótano 3' },
                                    { value: 'Sótano 2', label: 'Sótano 2' },
                                    { value: 'Sótano 1', label: 'Sótano 1' },
                                    { value: 'Nivel 1',  label: 'Nivel 1'  },
                                    { value: 'Nivel 2',  label: 'Nivel 2'  },
                                    { value: 'Nivel 3',  label: 'Nivel 3'  },
                                    { value: 'Nivel 4',  label: 'Nivel 4'  },
                                    { value: 'Nivel 5',  label: 'Nivel 5'  },
                                    { value: 'Nivel 6',  label: 'Nivel 6'  },
                                ]}
                        />
                    </Form.Item>
                ) : (
                    <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                        {children}
                    </div>
                );
                break;
            case 'tipo':
                childNode = editing ? (
                    <Form.Item
                        style={{ margin: 0 }}
                        name={dataIndex}
                        rules={[
                            {
                                required: true,
                                message: `${title} is required.`,
                            },
                        ]}
                    >
                        <Select ref={inputRef} onBlur={save}
                                options={[
                                    { value: 'RNE A.040 CAP III ART 9', label: 'RNE A.040 CAP III ART 9' },
                                    { value: 'RNE A.050 SALUD CAP. II. ART 6', label: 'RNE A.050 SALUD CAP. II. ART 6' },
                                    { value: 'RM 834. EDIF.UNIVERS.ANR 2012 ART. 21.6', label: 'RM 834. EDIF.UNIVERS.ANR 2012 ART. 21.6' },
                                    { value: 'RNE - A.070 COMERCIO CAP.II. ART .7', label: 'RNE - A.070 COMERCIO CAP.II. ART .7' },
                                ]}
                        />
                    </Form.Item>
                ) : (
                    <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                        {children}
                    </div>
                );
                break;
            case 'activo':
                childNode = editing ? (
                    <Form.Item
                        style={{ margin: 0 }}
                        name={dataIndex}
                    >
                        <Select ref={inputRef} onBlur={save}
                                options={[
                                    { value: 'Activo', label: 'Activo' },
                                    { value: 'Inactivo', label: 'Inactivo' }
                                ]}
                        />
                    </Form.Item>
                ) : (
                    <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                        {children}
                    </div>
                );
                break;
            default:
                childNode = editing ? (
                    <Form.Item
                        style={{ margin: 0 }}
                        name={dataIndex}
                        rules={[
                            {
                                required: true,
                                message: `${title} is required.`,
                            },
                        ]}
                    >
                        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                    </Form.Item>
                ) : (
                    <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                        {children}
                    </div>
                );
                break;
        }

    }
    return <td {...restProps}>{childNode}</td>;
};

const EditableContext = React.createContext<FormInstance<any> | null>(null);

export default (props: any) => {
    /*
    { value: 'RNE A.040 CAP III ART 9', label: 'RNE A.040 CAP III ART 9' },
    { value: 'RNE A.050', label: 'RNE A.050' },
    { value: 'RNE A.050 SALUD CAP. II. ART 6', label: 'RNE A.050 SALUD CAP. II. ART 6' },
     */
    //const [data, setData] = useState<DataType[]>()
    const [count, setCount] = useState(154)

    type EditableTableProps = Parameters<typeof Table>[0];

    interface DataType {
        key: React.Key;
        nivel: string;
        ambiente: string;
        tipo: string;
        metraje: number;
        aforo: number;
        activo: string;
    }

    type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

    const _columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Nivel',
            dataIndex: 'nivel',
            key: 'NIVEL',
            //editable: true,

            render(text: any, record: any) {
                //console.log('record')
                return {
                    props: {
                        style: {
                            width: '60px',
                            textAlign: 'left',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{record.NIVEL}</div>,
                }
            }
        },
        {
            title: 'Ambiente',
            dataIndex: 'AMBIENTES GENERADORES DE AFORO',
            key: 'AMBIENTES GENERADORES DE AFORO',
            editable: true,
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'left',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{record["AMBIENTES GENERADORES DE AFORO"]}</div>,
                }
            }
        },
        {
            title: 'Tipo',
            dataIndex: "TIPO DE AMBIENTE",
            key: "TIPO DE AMBIENTE",
            //editable: true,
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'left',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{record["TIPO DE AMBIENTE"]}</div>,
                }
            }
        },
        {
            title: 'Coeficiente',
            dataIndex: "TIPO DE AMBIENTE",
            key: "TIPO DE AMBIENTE",
            //editable: true,
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'left',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{record["COEFICIENTE DE OCUPANTES"]}</div>,
                }
            }
        },
        {
            title: 'Metraje',
            dataIndex: "AREA-UTIL",
            key: "AREA-UTIL",
            //editable: true,


            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'left',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{numbro(record["AREA-UTIL"]).format({mantissa: 2})}</div>,
                }
            }
        },
        {
            title: 'Aforo',
            dataIndex: 'AFORO REAL',
            key: 'AFORO REAL',
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '150px',
                            textAlign: 'left',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children: <div>{record["AFORO REAL"]?Math.floor(record["AFORO REAL"]):0}</div>,
                }
            }
        },
        {
            title: 'Activo',
            dataIndex: 'activo',
            key: 'activo',
            editable: true,
            render(text: any, record: any) {
                return {
                    props: {
                        style: {
                            width: '70px',
                            textAlign: 'center',
                            lineHeight: '20px',
                            padding: '2px',
                        },
                    },
                    children:  <div>{record.activo}</div>,
                }
            }
        }
    ]
    const handleAdd = () => {
        const newData = {
            key: count+ 1,
            nivel: '...',
            ambiente: '...',
            tipo: '... ',
            metraje: 0,
            aforo: 0,
            activo: "Inactivo"
        }
        props.handleChangeData([...props.data, newData]);
        setCount(count + 1);
    };
    const handleSave = (row: any) => {
        const newData = [...props.data];
        const index = newData.findIndex((item) => row.key === item.key);
        let item = newData[index];
        row.aforo = row.metraje*10
        switch (row.tipo) {
            case "RNE A.040 CAP III ART 9":
                row.aforo = row.metraje/9.50
                break;
            case "RNE A.050 SALUD CAP. II. ART 6":
                row.aforo = row.metraje/30
                break;
            case "RM 834. EDIF.UNIVERS.ANR 2012 ART. 21.6":
                row.aforo = row.metraje/1,20
                break;
            case "RNE - A.070 COMERCIO CAP.II. ART .7":
                row.aforo = row.metraje/1.50
                break;
            default:
                row.aforo = row.metraje/1
                break;
        }

        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        props.handleChangeData(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = _columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

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
                    <Button onClick={handleAdd} type="primary" style={{marginBottom: 16}}>
                        Add a row
                    </Button>
                    <Table
                        components={components}
                        columns={columns as ColumnTypes}
                        rowClassName={() => 'editable-row'}
                        dataSource={props.data}
                        //pagination={false}
                    />
                </div>
            </div>
        </ConfigProvider>
    )
}

