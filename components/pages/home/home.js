import style from './home.module.css'
import { HomeComponent } from '../../organisms'
import { deviceRequirementMessage } from '../../../utils/constants'

export function Home () {
    return (
        <div className={style.wrapper}>
            <div className={style.cpmponentWrapper}>
                <HomeComponent />
            </div>
            <div className={style.deviceMessage}>
                <p>{deviceRequirementMessage}</p>
            </div>
        </div >
    )
}