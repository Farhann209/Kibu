'use client'
import BenefitsDiv from '@/components/directBenefits/page'; // Importing the BenefitsDiv component for direct benefits section
import CustomNavBar from '@/components/userNavBar/page'; // Importing the CustomNavBar component for navigation bar
import React from 'react'; // Importing React

const Page = () => {
  return (
    <div>
        {/* Rendering the custom navigation bar at the top of the page */}
        <div>
            <CustomNavBar/>
        </div>

        {/* Rendering the benefits section below the navigation bar */}
        <div>
            <BenefitsDiv/>
        </div>
    </div>
  );
};

export default Page;
