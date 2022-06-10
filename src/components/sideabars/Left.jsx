import React from 'react';
import { Link } from 'react-router-dom';

export const Left = (props) => {
  const { page_cnt, page_num } = props || {};
  const items = new Array(page_cnt).fill(null);
  return (
    <div className="left-fixed">
      <div className="flex-col">
        {items?.map((_, idx) => (
          <div key={idx} className="flex pt-2 pb-2">
            <Link to={idx === 0 ? '/' : idx === 1 ? '/day2' : '/day3'}>
              <button className=" block" onClick={() => {}}>
                {idx + 1 === page_num ? <div className="ellipse-s" /> : <div className="ellipse" />}
              </button>
            </Link>
            {idx + 1 === page_num ? (
              <div className="OCcolor normals ml-4">
                {page_num} - {page_cnt}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
