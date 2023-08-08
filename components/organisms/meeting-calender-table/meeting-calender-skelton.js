import Skeleton from '@mui/material/Skeleton';
import style from './meeting-calender-skeleton.module.css'

export default function MeetingCalenderSkeleton() {
    return (
        <div className={style.skelWrapper}>
            <Skeleton 
                variant="rectangular"
                className={style.headingSkeleton}
                height={50}
            />
            <Skeleton 
                variant="rounded"
                className={style.tableSkeleton}
                height={600}
            />
        </div>

    )
}