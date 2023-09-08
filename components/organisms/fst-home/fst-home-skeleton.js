import Skeleton from '@mui/material/Skeleton';
import style from './fst-home-skelton.module.css'

export default function FstHomeSkeleton() {
    const shapeWithHeight = [
        {shape : "rectangular" , height : 30 , className: "headingSkeleton"},
        {shape : "rectangular" , height : 50,className: "headingSkeleton"},
        {shape : "rounded" , height : 200 , className: "tableSkeleton"},
        {shape : "rectangular" , height : 30, className: "headingSkeleton"},
        {shape : "rounded" , height : 200, className: "tableSkeleton"},
    ]
    return (
        <div className={style.skelWrapper}>
            {shapeWithHeight.map( ({shape='',height=0,className =''},index) =>
                <Skeleton 
                    variant={shape}
                    className={style?.[className]}
                    height={height}
                    key = {index}
                /> 
            )}
        </div>

    )
}