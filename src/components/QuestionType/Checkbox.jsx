import React from 'react';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import clsx from 'clsx';

export const Checkbox = (props) => {
  const { isSm } = useWindowDimensions();
  const { onChange, text, value, data } = props || {};
  return (
    <>
      <div
        className={clsx(
          'radio-cont-sm',
          data !== undefined && data.includes(value) && 'selected-radio-cont',
          isSm ? 'radio-cont-sm' : 'radio-cont w-11/12'
        )}
        onClick={() => {
          if (data === undefined) {
            onChange([...data, value]);
          } else {
            if (data.includes(value)) {
              onChange(data.filter((item) => item !== value));
            } else {
              onChange([...data, value]);
            }
          }
        }}>
        <div
          className={clsx(
            isSm ? 'radio-outer-circle-sm' : 'radio-outer-circle',
            data !== undefined ? (!data.includes(value) ? 'unselected' : null) : 'unselected'
          )}>
          <div
            className={`radio-inner-circle ${
              data !== undefined
                ? data.includes(value)
                  ? null
                  : 'unselected-circle'
                : 'unselected-circle'
            }`}
          />
        </div>
        <div
          className={`font-man font-label-m md:font-label-l  ${
            data === undefined
              ? 'text-[#646E7B]'
              : !data.includes(value)
              ? 'text-[#646E7B]'
              : 'text-white'
          }`}>
          {text}
        </div>
      </div>
    </>
  );
};
