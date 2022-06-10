import React, { useState } from 'react';
import { Head } from '../components/Head';
import { Right } from '../components/sideabars/Right';
import { Left } from '../components/sideabars/Left';
import background from '../assets/background.png';
import tourLogo from '../assets/tourLogo.png';
import { Question } from '../components/Question';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import clsx from 'clsx';

const Data = {
  Day: '2022.07.02',
  events: [
    '08:30-09:00 Ажнай талбай дээр цуглах',
    '09:00 “Говь мирраж” жуулчны баазруу хөдлөх /Аймгийн төвөөс 80 км/',
    '11:30-12:00 “ Говь мирраж” жуулчны Баазад байрлах',
    '12:00-13:00  Үдийн зоог',
    '13:00-18:00 “Дурсамж дүүрэн хүүхэд нас” дурсамж яриа /Зохион байгуулах комиссийн хөтөлбөрөөр/',
    '18:00-19:00 Оройн зоог',
    '19:00-21:00 Спортын уралдаан тэмцээн ',
    '21:00-23:00 Дурсамж дүүрэн хүүхэд нас дурсамж яриа үргэлжлэл'
  ],
  page: 2
};

export const Day2 = () => {
  const { isMyMd } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(1);
  const [res, setRes] = useState([0]);
  const pages = 3;
  return (
    <div className="flex flex-col min-h-screen justify-between	">
      <Head title="Day 2" description="plan" />
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
