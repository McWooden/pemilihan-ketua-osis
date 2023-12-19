import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../utils";

const source = createSlice({
    name: "source",
    initialState: {
        account: getLocalStorage("account") || {},
        users: null,
        admins: null,
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action?.payload || getLocalStorage("account")
        },
        setUsers: (state, action) => {
            state.users = action?.payload || null;
        },
        setAdmins: (state, action) => {
            state.admins = action?.payload || null;
        },
    },
});
export const { setAccount, setUsers, setAdmins } = source.actions
export default source.reducer