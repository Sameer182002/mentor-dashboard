import { Fragment } from 'react'
import styles from './mark-distribution-table.module.css'


export function MarksDistributionTable ({
    marksPercentage = {},
    handleMarksInput = () => {}, 
    marksDistrubution,
    isLocked = false
}) {

    const {
        fiftyPercent = '',
        twentyPercent = '',
        thirtyPercent = ''
    } = marksPercentage || {}

    const rowDetails = [
        {
            text : 'Screen share & camera on',
            mmaxMarks : twentyPercent,
            key : 'screenShareAndCameraScore',
            maxLength : String(twentyPercent).length
        },
        {
            text : 'Logic building',
            mmaxMarks : thirtyPercent,
            key : 'logicBuildingScore',
            maxLength : String(thirtyPercent).length
        },
        {
            text : 'Marks for efforts',
            mmaxMarks : fiftyPercent,
            key : 'effortScore',
            maxLength : String(fiftyPercent).length
        },
    ]

    return (
        <table className={styles.wrapper}>
            <div className={styles.tableHead}>
                <span>Criteria</span>
                <span>Marks</span>
            </div>
            <Fragment>
                {
                    rowDetails.map(({text, mmaxMarks, key, maxLength}) => (
                        <div className={styles.tableRow} key={text}>
                            <span>{text}</span>
                            <div>
                                <input 
                                    className={styles.markInput} 
                                    maxLength={maxLength}
                                    onChange={(e)=>handleMarksInput(
                                        key,
                                        e.target.value
                                    )}
                                    value={marksDistrubution?.[key]}
                                    placeholder='_ _'
                                    disabled = {isLocked}
                                />
                                <span> / </span>
                                <span>{mmaxMarks}</span>
                            </div>
                        </div>
                    ) )
                }
            </Fragment>
        </table>
    )
}