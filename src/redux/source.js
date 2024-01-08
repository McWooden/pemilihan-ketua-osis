import { createSlice } from "@reduxjs/toolkit";

const source = createSlice({
    name: "source",
    initialState: {
        account: null,
        users: null,
        admins: null,
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action?.payload || null
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