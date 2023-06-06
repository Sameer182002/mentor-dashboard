import style from './sidebar.module.css'
import { Header } from '../../molecules'
import DescriptionIcon from '@mui/icons-material/Description';
import { Fragment, useState } from 'react';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { sidebarOptions } from '../../../utils/constants';
import { useRouter } from 'next/router';

export function Sidebar({children}) {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
      setExpanded(!expanded);
    };
    const handleClickRedirect = (page) => {
        router.push(page)
    }

    return (
        <div className={style.sidebar}>
            <Header/>
            <div className={style.container}>
                <div className={`${style.leftSec} ${ expanded && style.expandedLeftSec}`}>
                   {    
                        !expanded && 
                        <div className={style.iconHolder}>
                            <DescriptionIcon 
                                className={style.documentIcon}
                                onClick={toggleSidebar}
                            />
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
                                    sidebarOptions.map(({title,path}, i) =>(
                                        <div 
                                            className={style.option}
                                            key={title}
                                            onClick={
                                                () => handleClickRedirect(path)
                                            }
                                        >
                                            <DescriptionIcon/>
                                            <span>Unchecked Questions</span>
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
    )
}