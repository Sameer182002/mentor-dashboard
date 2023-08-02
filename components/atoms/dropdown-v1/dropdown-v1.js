import styles from './dropdown-v1.module.css'
import dropDownIcon from "../../../public/svgs/drop-down.svg"
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from 'react';
import { TA_AVAILABILITY_STATUS } from '../../../utils/constants';

export function DropdownV1({handleDropdownChange, availability, isDisabled}) {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isActive &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };
  
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive]);

  function handleDropdown(){
    if(isDisabled){
      return
    }
    setIsActive(true);
  }
  return (
    <Fragment>
      <div className={styles.dropdown}>
        <div
          onClick={handleDropdown}
          className={styles.dropdownBtn}
        >
          <p>{availability}</p>
          <Image src={dropDownIcon} />
        </div>
        </div>
        <div
          className={styles.dropdownContent}
          style={{ display: isActive ? "block" : "none" }}
          ref={dropdownRef}
        >
          <p
            onClick={(e) => {
              handleDropdownChange(e.target.textContent);
              setIsActive(!isActive);
            }}
            className={styles.item}
          >
            {TA_AVAILABILITY_STATUS.unavailable}
          </p>
          <p
            className={styles.item}
            onClick={(e) => {
              handleDropdownChange(e.target.textContent);
              setIsActive(!isActive);
            }}
          >
            {TA_AVAILABILITY_STATUS.available}
          </p>
        </div>
    </Fragment>
  );
}
