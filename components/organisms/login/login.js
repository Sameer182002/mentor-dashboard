import styles from './login.module.css';
import whatsapp from '../../../public/svgs/whatsapp.svg'
import Image from 'next/image'
import { Fragment, useState } from 'react';
import { isValidMobileNumber } from '../../../utils/helper';
import { Button } from '../../atoms';
import { getLoginOtp } from '../../../apis';
import { useRouter } from 'next/router';
import { mobileNumberAtom , taIdAtom} from '../../../recoil-states/ta-atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoadingAtom } from '../../../recoil-states/ui-atoms';
import { deviceRequirementMessage ,errorMessages} from '../../../utils/constants';



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
                throw new Error(errorMessages?.invalidMobile)
            }
            const response = await getLoginOtp({mobile})
            setTaId(response?._id)
            router.push('/verify-otp')
        }
        catch(error){
            setMobileValidationErrMsg(error?.message || errorMessages?.serverError)
        }
        finally{
            setIsLoading(false)
        }
    }


    return (
        <Fragment>
            <div className={styles.parentWrapper}>
                <div className={styles.cotentSec}>
                    <div className={styles.logInBox}>
                        <h1 className={styles.contentHead}>Login to continue</h1>
                        <div className={styles.numberInput}>
                            <Image src={whatsapp} alt="whatsapp" />
                            <div className={styles.mobileContainer}>+91 -</div>
                            <input
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
            <div className={styles.deviceMessage}>
                <p>{deviceRequirementMessage}</p>
            </div>
        </Fragment>


    )
}