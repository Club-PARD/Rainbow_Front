import { atom } from 'recoil';

export const UserID = atom({
    key: 'UserID',
    default: '',
});

export const LoginState = atom({
    key: 'LoginState',
    default: false,
    // effects_UNSTABLE: [persistAtom],
});

export const PostCount = atom({
    key: 'PostCount',
    default: 0,
});