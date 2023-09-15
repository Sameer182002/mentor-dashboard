import style from './sidebar.module.css'
import { Header } from '../../molecules'
import DescriptionIcon from '@mui/icons-material/Description';
import { Fragment, useEffect, useState } from 'react';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { deviceRequirementMessage, sidebarOptions } from '../../../utils/constants';
import { useRouter } from 'next/router';
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';

export function Sidebar({children}) {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();
    const [isLoading,setIsLoading] = useState(true);
    const updatedSidebarOptions = sidebarOptions
    const toggleSidebar = (path) => {
      setExpanded(!expanded);
      if(path) handleClickRedirect(path);
    };

    const handleClickRedirect = (page) => {
        router.push(page)
    }

    const pathMappingByTaRole = {
        "fst-evaluator" : [3],
        "prepaid-ta" : [0,1,2],
        "fst-ta": [1,2]
    }
    
    function toDisableOptions(taRoles){
        taRoles.forEach(role=>{
            if(pathMappingByTaRole.hasOwnProperty(role)){
                const indexes = pathMappingByTaRole[role]
                indexes.map(idx => updatedSidebarOptions[idx].isVisible = true)
            }
        })
    }

    useEffect(()=>{
        if(!router?.isReady) return
        const rolesOfTa = JSON.parse(localStorage.getItem("taRoles") || "[]")
        toDisableOptions(rolesOfTa);
        setIsLoading(false)
     },[router?.isReady])
    
     if(isLoading) return null
    return (
        <Fragment>
        <main className={style.wrapper}>
        <div className={style.sidebar}>
            <Header/>
            <div className={style.container}>
                <div className={`${style.leftSec} ${ expanded && style.expandedLeftSec}`}>
                   {    
                        !expanded && 
                            <div className={style.sidebarMenuIcons}>
                                <MenuIcon className={style.sidebarIcon} sx={{fontSize:"1.2rem"}} onClick={toggleSidebar}/>
                                {
                                    updatedSidebarOptions.filter(option=>option?.isVisible).map(({highlighted,unhighlighted,path,highlightedPaths},index) => (
                                        <Image src={highlightedPaths.includes(router?.pathname) ? highlighted : unhighlighted} onClick={()=>toggleSidebar(path)} className={style.documentIcon} key={index}/>
                                    ))
                                }
                            </div>
                    }
                    {   
                        expanded && (
                        <Fragment>
                            <div className={style.closeIconHolder}>
                                <HighlightOffTwoToneIcon 
                                    className={style.closeIcon} 
                                    onClick={toggleSidebar}
                                />
                            </div>
                            <div className="options">
                                {
                                    updatedSidebarOptions.filter(option=>option?.isVisible).map(({title,path,highlighted,unhighlighted,highlightedPaths}, i) =>(
                                        <div 
                                            className={style.option}
                                            key={title}
                                            onClick={
                                                () => handleClickRedirect(path)
                                            }
                                        >   
                                            <Image src={highlightedPaths.includes(router?.pathname)? highlighted :unhighlighted} className={style.iconImg}/>
                                            <span className={highlightedPaths.includes(router?.pathname) ?style.highlightedTitle : style.sidebarTitle}>{title}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </Fragment>
                        )
                    }
                </div>
                <div className={style.rightSec}>
                    {children}
                </div>
            </div>
        </div>
        </main>
        <div className={style.mobileViewWrapper}>
            <Header/>
            <div className={style.deviceMessage}>
                <p>{deviceRequirementMessage}</p>
            </div>
        </div>    
        </Fragment>
    )
}