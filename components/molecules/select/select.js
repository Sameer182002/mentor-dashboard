import style from './select.module.css'

export function Select ({ 
    data = [],
    textKey = '',
    valueKey = '' , 
    handleSelectFuncton = ()=>{} ,
}) {

    return (
        <select 
            className={style.select} 
            onChange = {
                (e)=>handleSelectFuncton(e.target.value)
            }
            disabled = {data?.length < 2}
        >
            <option disabled selected>Assignments</option>
            {
                data.map(data => 
                    <option value={data?.[valueKey]}>
                        {data?.[textKey]}
                    </option>
                )
            }
        </select>
    )
}