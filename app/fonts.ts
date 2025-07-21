import localFont from 'next/font/local';

// Single font family containing all weights and styles of CircularStd
export const circularStd = localFont({
  src: [
    {
      path: '../public/fonts/CircularStd-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/CircularStd-Light Italic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/CircularStd-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/CircularStd-BookItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/CircularStd-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/CircularStd-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/CircularStd-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/CircularStd-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/CircularStd-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/CircularStd-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-circular',
  display: 'swap',
});
