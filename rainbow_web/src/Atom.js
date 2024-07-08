import { atom } from 'recoil';

export const UserData = atom({
    key: 'UserData',
    default: {
        UserID : "",
        UserEmail : ""
    },
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