import Image from 'next/image'
import style from './logout.module.css'
import { defaultUser } from '../../../public/svgs'
import { useState } from 'react'
import {cookie} from '../../../apis/cookies'

export function Logout () {
    const [isDropdownOpen , setIsDropdownOpen] = useState(false)

    function handleLogout ( ) {
        cookie.removeTaAuthToken()
        localStorage.clear()
        window.location.reload()
    }

    function Getdropdown ({handleLogout}) {
        return (
            <div 
                className={style.dropWrapper}
                onClick={handleLogout}
            >
                <div className={style.dropdown}>
                    Logout
                </div>
            </div>
        )
    }
    return(
        
        <div 
            className={style.logout} 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
            <picture className={style.profile}>
                <Image
                    src={defaultUser}
                    height={'100%'}
                    width={'100%'}
                    layout='fill'
                    objectFit='fill'
                />
            </picture>
            <span>jaGdish shinde </span>
           { isDropdownOpen && <Getdropdown handleLogout = {handleLogout}/>}
        </div>
    )
}