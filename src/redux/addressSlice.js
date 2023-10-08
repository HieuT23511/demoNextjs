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

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        updateAdress: (state, action) => {
            state.accountInfo = action.payload
        }
    }
})

export const { updateAdress } = addressSlice.actions;
export default addressSlice.reducer;