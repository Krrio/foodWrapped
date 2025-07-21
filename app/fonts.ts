import localFont from 'next/font/local';

export const circularStd = localFont({
  src: [
    {
      path: '../public/fonts/circular-std-2.ttf',
      weight: '400',
    },
    {
      path: '../public/fonts/circular-std-4.ttf',
      weight: '700',
    },
  ],
  variable: '--font-circular',
});
