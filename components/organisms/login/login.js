import styles from './login.module.css';
import whatsapp from '../../../public/svgs/whatsapp.svg'
import Image from 'next/image'
import { useState } from 'react';
import { isValidMobileNumber } from '../../../utils/helper';
import { Button } from '../../atoms';
import { getLoginOtp } from '../../../apis';
import { useRouter } from 'next/router';
import { mobileNumberAtom , userIdAtom} from '../../../recoil-states/student-atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';



export function Login() {

    const [ mobile , setMobile ] = useRecoilState(mobileNumberAtom)
    // const setUserId = useSetRecoilState(userIdAtom)
    const [ mobileValidationErrMsg, setMobileValidationErrMsg ] = useState('');

    const router = useRouter()

    function handleChangeMobile (event) {
        const imputMobile = event.target.value
        setMobileValidationErrMsg('')
        if(!isValidMobileNumber(imputMobile)){
            return
        }
        setMobile(imputMobile) 
    }

    async function getOtp () {
        try {
            if(mobile?.length !== 10){
                throw new Error("Mobile number should be of 10 digits")
            }
            return alert('Waiting for backend routes ...')
            const response = await getLoginOtp({mobile})
            // setUserId(response?.id)
            
            router.push('/verify-otp')
        }
        catch(error){
            console.log(error)
            setMobileValidationErrMsg(error.message)
        }
    }


    return (
        <div className={styles.parentWrapper}>
            <div className={styles.cotentSec}>
                <div className={styles.logInBox}>
                    <h1 className={styles.contentHead}>Login to continue</h1>
                    <div className={styles.numberInput}>
                        <Image src={whatsapp} alt="whatsapp" />
                        <div style={{ fontSize: "16px", marginLeft: "10px", marginRight: "10px" }}>+91 -</div>
                        <input
                            style={{ borderWidth: "0", boxSizing: "unset", width: "50%" }}
                            type="tel"
                            value={mobile}
                            placeholder="Enter Whatsapp Number"
                            className={styles.input}
                            onChange={handleChangeMobile}
                        />
                    </div>
                    {!!mobileValidationErrMsg && <p className={styles.errorMessage}>{mobileValidationErrMsg}</p>}
                    <Button 
                        buttonText='Send Otp'
                        onClickAction={getOtp}
                    />
                </div>
            </div>
        </div>

    )
}