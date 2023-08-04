import { Skeleton } from "@mui/material";
import style from './upcoming-session-skeleton.module.css'

export default function UncheckedQuestionSkeletons(){
    const arr = new Array(9).fill(1) 
    return (
        <div className={style.wrapper}>
            <Skeleton 
                variant="rounded"
                className={style.headSkelStyle}
                height={35}
            />
            <Skeleton 
                variant="rectangular"
                className={style.headSkelStyle}
                height={20}
            />
            <div className={style.boxWrapper}>
                {arr.map((e,index)=>{
                    return(
                        <Skeleton 
                            variant="rectangular"
                            height="5rem"
                            key={index}
                />
                    )
                })}
            </div>
            

        </div>
    )
}