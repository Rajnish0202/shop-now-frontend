import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';
import StarRatings from 'react-star-ratings';
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../redux/actions/productCategoryAction';
import Loader, { Spinner } from '../components/Loader/Loader';
import { CLEAR_ERRORS } from '../redux/constants/productCategory';
import { getProducts } from '../redux/actions/productActions';
import { useParams } from 'react-router-dom';

const OurStore = () => {
  const [grid, setGrid] = useState(3);
  const { keyword } = useParams();
  console.log(keyword);

  const { loading, error, products } = useSelector((state) => state.products);
  const {
    loading: categoryLoading,
    error: categoryError,
    productCategories,
    counts,
  } = useSelector((state) => state.productCategories);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (categoryError) {
      toast.error(error);
      dispatch(CLEAR_ERRORS());
    }

    dispatch(getProducts());
  }, [dispatch, error, categoryError, keyword]);

  return (
    <>
      <MetaData title='Our Store' />
      <BreadCrumb title='Our Store' />
      <div className='store-wrapper home-wrapper-2 p-4'>
        {loading && <Loader />}
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-3'>
              <div className='filter-card mb-2'>
                <h3 className='filter-title'>
                  Shop by categories(
                  {counts?.length > 10
                    ? counts
                    : counts?.toString().padStart(2, '0')}
                  )
                </h3>
                <div>
                  <ul className='ps-0 mb-0'>
                    {categoryLoading && <Spinner />}
                    {productCategories &&
                      productCategories.map((category) => {
                        return <li key={category?.slug}>{category?.title}</li>;
                      })}
                  </ul>
                </div>
              </div>
              <div className='filter-card mb-2'>
                <h3 className='filter-title'>Filter by</h3>
                <div>
                  <h5 className='sub-title'>Availablity</h5>
                  <div>
                    <div className='form-check'>
                      <input type='checkbox' className='form-check-input' />
                      <label className='form-check-label'>In Stock</label>
                    </div>
                    <div className='form-check'>
                      <input type='checkbox' className='form-check-input' />
                      <label className='form-check-label'>Out Of Stock</label>
                    </div>
                  </div>
                  <h5 className='sub-title'>Price</h5>
                  <div className='d-flex align-items-center gap-10 mb-2'>
                    ₹
                    <div className='form-floating '>
                      <input
                        type='text'
                        className='form-control'
                        id='floatingInputFrom'
                        placeholder='From'
                      />
                      <label htmlFor='floatingInputFrom'>From</label>
                    </div>
                    ₹
                    <div className='form-floating '>
                      <input
                        type='text'
                        className='form-control'
                        id='floatingInputTo'
                        placeholder='To'
                      />
                      <label htmlFor='floatingInputTo'>To</label>
                    </div>
                  </div>
                  <h5 className='sub-title'>Color</h5>
                  <div>
                    <div>
                      <Color />
                    </div>
                  </div>
                  <h5 className='sub-title'>Size</h5>
                  <div>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id='XS'
                      />
                      <label className='form-check-label' htmlFor='XS'>
                        XS (2)
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        id='S'
                        className='form-check-input'
                      />
                      <label className='form-check-label' htmlFor='S'>
                        S (2)
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        id='M'
                        className='form-check-input'
                      />
                      <label className='form-check-label' htmlFor='M'>
                        M (2)
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        id='L'
                        className='form-check-input'
                      />
                      <label className='form-check-label' htmlFor='L'>
                        L (2)
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        id='XL'
                        className='form-check-input'
                      />
                      <label className='form-check-label' htmlFor='XL'>
                        XL (2)
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        id='XXL'
                        className='form-check-input'
                      />
                      <label className='form-check-label' htmlFor='XXL'>
                        XXL (2)
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        id='XXXL'
                        className='form-check-input'
                      />
                      <label className='form-check-label' htmlFor='XXXL'>
                        XXXL (2)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='filter-card mb-2'>
                <h3 className='filter-title'>product tags</h3>
                <div>
                  <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                    <span className='badge rounded-3  py-2 px-3'>
                      Headphone
                    </span>
                    <span className='badge rounded-3  py-2 px-3'>
                      Television
                    </span>
                    <span className='badge rounded-3  py-2 px-3'>Mobile</span>
                    <span className='badge rounded-3  py-2 px-3'>Speaker</span>
                    <span className='badge rounded-3  py-2 px-3'>wire</span>
                  </div>
                </div>
              </div>
              <div className='filter-card mb-2'>
                <h3 className='filter-title'>random Product</h3>
                <div>
                  <div className='random-products d-flex pt-3'>
                    <div className='w-50'>
                      <img
                        src='assests/watch.jpg'
                        alt='watch'
                        className='img-fluid'
                      />
                    </div>
                    <div className='w-50'>
                      <h5>
                        Kids watches bulk 10 pack multi coloured htmlFor
                        students...
                      </h5>
                      <StarRatings
                        rating={4}
                        starRatedColor='#febd69'
                        starDimension='20px'
                        starSpacing='2px'
                      />
                      <b>₹999.00</b>
                    </div>
                  </div>
                  <div className='random-products d-flex pt-3'>
                    <div className='w-50'>
                      <img
                        src='assests/acc.jpg'
                        alt='watch'
                        className='img-fluid'
                      />
                    </div>
                    <div className='w-50'>
                      <h5>
                        Kids headphone bulk 10 pack multi coloured htmlFor
                        students...
                      </h5>
                      <StarRatings
                        rating={4}
                        starRatedColor='#febd69'
                        starDimension='20px'
                        starSpacing='2px'
                      />
                      <b>₹999.00</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-9'>
              <div className='filter-sort-grid mb-4'>
                <div className='d-flex justify-content-between align-items-center px-2'>
                  <div className='d-flex align-items-center gap-10 '>
                    <p className='mb-0 filter-sort'>Sort By:</p>
                    <select name='' className='form-control form-select' id=''>
                      <option value=''>Featured</option>
                      <option value=''>Best-selling</option>
                      <option value=''>Alphabetically, A-Z</option>
                      <option value=''>Alphabetically, Z-A</option>
                      <option value=''>Price, low to high</option>
                      <option value=''>Price, high to low</option>
                      <option value=''>Date, old to new</option>
                      <option value=''>Date, new to old</option>
                    </select>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className='totalproducts mb-0'>21 Products</p>
                    <div className='d-flex align-items-center gap-10'>
                      <div className='grid-image' onClick={() => setGrid(3)}>
                        <img
                          src='assests/gr4.svg'
                          alt='grid'
                          className='d-block img-fluid grid-image'
                        />
                      </div>
                      <div className='grid-image' onClick={() => setGrid(4)}>
                        <img
                          src='assests/gr3.svg'
                          alt='grid'
                          className='d-block img-fluid '
                        />
                      </div>
                      <div className='grid-image' onClick={() => setGrid(6)}>
                        <img
                          src='assests/gr2.svg'
                          alt='grid'
                          className='d-block img-fluid grid-image'
                        />
                      </div>
                      <div className='grid-image' onClick={() => setGrid(12)}>
                        <img
                          src='assests/gr.svg'
                          alt='grid'
                          className='d-block img-fluid grid-image'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='product-list pb-5 d-flex gap-10 flex-wrap'>
                {products &&
                  products.map((product) => {
                    return (
                      <ProductCard
                        grid={grid}
                        product={product}
                        key={product._id}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
