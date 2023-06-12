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
            <option disabled selected>Select Assignment</option>
            {
                data.map((data,index) => 
                    <option value={data?.[valueKey]} key={index}>
                        {data?.[textKey]}
                    </option>
                )
            }
        </select>
    )
}