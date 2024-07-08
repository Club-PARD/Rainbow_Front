import { atom } from 'recoil';

export const UserID = atom({
    key: 'UserID',
    default: "b768ff18-2c55-4ea7-a7ba-34352ac16a7f",
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
