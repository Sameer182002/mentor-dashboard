import {atom} from 'recoil'

const syncQuestionToBeCheckedAtom = key => ({ setSelf, trigger, onSet }) => {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (trigger === "get") {
        setSelf(savedValue); 
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
};
export const questionToBeCheckedAtom = atom({
    key: 'questionToBeChecked',
    default: {},
    effects:[syncQuestionToBeCheckedAtom('questionToBeChecked')]
});