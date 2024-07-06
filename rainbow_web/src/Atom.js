import { atom } from 'recoil';

export const UserID = atom({
    key: 'UserID',
    default: 'd7a8da65-18da-4827-acdc-b6bb99347e99',
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