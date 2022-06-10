import React from 'react';
import rightArrow from '../../assets/arrow-right.svg';
import leftArrow from '../../assets/arrow-left.svg';
import { Link } from 'react-router-dom';
export const Right = (props) => {
  const { value } = props || {};
  return (
    <>
      <div className=" mt-10 flex place-content-center lg:place-content-start">
        <Link to={value === 1 ? '/day3' : value === 2 ? '/' : '/day2'}>
          <button className="arrow-cont center" onClick={() => {}}>
            <img src={leftArrow} className="w-8" />
          </button>
        </Link>
        <Link to={value === 1 ? '/day2' : value === 2 ? '/day3' : '/'}>
          <div className="button-next center hover:bg-[#1A65EF] bg-[#9CA5B0]" onClick={() => {}}>
            Дараагийн хуудас
            <img src={rightArrow} className="w-8" />
          </div>
        </Link>
      </div>
    </>
  );
};
