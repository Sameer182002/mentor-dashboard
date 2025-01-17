import styles from './fst-home.module.css';
import {getFstAssignedAssignments } from '../../../apis';
import { useEffect, useState } from 'react';
import FstHomeSkeleton from "./fst-home-skeleton";
import { FstCheckedAssignmentTable, UncheckedAssignmentTable, RejectedAssignmentTable } from '../../molecules';

export function FstHomeComponent() {
    const [checkedAssgData, setCheckedAssgData] = useState([]);
    const [uncheckedAssgData, setUncheckedAssgData] = useState([]);
    const [rejectedAssignmentData, setRejectedAssgData] = useState([])
    const [isLoading,setIsLoading] = useState(true);

    async function getAssignmentsDetails() {
        try{
            const {
                checkedAssignments = [], 
                uncheckedAssignments = [],
                rejectedAssignments = []
            } = await getFstAssignedAssignments() || {}
            
            setCheckedAssgData(checkedAssignments);
            setUncheckedAssgData(uncheckedAssignments);
            setRejectedAssgData(rejectedAssignments);
            setIsLoading(false)
        }
        catch(error){
            console.log(error?.message || error)
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAssignmentsDetails();
    }, []);

if(isLoading) return <FstHomeSkeleton/>

  return (
    <div className={styles.wrapper}>
        <h4>FST Assignments</h4>
        <div className={styles.rejectedAssignment}>
            <h5>
                <span className={styles.tableHeading}>
                   {'Rejected Assignment '}
                </span>
                <span className={styles.uncheckedCount}>
                    ( {rejectedAssignmentData?.length} No&#39;s )
                </span>
            </h5>
            <p className={styles.message}>Your Assignments Evaluation is not up-to the mark. Kindly Re-Evaluate now.</p>
            <RejectedAssignmentTable data={rejectedAssignmentData}/>
        </div>
        <div className={styles.uncheckedAsg}>
            <h5>
                <span className={styles.tableHeading}>
                   {'Unchecked Assignment '}
                </span>
                <span className={styles.uncheckedCount}>
                    ( {uncheckedAssgData?.length} No&#39;s )
                </span>
            </h5>
            <UncheckedAssignmentTable data={uncheckedAssgData}/>
        </div>
        <div className={styles.checkedAssg}>
            
            <h5>
                <span className={styles.tableHeading}>
                    {'Checked Assignment '}
                </span>
                <span className={styles.checkedCount}>
                    ( {checkedAssgData?.length} No&#39;s )
                </span>
            </h5>

            <p>All submitted questions for an assignment must be checked for the assignment to be considered checked .</p>
            <FstCheckedAssignmentTable data={checkedAssgData} />
        </div>
    </div>
  );
}
