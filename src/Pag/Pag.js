import { Pagination } from 'antd';
import { searchNextVideo, setPageToken } from '../redux/searchSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Pag = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { data, value, pageToken } = useSelector((state) => state.searchReducer);

  console.log(pageToken);

  const onChange = (page) => {
    setCurrentPage(page);
    dispatch(searchNextVideo({ data, value, pageToken }));
  };


  const itemRender = (_, type) => {
    if (type === 'prev') {
      dispatch(setPageToken(data.prevPageToken))
    }

    if (type === 'next') {
      dispatch(setPageToken(data.nextPageToken))
    }
  };


  return (
    <Pagination
      current={currentPage}
      defaultPageSize={12}
      showSizeChanger={false}
      itemRender={itemRender}
      onChange={(page) => onChange(page)}
      total={data.pageInfo.totalResults}
    />
  );
};
