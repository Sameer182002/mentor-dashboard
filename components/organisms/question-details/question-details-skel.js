import { Skeleton } from "@mui/material";
import style from './question-details-skel.module.css'

export default function QuestionDetailsSkeleton () {
    return (
        <div className={style.wrapper}>
            <Skeleton 
                height={50}
                className={style.headSkelStyle}
            />
            <Skeleton 
                height={50}
                className={style.headSkelStyle}
            />
            <Skeleton 
                height={50}
                className={style.subheadSkelStyle}
            />
            <Skeleton
                variant="rounded"
                className={style.bodySkelStyle}
                height={400}
            />
        </div>
    )
}