import localFont from 'next/font/local';

export const circularRegular = localFont({
  src: '../public/fonts/circular-std-2.ttf',
  weight: '400',
  variable: '--font-circular-regular',
});

export const circularBold = localFont({
  src: '../public/fonts/circular-std-4.ttf',
  weight: '700',
  variable: '--font-circular-bold',
});

// Combined variable for convenience when applying both font weights globally
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
