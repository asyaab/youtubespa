import { Col, InputNumber, Row, Slider } from 'antd';
import { setSliderValue } from '../../redux/searchSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const IntegerStep = () => {

  const dispatch = useDispatch()
  const {sliderValue} = useSelector(state => state.searchReducer)

  const onChange = (newValue) => {
    dispatch(setSliderValue(newValue));
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          defaultValue={25}
          min={0}
          max={50}
          onChange={onChange}
          value={sliderValue}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={50}
          style={{
            margin: '0 16px',
          }}
          value={sliderValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
