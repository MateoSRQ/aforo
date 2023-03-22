import style from './index.module.css'
import {Collapse} from "antd";
const { Panel } = Collapse;

export default () => {
    return (
        <div className={style.component}>
            <Collapse collapsible="header" defaultActiveKey={['1']}>
                <Panel header="This panel can only be collapsed by clicking text" key="1">
                    <div className={style.card}></div>
                </Panel>
            </Collapse>


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
            <div className={style.card}></div>
        </div>
    )
}