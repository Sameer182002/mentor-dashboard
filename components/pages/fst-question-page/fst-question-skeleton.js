import styles from "./fst-question-skeleton.module.css"
import Skeleton from '@mui/material/Skeleton';

export default function FstQuestionSubSkeleton(){

    const shapeWithHeight = [
        {shape : "rectangular" , height : 30 , className: "heading"},
        {shape : "rectangular" , height : 30,className: "heading2"},
        {shape : "rectangular" , height : 80 , className: "image"},
        {shape : "rectangular" , height : 80, className: "image"},
        {shape : "rectangular" , height : 80, className: "image"},
    ]
    return (
        
        <div className={styles.mainWrapper}>
            <div className={styles.navigationWrapper}>
                {Array(3).fill(1).map((skel,index) => 
                    <Skeleton 
                        variant="rectangular"
                        className={styles.naviagtion}
                        height={20}
                        key ={index}
                    />
                )}
            </div>
            <Skeleton 
                variant="rectangular"
                className={styles.heading}
                height={50}
            />
            <div className={styles.navigationWrapper}>
                {Array(2).fill(1).map((skel,index) => <Skeleton 
                    variant="rectangular"
                    className={styles.naviagtion}
                    height={20}
                    key ={index}
                />)}
            </div>
            {shapeWithHeight.map(({shape,className,height},index) => 
                <Skeleton 
                    variant={shape}
                    className={styles?.[className]}
                    height={height}
                    key ={index}
                />
            )}
        </div>
    )
}