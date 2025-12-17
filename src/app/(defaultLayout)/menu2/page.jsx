import BestSelling4 from '@/app/Components/BestSelling/BestSelling4';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import CtaBanner1 from '@/app/Components/CtaBanner/CtaBanner1';
import Testimonial2 from '@/app/Components/Testimonial/Testimonial2';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/breadcumb.jpg"
        Title="Our Menu"
        pageKey="Menu"
      ></BreadCumb>
      {/* <BestSelling4></BestSelling4> */}
      <Suspense fallback={<div>Loading...</div>}>
        <BestSelling4 />
      </Suspense>
      <CtaBanner1></CtaBanner1>
      {/* <Testimonial2></Testimonial2> */}
    </div>
  );
};

export default page;