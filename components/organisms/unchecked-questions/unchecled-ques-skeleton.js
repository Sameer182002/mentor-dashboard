import { Skeleton } from "@mui/material";
import style from './unchecled-ques-skeleton.module.css'

export default function UncheckedQuestionSkeletons(){
    return (
        <div className={style.wrapper}>
            <Skeleton 
                variant="rectangular"
                className={style.headSkelStyle}
                height={35}
            />
            <Skeleton 
                variant="rectangular"
                className={style.headSkelStyle}
                height={35}
            />
            <Skeleton 
                variant="rounded"
                className={style.questionSkelStyle}
                height={100}
            />
            <Skeleton 
                variant="rounded"
                className={style.questionSkelStyle}
                height={100}
            />

        </div>
    )
}