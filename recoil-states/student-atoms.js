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
    effects: [syncleadMobileNumberAtom('userMobileNumber')]
});

const syncleadUserIdAtom = key => ({ setSelf, trigger, onSet }) => {
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
export const userIdAtom = atom({
    key: 'userId',
    default: '',
    effects:[syncleadUserIdAtom('userId')]
  });
