import Skeleton from '@mui/material/Skeleton';
import styles from "./check-fst-skeleton.module.css"

export default function CheckFstSkeleton(){
    return(
        <div className={styles.mainWrapper}>
            <div className={styles.navigationWrapper}>
                {Array(2).fill(1).map((skeleton,index) =>
                    <Skeleton 
                    variant="rectangular"
                    className={styles.naviagtion}
                    height={20}
                    key={index}
                /> )}
            </div>

             <Skeleton 
                variant="rectangular"
                className={styles.heading}
                height={40}
            />
            {Array(4).fill(1).map((skel,index) => 
                <Skeleton 
                variant="rectangular"
                className={styles.detailsBox}
                height={80}
                key={index}
            />)}
        </div>
    )
}