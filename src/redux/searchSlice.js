import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

//initial State
const initialState = {
  value: '',
  data:{},
  response: [],
  isModalVisible: false,
  liked: false,
  sliderValue: 25,
  pageToken:''
};


//Constans
const API_KEY = 'AIzaSyAp9JTE3Aj8j3lof8_BlkAEvw5emtL65jY';
const URL =
  'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video';
const nextURL =
  'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&type=video';
  

//Async redux
export const searchVideo = createAsyncThunk('searchVideo/searchSlice', async ({ e, value }) => {
  e.preventDefault();
  const res = await axios.get(URL + `&maxResults=12&q=${value}&key=${API_KEY}`);
  localStorage.setItem('searchReq', value);
  return res.data;
});

export const getReq = createAsyncThunk('getReq/searchSlice', async ({ e, id }) => {
  e.stopPropagation();
  const item = JSON.parse(localStorage.getItem('likes')).find((item) => item.id === id);
  const res = await axios.get(
    URL + `order=${item.sort}&maxResults=${item.maxResults}&q=${item.value}&key=${API_KEY}`,
  );
  localStorage.setItem('searchReq', item.value);
  return res.data;
});

export const searchNextVideo = createAsyncThunk('searchNextVideo/searchSlice', async ({data,value,pageToken}) => {
  const res = await axios.get(URL + `&pageToken=${pageToken}&maxResults=12&q=${value}&key=${API_KEY}`);
  localStorage.setItem('searchReq', value);
  return res.data;
});
//--------------------------//

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
    setPageToken(state, {payload}) {
      state.pageToken = payload
    }
  },
  extraReducers: {
    [searchVideo.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.response = payload.items;
    },
    [searchNextVideo.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.response = payload.items;
    },
    [searchVideo.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.response = payload.items;
    },
    [searchNextVideo.fulfilled]: (state, { payload }) => {
      state.response = payload.items;
    },
    [getReq.fulfilled]: (state, { payload }) => {
      state.response = payload.items;
    },
  },
});

export const {
  setValue,
  setResponse,
  setIsModalVisible,
  setLiked,
  setSliderValue,
  setViewCount,
  setPageToken
} = searchSlice.actions;

export default searchSlice.reducer;
