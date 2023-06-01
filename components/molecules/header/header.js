import Image from 'next/image'
import styles from './header.module.css'
import logo from '../../../public/svgs/logo.svg'
import { Logout } from '../../atoms'
import { useRouter } from 'next/router'
import { invalidLogoutPaths } from '../../../utils/constants'
import { useEffect, useState } from 'react'

export function Header (){
    const [isValidPath , setIsValidPath] = useState(false)
    const {pathname,push} = useRouter()


    useEffect(()=> {
        const validPathStatus = !invalidLogoutPaths.includes(pathname)
        setIsValidPath(validPathStatus)
    },[])

    function handleClickLogo () {
        isValidPath && push('/')
    }

    return(
        <div className={styles.headerWrapper}>
            <div className={styles.logo} onClick={handleClickLogo}>
            <div className={styles.logoAndTextWrapper}>
                    <picture className={styles.logoWrapper}>
                        <Image
                            height='100%'
                            width='100%'
                            src={logo}
                            alt="function up logo"
                            layout='fill'
                            objectFit='fill'
                        />
                    </picture>

                <div className={styles.spacer} />
                <div>
                    <h1 className={styles.heading}>FunctionUp</h1>
                    <h1 className={styles.bootcamp}>Placement Bootcamp</h1>
                </div>
            </div>
           </div>
          { isValidPath && <Logout/>}
        </div>
    )
}