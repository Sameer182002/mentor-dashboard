import styles from './login.module.css';
import whatsapp from '../../../public/svgs/whatsapp.svg'
import Image from 'next/image'
import { useState } from 'react';
import { isValidMobileNumber } from '../../../utils/helper';
import { Button } from '../../atoms';
import { getLoginOtp } from '../../../apis';
import { useRouter } from 'next/router';
import { mobileNumberAtom , taIdAtom} from '../../../recoil-states/ta-atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoadingAtom } from '../../../recoil-states/ui-atoms';



export function Login() {

    const [ mobile , setMobile ] = useRecoilState(mobileNumberAtom)
    const setTaId = useSetRecoilState(taIdAtom)
    const [ mobileValidationErrMsg, setMobileValidationErrMsg ] = useState('');
    const [isLoading , setIsLoading] = useRecoilState(isLoadingAtom)

    const router = useRouter()

    function handleChangeMobile (event) {
        const inputMobile = event.target.value
        setMobileValidationErrMsg('')
        if(!isValidMobileNumber(inputMobile)){
            return
        }
        setMobile(inputMobile) 
    }

    async function getOtp () {
        try {
            if(isLoading) return
            setIsLoading(true)
            if(mobile?.length !== 10){
                throw new Error("Mobile number should be of 10 digits")
            }
            const response = await getLoginOtp({mobile})
            setTaId(response?._id)
            router.push('/verify-otp')
        }
        catch(error){
            setMobileValidationErrMsg(error?.message || 'please try again later.')
        }
        finally{
            setIsLoading(false)
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