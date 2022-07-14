const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  value: '',
  response: [],
  isModalVisible: false,
  liked: false,
  sliderValue:25,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue(state, action) {
      state.value = action.payload;
    },
    setResponse(state, action) {
      state.response = action.payload;
    },
    setIsModalVisible(state) {
      state.isModalVisible = !state.isModalVisible;
    },
    setLiked(state, action) {
      state.liked = action.payload;
    },
    setSliderValue(state, action) {
      state.sliderValue = action.payload
    }
  },
});

export const { setValue, setResponse, setIsModalVisible, setLiked, setSliderValue } = searchSlice.actions;

export default searchSlice.reducer;
