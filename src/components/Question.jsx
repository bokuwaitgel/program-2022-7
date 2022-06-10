import React from 'react';
import { Checkbox } from './QuestionType/Checkbox';

export const Question = (props) => {
  const { data, onChange, res } = props;
  return (
    <div className="mt-8">
      {data.events.map((it, idx) => {
        {
          return (
            <Checkbox
              key={idx}
              onChange={onChange}
              text={it}
              value={idx}
              data={res}
              lim={data.events.length}
            />
          );
        }
      })}
    </div>
  );
};
