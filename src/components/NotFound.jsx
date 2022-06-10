import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { useWindowDimensions } from '../hooks/useWindowDimensions';

export const NotFound = () => {
  const navigate = useNavigate();
  const { isSm, isMyMd } = useWindowDimensions();
  return (
    <div
      className={clsx(
        'h-screen w-screen center flex h-full w-full justify-items-center',
        isSm ? ' p-4' : ''
      )}>
      <div
        className={clsx(
          'w-screen block flex h-full flex-col items-center justify-center',
          isSm ? 'w-full' : isMyMd ? 'w-1/2' : 'w-1/3'
        )}>
        <p className={'font-display-s pb-4 text-secondary-high'}>Хуудас олдсонгүй</p>
        <p className={'font-body-m pb-10 text-center text-secondary-medium'}>
          Таны хайж буй хуудас олдсонгүй. Уг хуудас нь устсан, нэр нь өөрчлөгдсөн эсвэл анхнаасаа
          байгаагүй байж болзошгүй.
        </p>
        <button onClick={() => navigate('/')} className="bordered-button px-6 py-2">
          <p className={'font-label-l'}>Буцах</p>
        </button>
      </div>
    </div>
  );
};
