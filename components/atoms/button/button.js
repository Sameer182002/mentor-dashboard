import styles from './button.module.css'

export function Button ({buttonText,customStyle,onClickAction}) {
    return (
        <button 
            className={`${styles.buttonStyle} ${customStyle}`}
            onClick={onClickAction}
        >
            {buttonText || 'Submit'}
        </button>
    )
}