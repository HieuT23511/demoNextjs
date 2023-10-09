import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accountInfo: {
        name: "",
        email: "",
        addresses: [
            {
                address: "",
                city: ""
            },
        ]
    }
};

const addressReducer = createSlice({
    name: "data",
    initialState,
    reducers: {
        updateDataAccount: (state, action) => {
            state.accountInfo = action.payload
        }
    }
})

export const { updateDataAccount } = addressReducer.actions;
export default addressReducer.reducer;