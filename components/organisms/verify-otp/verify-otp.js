import { useState , useEffect, Fragment} from 'react'
import { Button } from '../../atoms'
import styles from './verify-otp.module.css'
import { isValidMobileNumber } from '../../../utils/helper'
import { verifyOtp , resendOtp} from '../../../apis'
import { taFullNameAtom, taIdAtom } from '../../../recoil-states/ta-atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { mobileNumberAtom } from '../../../recoil-states/ta-atoms'
import { useRouter } from 'next/router'
import { deviceRequirementMessage , errorMessages} from '../../../utils/constants'


export function VerifyOtp () {

    const [ otp , setOtp ] = useState('')
    const [ OtpValidationErrMsg , setOtpValidationErrMsg] = useState('')
    const [seconds, setSeconds] = useState(10);
    const [isLoading , setIsLoading] = useState(true)

    const mobile = useRecoilValue(mobileNumberAtom)
    const setFullName = useSetRecoilState(taFullNameAtom)

    const router = useRouter()

    useEffect(() => {
        const intervalId = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        if (seconds === 0) {
            clearInterval(intervalId);
          }
        return () => clearInterval(intervalId);
    }, [seconds]);


    const taId = useRecoilValue(taIdAtom)

    useEffect(() => {
        if(taId){
            setIsLoading(false)
            return
        }
        router.push('/login')
    }, [])

    function handleChangeOtp (event) {
        const imputOtp = event.target.value
        setOtpValidationErrMsg('')
        if(!isValidMobileNumber(imputOtp)){
            return
        }
        setOtp(imputOtp)
    }

    async function handleOtpVerification () {

        try{
            if(otp.length !== 4){
                throw new Error(errorMessages?.invalidOtp)
            }
            const taDetails = await verifyOtp({
                otp,
                taId
            }) || {}
            const {role=[]} = taDetails || {} 
            if(!role?.length){
                localStorage.setItem("taRoles",JSON.stringify(["prepaid-ta"]))
            }else{
                localStorage.setItem("taRoles",JSON.stringify(role))
            }
            setFullName(taDetails?.fullName)
            if(!role.includes("prepaid-ta") && !role.includes("prepaid-evaluator")){
                router.push('/fst-assignment')
                return
            }
            router.push('/')         
        }
        catch(error) {
            console.error(error)
            setOtpValidationErrMsg(error?.message)
        }
    }

    async function handleOtpResend () {

        setOtpValidationErrMsg('')
        try{
            if(seconds > 0){
                return
            }
            await resendOtp({mobile})
            setOtp('')
            setSeconds(10)
        }
        catch(error){
            console.error(error)
            setOtpValidationErrMsg(error?.message)
        }
    }

    if(isLoading) return null

    return (
        <Fragment>
            <div className={styles.parentWrapper}>
                <div className={styles.otpSec}>
                    <div className={styles.logInBox}>
                        <h1 className={styles.contentHead}>Verify Mobile Number</h1>
                        <div style={{ fontSize: "16px", marginBottom: "20px" }}>OTP sent to mobile {mobile} via WhatsApp for verification</div>
                        <div className={styles.numberInput}>
                            <input
                                style={{ borderWidth: "0", boxSizing: "unset", width: "50%" }}
                                maxLength={4}
                                placeholder="Enter OTP"
                                className={styles.input}
                                onChange={handleChangeOtp}
                                value={otp}
                            />
                        </div>
                        {OtpValidationErrMsg && <p className={styles.errorMessage}>{OtpValidationErrMsg}</p>}
                            <p className={styles.resendOtp} onClick={handleOtpResend}>
                                <span className={`${!seconds && styles.reqOtp}`}>Resend OTP</span>
                                {seconds > 0 && <span> in {seconds} seconds</span> }
                            </p>
                        <Button 
                            buttonText='Verify OTP'
                            onClickAction={handleOtpVerification}
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