import Skeleton from '@mui/material/Skeleton';
import style from './home-skeleton.module.css'

export default function HomeSkeleton() {
    return (
        <div className={style.skelWrapper}>
            <Skeleton 
                variant="rectangular"
                className={style.headingSkeleton}
                height={30}
            />
            <Skeleton 
                variant="rectangular"
                className={style.headingSkeleton}
                height={50}
            />
            <Skeleton 
                variant="rounded"
                className={style.tableSkeleton}
                height={200}
            />
             <Skeleton 
                variant="rectangular"
                className={style.headingSkeleton}
                height={30}
            />
              <Skeleton 
                variant="rounded"
                className={style.tableSkeleton}
                height={200}
            />
        </div>

    )
}