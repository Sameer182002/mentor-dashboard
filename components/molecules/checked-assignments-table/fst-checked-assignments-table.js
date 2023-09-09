import { useRouter } from 'next/router'
import { truncateText } from '../../../utils/helper'
import { FstTableRow } from '../fst-table-row/fst-table-row'
import styles from './fst-checked-assignment.module.css'

export function FstCheckedAssignmentTable({data=[]}){
    const router = useRouter()

    function handleClick (studentId, assignmentId) {
        if(!studentId || !assignmentId) return
        router.push({
            pathname:"/check-fst-assignment",
            query : {studentId,assignmentId}
        })
    }

    return (
        <div className={styles.mainWrapper}>
            <FstTableRow 
                key1='Assignment name'
                key2='Submitted by '
                key3='Cohort'
                key4='Question submitted'
                key5='Total Questions '
                key6='View'
                cutomStyle={styles.header}
            />
            <div className={styles.tableData}>
                {data.map(({studentId='',assignmentId='',assignmentName='',cohort='',studentName='',submittedQuestionsCount='',totalQuestionsCount=''},index)=>
                    <FstTableRow
                        key1={truncateText(assignmentName,20)|| ""}
                        key2={truncateText(studentName,12) || ""}
                        key3={truncateText(cohort,14) || ""}
                        key4={submittedQuestionsCount || ""}
                        key5={totalQuestionsCount || ""}
                        key6={"View"} 
                        cutomStyle={styles.tableRow} 
                        handleClickForCheck = {()=>handleClick(studentId,assignmentId)}
                        key = {index}
                    />
                )}
            </div>
            
        </div>
    )
}