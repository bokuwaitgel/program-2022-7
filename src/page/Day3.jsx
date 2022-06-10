import React, { useState } from 'react';
import { Head } from '../components/Head';
import { Right } from '../components/sideabars/Right';
import { Left } from '../components/sideabars/Left';
import background from '../assets/background.png';
import tourLogo from '../assets/tourLogo.png';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

import { Question } from '../components/Question';
import clsx from 'clsx';

const Data = {
  Day: '2022.07.03',
  events: [
    '08:00-09:00 Өглөөний цай',
    '09:00-09:30 Буудлаа хүлээлгэж өгөх',
    ' 09:30 Ёлын амруу хөдлөх',
    '10:30-13:00 Явган аялал /Байгалийн үзэсгэлэнт ёлын аманд/',
    '13:00-15:00 Үдийн зоог (хээрийн хоол)',
    '15:00 Даланзадгад руу хөдлөх',
    '17:30 Үдэлт'
  ],
  page: 3
};

export const Day3 = () => {
  const { isMyMd } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(1);
  const [res, setRes] = useState([0]);
  const pages = 3;
  return (
    <div className="flex flex-col min-h-screen justify-between	">
      <Head title="Day 3" description="plan" />
      <div className="absolute z-[-1]">
        <img src={background} alt="" className="form-background" />
      </div>

      <div
        className={clsx(
          'pl-6 pr-6 grid grid-flow-row gap-4 place-content-center place-items-stretch grid-cols-12',
          isMyMd ? 'pt-2' : 'pt-20'
        )}>
        {isMyMd ? null : (
          <div className="col-span-3">
            <img src={tourLogo} alt="" className="self-center mt-10 ml-10" />
            <Left page_cnt={pages} page_num={Data.page} />
          </div>
        )}
        <div
          className={clsx(
            '-mt-20 pt-20  col-span-12 lg:col-span-6',
            currentPage === 2 ? 'max-h-screen' : 'min-h-screen'
          )}>
          {isMyMd ? <img src={tourLogo} alt="" className="self-center mb-20" /> : null}

          <div className="">
            <div className="mb-2 text-[#2455E4] font-title-l underline">{Data.Day}</div>
            <Question data={Data} onChange={setRes} res={res} />
          </div>
        </div>
        {isMyMd && currentPage === pages ? null : (
          <div className="col-span-12 lg:col-span-3">
            <Right value={Data.page} pages={pages} onChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  );
};
