import {atom} from 'recoil'


const syncleadMobileNumberAtom = key => ({ setSelf, trigger, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (trigger === "get") {
        setSelf(savedValue); 
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, newValue);
    });
};
export const mobileNumberAtom = atom({
    key: 'mobileNumber',
    default: '',
    effects: [syncleadMobileNumberAtom('mobileNumber')]
});

const synctaUserIdAtom = key => ({ setSelf, trigger, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (trigger === "get") {
        setSelf(savedValue); 
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, newValue);
    });
};
export const taIdAtom = atom({
    key: 'taTd',
    default: '',
    effects:[synctaUserIdAtom('taId')]
  });
