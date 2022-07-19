import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_KEY = 'AIzaSyAp9JTE3Aj8j3lof8_BlkAEvw5emtL65jY';
const URL =
  'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&type=video&';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const navigate = useNavigate()

export const searchVideo = createAsyncThunk('searchVideo/searchSlice', async ({e,value}) => {
  e.preventDefault();
  const res = await axios.get(URL + `q=${value}&key=${API_KEY}`);
  localStorage.setItem('searchReq', value);
  return res.data.items
});

export const getReq = createAsyncThunk('getReq/searchSlice', async ({e,id}) => {
  e.stopPropagation();
  const item = JSON.parse(localStorage.getItem('likes')).find((item) => item.id === id)
  const res = await axios.get(
    URL + `order=${item.sort}&maxResults=${item.maxResults}&q=${item.value}&key=${API_KEY}`,
  );
  localStorage.setItem('searchReq', item.value);
  navigate('/');
  return [res.data.items, item.value];
});

const initialState = {
  value: '',
  response: [],
  isModalVisible: false,
  liked: false,
  sliderValue: 25,
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
      state.sliderValue = action.payload;
    },
  },
  extraReducers: {
    [searchVideo.fulfilled]: (state, { payload }) => {
      state.response = payload;
    },
    [getReq.fulfilled]: (state, [res, value]) => {
      state.response = res;
      state.value = value;
    }
  },
});

export const {
  setValue,
  setResponse,
  setIsModalVisible,
  setLiked,
  setSliderValue,
  setViewCount,
} = searchSlice.actions;

export default searchSlice.reducer;
