import styles from './slot-text.module.css'
export function SlotText({heading='',value='',customStyle}){
    const truncatedValue = value.length > 16 ? value.slice(0, 16) + '...' : value;
    return (
        <div className={styles.textWrapper}>
            <p className={`${styles.textStyle} ${customStyle}`}>{heading}</p>
            <p className={`${styles.textStyle} ${customStyle}`}>:&nbsp;&nbsp;{truncatedValue}</p>
        </div>
    )
}