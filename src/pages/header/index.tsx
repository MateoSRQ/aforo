import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Select} from 'antd'
import type {MenuProps} from 'antd';
import {Button, Dropdown, Space} from 'antd';
import {DownOutlined} from '@ant-design/icons';


const MenuItem = (props: any) => {

    const [status, setStatus] = useState(true)

    console.log('props')
    console.log(props)
    console.log(props.item.id)
    return (
        <Draggable key={props.item.id} draggableId={props.item.id} index={props.index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        status
                    )}
                    onClick={() => {
                        setStatus(!status)
                    }}
                >
                    {props.item.content}

                </div>
            )}
        </Draggable>
    )
}

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any, status: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    paddingTop: 8,
    paddingBottom: 8,
    margin: `0 ${grid}px 0 0`,
    minWidth: '150px',
    height: '20px',
    fontFamily: 'Archivo',
    background: 'lightblue',
    filter: status ? 'grayscale(0)' : 'grayscale(1)',
    //cursor: status ? 'pointer': 'none',
    color: '#222',
    fontSize: '.9rem',
    // textAlign: 'center',
    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
    background: 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});


export default () => {
    const [dimensions, setDimensions] = useState(
        {
            "measures": [
                "Data.totalAmount"
            ],
            "dimensions": [
                "Data.actividadNivel1"
            ],
            "order": [
                [
                    "Data.actividadNivel1",
                    "asc"
                ],
                [
                    "Data.date",
                    "asc"
                ]
            ],
            "timeDimensions": [
                {
                    "dimension": "Data.date",
                    "granularity": "month"
                }
            ]
        }
    )



    const [items, setItems] = useState([
        {id: '1', content: 'item 01'},
        {id: '2', content: 'item 02'},
        {id: '3', content: 'item 03'}])

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const _items = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        setItems(_items);
    }

    const handleAddButtonClick = () => {
        console.log('add')
        let _items = JSON.parse(JSON.stringify(items))
        _items.push({id: items.length.toString(), content: "item 0" + items.length.toString()})
        setItems(_items)
    }

    /*
    console.log('items')
    console.log(items)
*/
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                        <div
                            style={{
                                userSelect: 'none',
                                backgroundColor: 'white',
                                color: 'black',
                                margin: `0 ${grid}px 0 0`,
                                height: '20px',
                                width: '20px',
                                padding: '8px',
                            }}
                            onClick={handleAddButtonClick}
                        >PLUS
                        </div>
                        {items.map((item: any, index: any) => (
                            <MenuItem item={item} index={index} key={item}/>
                            // <Draggable key={item.id} draggableId={item.id} index={index}>
                            //     {(provided, snapshot) => (
                            // <MenuItem provided={provided} item={item} />
                            // <div
                            //     ref={provided.innerRef}
                            //     {...provided.draggableProps}
                            //     {...provided.dragHandleProps}
                            //     style={getItemStyle(
                            //         snapshot.isDragging,
                            //         provided.draggableProps.style
                            //     )}
                            // >
                            //     {item.content}
                            // </div>
                            //     )}
                            // </Draggable>
                        ))}
                        {/*{provided.placeholder}*/}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
