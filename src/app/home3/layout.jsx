import React from 'react';
import Header3 from '../Components/Header/Header3';
import Footer1 from '../Components/Footer/Footer1';

const layout = ({ children }) => {
    return (
        <div className='main-page-area3 bg-color2'>
           <Header3></Header3>
            {children}
            <Footer1></Footer1>
        </div>
    );
};

export default layout;