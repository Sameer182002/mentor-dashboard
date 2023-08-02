import style from './sidebar.module.css'
import { Header } from '../../molecules'
import DescriptionIcon from '@mui/icons-material/Description';
import { Fragment, useState } from 'react';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { deviceRequirementMessage, sidebarOptions } from '../../../utils/constants';
import { useRouter } from 'next/router';
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
export function Sidebar({children}) {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();

    const toggleSidebar = (path) => {
      setExpanded(!expanded);
      if(path) handleClickRedirect(path);
    };
    const handleClickRedirect = (page) => {
        router.push(page)
    }
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
                                    sidebarOptions.map(({highlighted,unhighlighted,path},index) => (
                                        <Image src={path == router.pathname ? highlighted : unhighlighted} onClick={()=>toggleSidebar(path)} className={style.documentIcon} key={index}/>
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
                                    sidebarOptions.map(({title,path,highlighted,unhighlighted}, i) =>(
                                        <div 
                                            className={style.option}
                                            key={title}
                                            onClick={
                                                () => handleClickRedirect(path)
                                            }
                                        >   
                                            <Image src={router?.pathname == path? highlighted :unhighlighted} className={style.iconImg}/>
                                            <span className={router?.pathname == path ?style.highlightedTitle : style.sidebarTitle}>{title}</span>
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