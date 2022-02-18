import { useState, useEffect, useCallback } from 'react';
import { Range, getTrackBackground } from 'react-range';
import debounce from 'lodash.debounce';

const STEP = 1;
const MIN = 0;
const MAX = 100;

const RangeSlider = (props) => {
  const [values, setValues] = useState([0, 100]);

  const debounceRange = useCallback(debounce((value) => props.onRange(value), 500), [])

  useEffect(() => {
    debounceRange(values);
  }, [values])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '30px 20px 10px'
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', 'teal', '#ccc'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '25px',
              width: '25px',
              borderRadius: '25px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-32px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: 'teal'
              }}
            >
              {values[index]}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default RangeSlider;
