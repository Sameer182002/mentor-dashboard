import style from "./fst-home.module.css"
import { FstHomeComponent } from '../../organisms'
import { deviceRequirementMessage } from '../../../utils/constants'

export function FstHome(){
    return(
    <div className={style.wrapper}>
        <div className={style.cpmponentWrapper}>
            <FstHomeComponent />
        </div>
        <div className={style.deviceMessage}>
            <p>{deviceRequirementMessage}</p>
        </div>
    </div>
    )
}