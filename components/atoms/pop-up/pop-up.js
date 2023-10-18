import { useState } from "react";
import styles from "./pop-up.module.css"
import Image from "next/image";
import tick from "../../../public/svgs/tick.svg"
import cancel from "../../../public/svgs/cancel.svg"
import Dialog from '@mui/material/Dialog';

export function MentorEvaluationInstructionModal ({topicsToConsider = '', topicsToIgnore = '', open=false}){
    const [showPopup,setShowPopup] = useState(true)
    const handleClose =()=>{
        setShowPopup(false)
    }
    if(!showPopup){
        return null
    }
    return (
            <Dialog open={open} maxWidth="md">
                <div className ={styles.popup}>
                    <div className={styles.content}> 
                        <span className={styles.heading}>Please go through the instructions before evaluating.</span>
                      { (topicsToConsider) && (<div className={styles.subheading}>
                            <div className={styles.image}>
                                <Image 
                                    src={tick}
                                    width="100%"
                                    height="100%"
                                    objectFit="fill"
                                    layout="fill"
                                />
                            </div>
                            <div className={styles.infoTextWrapper}>
                                <p className={styles.topic}>Topics to be considered</p>
                                <p className={styles.value}>{topicsToConsider}</p>
                            </div>
                        </div>)}
                        {(topicsToIgnore) && (<div className={styles.subheading}>
                            <div className={styles.image}>
                                    <Image 
                                        src={cancel}
                                        width="100%"
                                        height="100%"
                                        objectFit="fill"
                                        layout="fill"
                                    />
                            </div>
                            <div className={styles.infoTextWrapper}>
                                <p className={styles.topic}>Topics to be ignored</p>
                                <p className={styles.value}>{topicsToIgnore}</p>
                            </div>
                        </div>)}
                    </div>
                    <div className={styles.btnWrapper}>
                        <button className={styles.closeButton}><p className={styles.closeButtontext} onClick={handleClose} >I have read it</p></button>  
                    </div>
                </div>  
            </Dialog>
      
      );
}