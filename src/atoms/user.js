import {atom} from "recoil";

export const userData = atom({
    key: 'users',
    default: {
        user: {
            name: "Gugu Pari",
            email: "gugu@gmail.com",
            livesIn: "Canada"
        }
    }
})
