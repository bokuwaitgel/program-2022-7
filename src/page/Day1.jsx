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
  Day: '2022.07.01',
  events: [
    '09:00–11:30 Дурсамж хичээл /Эрдмийн гэгээ сургууль Л.Батчулуун багш/',
    '11:30-12:30 Дурсгалын зураг авхуулах / Гэрэл зургийн студи/',
    '12:30-13:30 Нээлтийн үйл ажиллагаа /Даян хааны талбайд холбооны хөтөлбөрөөр/',
    '13:30-15:00 Үдийн зоог / Хан-Уул ресторан /',
    '15:00-16:30 Даланзадгад хотын бүтээн байгуулалттай танилцах / Холбооны хөтөлбөрөөр /',
    '16:30-17:30 Чөлөөт цаг',
    '17:30-18:00 Ажнай талбайд цуглах',
    '18:00-20:00 Хүндэтгэлийн зоог / Баян бүрд жуулчны бааз, холбооны хөтөлбөрөөр/ хувцасны код-цагаан',
    '20:00-22:00 Задгай талбайн шоу арга хэмжээ / Баянбүрд жуулчны бааз, холбооны хөтөлбөрөөр/',
    '22:00 Хаалт'
  ],
  page: 1
};

export const Day1 = () => {
  const { isMyMd } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(1);
  const [res, setRes] = useState([0]);
  const pages = 3;
  return (
    <div className="flex flex-col min-h-screen justify-between	">
      <Head title="Day 1" description="plan" />
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
          className="
            -mt-20 pt-20  col-span-12 lg:col-span-6 min-h-screen
          ">
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
