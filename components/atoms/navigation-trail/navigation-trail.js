import { useRouter } from 'next/router'
import style from './navigation-trail.module.css'
import Link from 'next/link'

export function NavigationTrail({currentAssignment}) {
    const router = useRouter()
    const paths = [
        {
            text : 'Assignments' ,
            path : '/'
        } ,
        {
            text : 'Unchecked Questions',
            path : '/unchecked-questions'
        },
        {
            text : currentAssignment,
            path : ''
        }
    ]
    function handleRedirect(pathName) {
        pathName && router.push(pathName)
    }
    return (
            <div className={style.navigationTrail}>
                {
                    paths.map((path, index) => (
                        <div 
                            className={style.pathHolder} 
                            onClick={()=>handleRedirect(path?.path)}
                        >
                            <p>{path?.text}</p>
                            {index+1 !== paths.length && <p>&#62;</p>}
                        </div>
                    ))
                }
            </div>
        )
}