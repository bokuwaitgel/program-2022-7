import React, { useEffect, useState } from 'react';
import { Head } from '../components/Head';
import { Footer } from '../components/Footer';
import { Right } from '../components/sideabars/Right';
import { Left } from '../components/sideabars/Left';
import { Question } from '../components/Question';
import background from '../assets/background.png';
import backgroundLast from '../assets/backgroundLast.png';
import tourLogo from '../assets/tourLogo.png';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import clsx from 'clsx';
import { SendlyButtonSmall } from '../components/Button';
import { Link } from 'react-router-dom';
import { FetchQuestionType, saveResult } from '../api/questionApi';
import { FetchQuestions } from '../api/questionApi';
import { toast } from 'react-toastify';

export const Survey = () => {
  const [survey, setSurvey] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const { isMyMd, isLg } = useWindowDimensions();
  const [qData, setQData] = useState([]);
  const [pages, setPages] = useState(3);
  const [currentPage, setCurrentPage] = useState(2);
  const [resData, setResData] = useState([]);
  const [ans, setAns] = useState({});
  const [canNext, setCanNext] = useState(false);
  useEffect(() => {
    setPages(Math.floor((qData.length + 9) / 10) + 3);
  }, [qData]);
  useEffect(() => {
    if (survey?.length === 0)
      FetchQuestionType().then((res) => {
        if (res?.code === 1) {
          setSurvey(res?.surveys || []);
        } else {
          toast.error('Санал асуулга татхад алдаа гарлаа');
        }
      });
  }, []);
  function downloadQuestions(surveyId) {
    if (surveyId && selectedSurvey !== surveyId) {
      setSelectedSurvey(surveyId);
      FetchQuestions(surveyId).then((res) => {
        setCanNext(false);
        if (res?.code === 1) {
          setQData(res?.questions || []);
        } else {
          toast.error('Санал асуулга татхад алдаа гарлаа');
        }
      });
    }
  }
  function setRes(res, questionId, text = null) {
    let temp = resData[currentPage].find((t) => t.questionId === questionId) ?? {};
    if (res[questionId].length > 0) {
      temp.answered = true;
      temp.text = text;
      temp.res = res[questionId];
    } else {
      temp.answered = false;
      temp.text = null;
      temp.res = res[questionId];
    }
    let hasError = false;
    resData[currentPage].forEach((p) => {
      if (p.required === '1' && !p?.answered) {
        p.error = true;
        hasError = true;
      } else {
        p.error = false;
      }
    });
    setCanNext(!hasError);
    setAns(res);
  }
  useEffect(() => {
    let temp = [];
    temp[2] = [
      {
        question:
          'Та энэхүү асуулгад хөрөнгө оруулагч уу эсхүл эх үүсвэр татах зорилготой бизнес эрхлэгч үү?',
        imageUrl: null,
        type: 'radio',
        hasLabel: '0',
        required: '1',
        questionId: 'sur',
        answers: [
          {
            name: 'Хөрөнгө оруулагч',
            answerId: '1'
          },
          {
            name: 'Бизнес эрхлэгч',
            answerId: '2'
          }
        ]
      }
    ];
    for (let i = 3; i < pages; i++) {
      temp[i] = qData.slice((i - 3) * 10, (i - 2) * 10);
    }
    if (qData.length % 10) {
      temp[pages] = qData.slice((qData.length - 1) * 10, 10);
    }
    setResData(temp);
  }, [pages]);
  function changePage(page) {
    if (currentPage > 2 && page === 2) {
      return;
    }
    if (currentPage === 2) {
      let tempRes = resData[currentPage][0]?.res || [];
      if (tempRes.includes('1')) {
        let tSurvey = survey.find((s) => s.name === 'Хөрөнгө оруулагч');
        downloadQuestions(tSurvey?.surveyId);
      } else if (tempRes.includes('2')) {
        let tSurvey = survey.find((s) => s.name === 'Бизнес эрхлэгч');
        downloadQuestions(tSurvey?.surveyId);
      }
    }
    let hasError = false;
    resData[page]?.forEach((p) => {
      if (p.required === '1' && !p?.answered) {
        p.error = true;
        hasError = true;
      } else {
        p.error = false;
      }
    });
    if (currentPage !== 2 && currentPage === pages - 1 && currentPage < page) {
      let saveData = {};
      let temp = [];
      resData.map((d, index) => {
        if (index !== 2 && index !== pages) {
          d.forEach((q) => {
            let tempAnswers = [];
            q?.res?.forEach((a) => {
              tempAnswers.push({ answerId: a });
            });
            if (q.text) {
              tempAnswers[tempAnswers.length - 1].text = q.text;
            }
            temp.push({ questionId: q?.questionId, answers: tempAnswers });
          });
        }
      });

      saveData = { surveyId: selectedSurvey, results: temp };
      saveResult(saveData).then((a) => {
        if (a?.code === 1) {
          toast('Санал асуулга амжилттай');
        } else {
          toast.error('Санал асуулга амжилтгүй');
        }
      });
    }
    setCurrentPage(page);
    setCanNext(!hasError);
  }
  return (
    <div className="flex flex-col min-h-screen justify-between	">
      <Head title="Sendly survey" description="survey" />
      {currentPage !== pages && currentPage !== 2 ? (
        <div className="absolute z-[-1]">
          <img src={background} alt="" className="form-background" />
        </div>
      ) : currentPage === pages ? (
        <div className="z-[-1] absolute tour-wrapper w-screen h-screen flex items-center justify-start overflow-hidden">
          <img src={backgroundLast} alt="" className="last-background w-full h-full " />
        </div>
      ) : (
        <div className="absolute z-[-1]">
          <img src={background} alt="" className="form-background" />
        </div>
      )}
      <div
        className={clsx(
          'pl-6 pr-6 grid grid-flow-row gap-4 place-content-center place-items-stretch grid-cols-12',
          isMyMd ? 'pt-2' : 'pt-20'
        )}>
        {isMyMd ? null : (
          <div className="col-span-3">
            <img src={tourLogo} alt="" className="self-center mt-10 ml-10" />
            <Left page_cnt={pages} page_num={currentPage} onChange={setCurrentPage} />
          </div>
        )}
        <div
          className={clsx(
            '-mt-20 pt-20  col-span-12 lg:col-span-6',
            currentPage === 2 ? 'max-h-screen' : 'min-h-screen'
          )}>
          {isMyMd ? <img src={tourLogo} alt="" className="self-center mb-20" /> : null}
          {currentPage === pages ? (
            <div
              className={clsx(
                'h-full flex text-center items-center justify-center',
                isMyMd ? '-mt-40' : ''
              )}>
              <div
                className={clsx(
                  'font-man OCcolor text-center',
                  isMyMd ? 'font-title-l' : 'font-headline-l'
                )}>
                Таны хариулт амжилттай илгээгдлээ.{isMyMd ? '' : <br />} Асуулгад хамрагдсан таньд
                баярлалаа.
                {isMyMd ? (
                  <div className={clsx('mt-4 flex items-center justify-center')}>
                    <Link to={`/`}>
                      <SendlyButtonSmall item={{ name: 'Асуулга ахин өгөх' }} />
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <form className="">
              {currentPage === 2 ? (
                <Question
                  data={{
                    question:
                      'Та энэхүү асуулгад хөрөнгө оруулагч уу эсхүл эх үүсвэр татах зорилготой бизнес эрхлэгч үү?',
                    imageUrl: null,
                    type: 'radio',
                    hasLabel: '0',
                    required: '1',
                    questionId: 'sur',
                    answers: [
                      {
                        name: 'Хөрөнгө оруулагч',
                        answerId: '1'
                      },
                      {
                        name: 'Бизнес эрхлэгч',
                        answerId: '2'
                      }
                    ]
                  }}
                  ans={ans}
                  setAns={setRes}
                />
              ) : qData ? (
                <>
                  {ans['sur'] !== undefined && currentPage === 3 ? (
                    ans['sur'].includes('1') ? (
                      <div className="mb-2 text-[#2455E4] font-title-l underline">
                        Хөрөнгө оруулагч
                      </div>
                    ) : (
                      <div className="mb-2 text-[#2455E4] font-title-l underline">
                        Бизнес эрхлэгч
                      </div>
                    )
                  ) : null}
                  {qData.map(
                    (data, idx) =>
                      currentPage > 2 &&
                      idx >= (currentPage - 3) * 10 &&
                      idx < (currentPage - 3) * 10 + 10 && (
                        <Question
                          key={idx}
                          data={data}
                          id={idx + 1}
                          ans={ans}
                          setAns={setRes}
                          resData={resData}
                        />
                      )
                  )}
                </>
              ) : null}
            </form>
          )}
        </div>
        {isMyMd && currentPage === pages ? null : (
          <div className="col-span-12 lg:col-span-3">
            {currentPage === pages ? (
              <div className={clsx('mt-4 flex items-center justify-center')}>
                <Link to={`/`}>
                  {!isMyMd && isLg ? (
                    <SendlyButtonSmall item={{ name: 'Ахин өгөх' }} />
                  ) : (
                    <SendlyButtonSmall item={{ name: 'Асуулга ахин өгөх' }} />
                  )}
                </Link>
              </div>
            ) : (
              <Right
                canNext={canNext}
                value={currentPage}
                pages={pages}
                onChange={changePage}
                resData={resData}
              />
            )}
          </div>
        )}
      </div>
      <div className={'justify-self-end'}>
        {(currentPage !== pages && currentPage !== 2) || isMyMd ? (
          <Footer className="" />
        ) : (
          <Footer className="-mt-24" />
        )}
      </div>
    </div>
  );
};
