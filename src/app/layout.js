import { Epilogue, Roboto } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "slick-carousel/slick/slick.css";
import "./assets/main.css";

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--body-color-font',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--heading-font',
});

export const metadata = {
  title: {
    absolute: '',
    default: 'US BEST',
    template: '%s | US BEST',
  },
  description: 'US BEST',
  openGraph: {
    title: 'US BEST',
    description: 'US BEST',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Themeservices" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="any" />
      </head>
      <body className={`${epilogue.variable} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
