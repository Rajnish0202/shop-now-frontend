import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import CompareCard from '../components/CompareCard';
import MetaData from '../utils/MetaData';

const Compare = () => {
  return (
    <>
      <MetaData title='Compare Products' />
      <BreadCrumb title='Compare Products' />
      <div className='compare-product-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <CompareCard />
            <CompareCard />
            <CompareCard />
            <CompareCard />
            <CompareCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;
