import styles from './home-component.module.css';
import { Table } from '../table/table';
import { 
    checkedAssgTableTitle, 
    unCheckedAssgTableTitle 
} from '../../../utils/constants';
import { getAssignments } from '../../../apis';
import { useEffect, useState } from 'react';
import HomeSkeleton from './home-skeleton';

export function HomeComponent() {
    const [checkedAssgData, setCheckedAssgData] = useState([]);
    const [uncheckedAssgData, setUncheckedAssgData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    async function getAssignmentsDetails() {
        try{
            const {
                checkedAssignments = [], 
                uncheckedAssignments = []
            } = await getAssignments() || {}
            
            setCheckedAssgData(checkedAssignments);
            setUncheckedAssgData(uncheckedAssignments);
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

    if(isLoading) return <HomeSkeleton/>

  return (
    <div className={styles.wrapper}>
        <h4>Assignments</h4>
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
            <Table 
                headingsdata={checkedAssgTableTitle}
                data={checkedAssgData}
                tableStyle = {styles.tableStyle}
            />
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
            <Table 
                headingsdata={unCheckedAssgTableTitle}
                data = {uncheckedAssgData}
                isAction 
                isButton
                headStyle={styles.uncheckedTableHeadStyle}
                rowstyle={styles.uncheckedTableRowStyle}
            />
        </div>

    </div>
  );
}
