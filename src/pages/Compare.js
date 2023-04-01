import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import CompareCard from '../components/CompareCard';
import MetaData from '../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemsFromCompare } from '../redux/actions/compareAction';
import { toast } from 'react-toastify';

const Compare = () => {
  const { compareItems } = useSelector((state) => state.compareProducts);
  const dispatch = useDispatch();

  const removeFromCompare = (id) => {
    dispatch(removeItemsFromCompare(id));
    toast.success('Product removed from compare');
  };

  return (
    <>
      <MetaData title='Compare Products' />
      <BreadCrumb title='Compare Products' />
      <div className='compare-product-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            {compareItems && compareItems?.length === 0 && (
              <div className='row'>
                <div
                  className='col-12 d-flex flex-column align-items-center justify-content-center'
                  style={{ height: '15rem' }}
                >
                  <h4>Empty Compare</h4>
                  <p>You have no items in your compare. Start adding!</p>
                </div>
              </div>
            )}
            {compareItems &&
              compareItems?.map((compare) => {
                return (
                  <CompareCard
                    key={compare?._id}
                    compare={compare}
                    removeFromCompare={removeFromCompare}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;
