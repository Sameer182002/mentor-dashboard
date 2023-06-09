import { Fragment } from 'react'
import style from './table.module.css'
import { useRouter } from 'next/router'

export function Table ({
    headingsdata = {} , 
    data = [], 
    onClickAction = ()=>{} ,
    isAction = false ,
    isButton = false ,
    tableStyle ,
    rowstyle ,
    headStyle
}) {

    const keys = Object.keys(headingsdata)
    const router = useRouter()
    
    function handleClick (studentId,assignmentId,assignmentName) {
        if(!isAction || !isButton) return
        router.push({
            pathname : '/unchecked-questions' ,
            query : {
                studentId ,
                assignmentId ,
                assignmentName
            }
        })
    }

    return(
        <Fragment>
            <div className={`${style.table} ${tableStyle}`}>
                <strong></strong>
                <div className={`${style.tableHead} ${headStyle}`}>
                    {
                        keys.map(key => (
                            <span key={key}>{headingsdata?.[key]?.toLocaleUpperCase()}</span>
                        ))
                    }
                </div>
                <div>
                    {
                        data.map((testSection,index) => (
                            <div className={`${style.tableRow} ${rowstyle}`} key={index}>
                                {                                    
                                    keys.map((key,index) => (
                                        <Fragment>
                                            {
                                                index+1 === keys?.length && isAction && isButton ?
                                                <div 
                                                    onClick={
                                                        ()=>handleClick(
                                                            testSection?.studentId ,
                                                            testSection?.assignmentId ,
                                                            testSection?.assignmentName
                                                        )
                                                    } 
                                                    key={key} 
                                                    className={style.viewBtn}>
                                                    <button>View</button>
                                                </div> :
                                                <span key={key}>
                                                    {testSection?.[key]}
                                                </span>
                                            }
                                        </Fragment>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )
}