import { useEffect, useState } from "react"
import { getUpcomingbookedSessions } from "../../../apis"
import { deviceRequirementMessage } from "../../../utils/constants"
import { getFormattedDate, getTimeWithAmPm, isTimeToJoinMeet } from "../../../utils/helper"
import { BookedSlots } from "../../section"
import UpcomingSessionSkeleton from "./upcoming-session-skelton"
import styles from "./upcoming-session.module.css"
export function UpcomingSession(){

    const [bookedSessions,setBookedSessions] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    async function getBookedSessions (){
        try{
            setIsLoading(true)
            const data = await getUpcomingbookedSessions()
            if(data?.length){
                const formattedData = []
                data.forEach(session=>{
                    const {
                        date=0,from=0,to=0,
                        student:{
                            firstName='',
                            lastName='',
                            mobile="",
                            fullName=''
                        }={},
                        dyteMeetingLink='',
                        fstCohortData = '',
                        ta = '',
                        student = ''
                    } = session || {}
                formattedData.push({
                    name:fullName ? fullName : `${firstName} ${lastName}`,
                    mobile,dyteMeetingLink,
                    from : getTimeWithAmPm(from),
                    to : getTimeWithAmPm(to),
                    date : getFormattedDate(date),
                    isTimeToJoinMeet : isTimeToJoinMeet(from),
                    ...(fstCohortData && {cohortName : fstCohortData?.name}),
                    ...(ta && {taName : ta?.fullName}),
                    ...(student && {studentId : student?._id})
                })
                })
                setBookedSessions(formattedData)
                setIsLoading(false)
            }
        }catch(error){
            setIsLoading(false)
            console.error(error?.message)
        }
    }

    useEffect(()=>{
        getBookedSessions(); 
    },[])

    if(isLoading){
        return (<UpcomingSessionSkeleton/>)
    }
    return (
        <>
            <div className={styles.mainWrapper}>
                <h2>Upcoming Sessions</h2>
                <p className={styles.subHeading}>You can checkout all your booked doubt sessions here.</p>
                {bookedSessions?.length ? <BookedSlots data = {bookedSessions}/> : <p className={styles.noSessionText}>You have 0 upcoming booked sessions</p>}
            </div>
            <div className={styles.deviceMessage}>
                <p>{deviceRequirementMessage}</p>
            </div>
        </>
    )
}