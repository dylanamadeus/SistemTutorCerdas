import React from 'react';

const ResponsiveWaveDivider: React.FC = () => {
  return (
    <div className='w-full overflow-hidden'>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 1453 1344'
        preserveAspectRatio='xMidYMid slice'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='w-full'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M0 144L39.9575 138C81.1258 132 161.041 120 242.167 102C323.292 84 403.207 60 484.333 72C565.459 84 645.374 132 726.5 138C807.626 144 887.541 108 968.667 78C1049.79 48 1129.71 24 1210.83 12C1291.96 0 1371.87 0 1413.04 0H1453V288H1413.04C1371.87 288 1291.96 288 1210.83 288C1129.71 288 1049.79 288 968.667 288C887.541 288 807.626 288 726.5 288C645.374 288 565.459 288 484.333 288C403.207 288 323.292 288 242.167 288C161.041 288 81.1258 288 39.9575 288H0V144Z'
          fill='url(#paint0_linear_340_98)'
        />
        <rect
          x='-9'
          y='280'
          width='1473'
          height='1064'
          fill='url(#paint1_linear_340_98)'
        />
        <defs>
          <linearGradient
            id='paint0_linear_340_98'
            x1='1.5104'
            y1='2396.5'
            x2='1438.33'
            y2='-8.76579'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#C0E6FF' />
            <stop offset='1' stopColor='#00558F' />
          </linearGradient>
          <linearGradient
            id='paint1_linear_340_98'
            x1='1464'
            y1='136.121'
            x2='1016.29'
            y2='1647.68'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#00558F' />
            <stop offset='1' stopColor='#C0E6FF' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ResponsiveWaveDivider;
