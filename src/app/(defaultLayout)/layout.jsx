import React from 'react';
import Header1 from '../Components/Header/Header1';
import Footer1 from '../Components/Footer/Footer1';
import Providers from '../Components/Providers/Providers';
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop';

const DefalultLayout = ({ children }) => {
    return (
        <Providers>
            <div className='main-page-area bg-color2'>
                    <Header1></Header1>
                    {children}
                    <Footer1></Footer1>
                    <ScrollToTop />
            </div>
        </Providers>
       
    );
};

export default DefalultLayout;