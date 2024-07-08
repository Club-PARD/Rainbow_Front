import { atom } from 'recoil';

export const UserID = atom({
    key: 'UserID',
    default: "ca183e8f-580e-43ac-b827-d47a1d1d62fe",
});

export const UserEmail = atom({
    key: 'UserEmail',
    default: '',
})

export const LoginState = atom({
    key: 'LoginState',
    default: false,
    // effects_UNSTABLE: [persistAtom],
});

export const PostCount = atom({
    key: 'PostCount',
    default: 0,
});
