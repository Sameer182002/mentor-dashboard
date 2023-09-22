import { useRouter } from "next/router"
import { truncateText } from "../../../utils/helper"
import { FstTableRow } from "../fst-table-row/fst-table-row"
import styles from "./rejected-assignment-table.module.css"
export function RejectedAssignmentTable({data=[]}){
    const router = useRouter()
    function handleClick (studentId, assignmentId) {
        if(!studentId || !assignmentId) return
        router.push({
            pathname:"/check-fst-assignment",
            query : {studentId,assignmentId}
        })
    }

    return(
        <div className={styles.mainWrapper}>
            <FstTableRow 
                key1='Assignment name'
                key2='Submitted by'
                key3='Cohort'
                key4='Unchecked Questions'
                key5='Checked Questions'
                key6='Rejected Questions'
                key7='Last Submitted'
                key8="View"
                cutomStyle={styles.header}
            />
            {data.map(({
                assignmentName='Not Given',
                studentName='Not Given',
                cohort='',
                uncheckedQuestionsCount="",
                checkedQuestionsCount="",
                rejectedQuestionsCount="",
                lastRejectedDate="",
                assignmentId='',
                studentId=''
            },index)=>
                <FstTableRow
                    key1={truncateText(assignmentName,20) || ""}
                    key2={truncateText(studentName,14)|| ""}
                    key3={truncateText(cohort,14)|| ""}
                    key4={uncheckedQuestionsCount || "0"}
                    key5={checkedQuestionsCount || "0"}
                    key6={rejectedQuestionsCount || "0"}
                    key7={lastRejectedDate}
                    key8={"View"}
                    cutomStyle={styles.tableRow}
                    handleClickForRejected = {()=>handleClick(studentId,assignmentId)}
                    key = {index}
                />
            )}
        </div>
    )
}