'use client'
import BenefitsDiv from '@/components/directBenefits/page';
import CustomNavBar from '@/components/userNavBar/page';
import React from 'react';

const Page = () => {
  return (
    <div>
        <div>
            <CustomNavBar/>
        </div>
        <div>
            <BenefitsDiv/>
        </div>
    </div>
  );
};

export default Page;
