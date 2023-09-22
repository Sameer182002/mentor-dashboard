import styles from "./fst-table-row.module.css"
export function FstTableRow({
    key1 ='',
    key2 ='',
    key3 ='',
    key4 ='',
    key5 ='',
    key6 = '',
    key7 = '',
    key8 = '',
    cutomStyle,
    handleClickForCheck,
    handleClickForUncheck,
    handleClickForRejected
}){
    return(
        <div className={`${styles.tableHeader} ${cutomStyle}`}>
            {key1 && <p>{key1}</p>} 
            {key2 && <p>{key2}</p>} 
            {key3 && <p>{key3}</p>} 
            {key4 && <p>{key4}</p>} 
            {key5 && <p>{key5}</p>} 
            {key6 && <p onClick={handleClickForCheck}> {key6}</p>} 
            {key7 && <p onClick={handleClickForUncheck}>{key7}</p>} 
            {key8 && <p onClick={handleClickForRejected}>{key8}</p>} 
        </div>
    )
}