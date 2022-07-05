const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    value:'',
    response:[]
}

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setValue(state,action) {
            state.value = action.payload
        },
        setResponse(state,action) {
            state.response = action.payload
        }
        }
    }
)

export const {setValue, setResponse} = searchSlice.actions

export default searchSlice.reducer