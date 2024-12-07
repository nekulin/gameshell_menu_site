// react-dependencies

// Components
import Header from '@/components/widgets/header/Header';

// Styles
import { inter } from './globalStyles/fonts';
import { raleway } from './globalStyles/fonts';
import './globalStyles/global.css';


export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${raleway.variable}`}>
      <body>
        <div className="wrapper">

          <Header/>
          {children}

        </div>
      </body>
    </html>
  );
}
