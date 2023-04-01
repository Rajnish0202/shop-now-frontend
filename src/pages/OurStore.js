import React, { useEffect, useMemo, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';
import StarRatings from 'react-star-ratings';
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getRandomProduct } from '../redux/actions/productActions';
import Loader, { Spinner } from '../components/Loader/Loader';
import { getProducts } from '../redux/actions/productActions';
import { Link, useParams } from 'react-router-dom';
import ratings from '../utils/ratings';
import { shortenText } from '../utils/ShortenText';

const OurStore = () => {
  const [grid, setGrid] = useState(3);
  const [limit, setLimit] = useState(8);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(10000);
  const [type, setType] = useState('');
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [sizes, setSizes] = useState('');
  const [color, setColor] = useState('');

  const { keyword } = useParams();
  const { loading, error, products, totalProducts } = useSelector(
    (state) => state.products
  );
  const {
    loading: categoryLoading,
    error: categoryError,
    productCategories,
    counts,
  } = useSelector((state) => state.productCategories);

  const price = useMemo(() => [+priceFrom, +priceTo], [priceFrom, priceTo]);

  const {
    loading: brandLoading,
    error: brandError,
    productBrands,
    totalBrands,
  } = useSelector((state) => state.productBrand);

  const {
    loading: typeLoading,
    error: typeError,
    types,
    totalTypes,
  } = useSelector((state) => state.productType);

  const {
    loading: sizeLoading,
    error: sizeError,
    productSizes,
  } = useSelector((state) => state.productSizes);

  const {
    loading: colorLoading,
    error: colorError,
    colors,
    totalColors,
  } = useSelector((state) => state.productColors);

  const {
    loading: randomLoading,
    error: randomError,
    randomProducts,
  } = useSelector((state) => state.randomProducts);

  const dispatch = useDispatch();

  const loadMoreHandler = () => {
    setLimit((prev) => prev + 4);
  };

  const loadLessHandler = () => {
    if (limit > 8) {
      setLimit((prev) => prev - 4);
    }
  };

  const resetFilterHandler = () => {
    setLimit(8);
    setCategory('');
    setBrand('');
    setStock('');
    setPriceFrom(0);
    setPriceTo(100000);
    setRating(0);
    setSizes('');
    setType('');
    setSortBy('');
    setColor('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (categoryError) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (brandError) {
      toast.error(brandError);
      dispatch(clearErrors());
    }

    if (typeError) {
      toast.error(typeError);
      dispatch(clearErrors());
    }

    if (sizeError) {
      toast.error(sizeError);
      dispatch(clearErrors());
    }

    if (colorError) {
      toast.error(colorError);
      dispatch(clearErrors());
    }

    if (randomError) {
      toast.error(randomError);
      dispatch(clearErrors());
    }

    dispatch(
      getProducts(
        keyword,
        limit,
        category,
        brand,
        stock,
        price,
        type,
        rating,
        sortBy,
        sizes,
        color
      )
    );

    dispatch(getRandomProduct());
  }, [
    dispatch,
    error,
    categoryError,
    keyword,
    limit,
    category,
    brandError,
    type,
    brand,
    stock,
    price,
    typeError,
    rating,
    sortBy,
    sizeError,
    sizes,
    colorError,
    randomError,
    color,
  ]);

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
                  Shop by categories (
                  {counts > 10 ? counts : counts?.toString().padStart(2, '0')})
                </h3>
                <div>
                  <ul className='ps-0 mb-0 filter-scroll'>
                    {categoryLoading && <Spinner />}
                    {productCategories &&
                      productCategories.map((cate) => {
                        return (
                          <li
                            key={cate?.slug}
                            onClick={() => setCategory(cate?._id)}
                          >
                            {cate?.title}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className='filter-card mb-2'>
                <h3 className='filter-title'>
                  Shop by brands (
                  {totalBrands > 10
                    ? totalBrands
                    : totalBrands?.toString().padStart(2, '0')}
                  )
                </h3>
                <div>
                  <ul className='ps-0 mb-0 filter-scroll'>
                    {brandLoading && <Spinner />}
                    {productBrands &&
                      productBrands.map((cate) => {
                        return (
                          <li
                            key={cate?._id}
                            onClick={() => setBrand(cate?._id)}
                          >
                            {cate?.title}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className='filter-card mb-2'>
                <h3 className='filter-title'>Filter by</h3>
                <div>
                  <h5 className='sub-title'>Availablity</h5>
                  <form>
                    <div className='form-check'>
                      <input
                        type='radio'
                        className='form-check-input'
                        name='stock'
                        value={stock}
                        onClick={() => setStock(1)}
                      />
                      <label className='form-check-label'>In Stock</label>
                    </div>
                    <div className='form-check'>
                      <input
                        type='radio'
                        className='form-check-input'
                        name='stock'
                        value={stock}
                        onClick={() => setStock('0')}
                      />
                      <label className='form-check-label'>Out Of Stock</label>
                    </div>
                  </form>
                  <h5 className='sub-title'>Price</h5>
                  <div className='d-flex align-items-center gap-10 mb-2'>
                    ₹
                    <div className='form-floating '>
                      <input
                        type='text'
                        className='form-control'
                        id='floatingInputFrom'
                        placeholder='From'
                        value={priceFrom}
                        min={0}
                        max={100000}
                        onChange={(e) => setPriceFrom(e.target.value)}
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
                        min={0}
                        max={100000}
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                      />
                      <label htmlFor='floatingInputTo'>To</label>
                    </div>
                  </div>
                  <h5 className='sub-title'>
                    Color (
                    {totalColors > 10
                      ? totalColors
                      : totalColors?.toString().padStart(2, '0')}
                    )
                  </h5>
                  <div>
                    {colorLoading && <Spinner />}
                    {colors && (
                      <div>
                        <Color colors={colors} setColor={setColor} />
                      </div>
                    )}
                  </div>
                  <h5 className='sub-title'>Size</h5>
                  <div className='filter-scroll'>
                    {sizeLoading && <Spinner />}
                    {productSizes &&
                      productSizes.map((size) => {
                        return (
                          <div
                            className='form-check d-flex align-items-center gap-10'
                            key={size?._id}
                          >
                            <input
                              type='radio'
                              className='form-check-input'
                              name='sizes'
                              onClick={() => setSizes(size?._id)}
                            />
                            <label className='form-check-label'>
                              {size?.title}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                  <h5 className='sub-title'>Ratings</h5>
                  <form>
                    {ratings &&
                      ratings?.map((rate) => {
                        return (
                          <div
                            className='form-check d-flex align-items-center gap-10'
                            key={rate?.id}
                          >
                            <input
                              type='radio'
                              className='form-check-input'
                              name='stock'
                              onClick={() => setRating(rate?.star)}
                            />
                            <StarRatings
                              rating={+rate?.star}
                              starRatedColor='#febd69'
                              starDimension='20px'
                              starSpacing='2px'
                            />
                          </div>
                        );
                      })}
                  </form>
                </div>
              </div>
              <div className='filter-card mb-2'>
                <h3 className='filter-title'>
                  product type (
                  {totalTypes > 10
                    ? totalTypes
                    : totalTypes?.toString().padStart(2, '0')}
                  ){' '}
                </h3>
                <div>
                  {typeLoading && <Spinner />}
                  <div className='product-tags d-flex flex-wrap align-items-center gap-10 filter-scroll'>
                    {types &&
                      types.map((type) => {
                        return (
                          <span
                            className='badge rounded-3  py-2 px-3 text-capitalize'
                            key={type?._id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setType(type?._id)}
                          >
                            {type?.title}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              {randomProducts && (
                <div className='filter-card mb-2'>
                  <h3 className='filter-title'>random Product</h3>
                  {randomLoading && <Spinner />}
                  {randomProducts &&
                    randomProducts.map((random) => {
                      return (
                        <div key={random?._id}>
                          <Link to={`/product/${random?.slug}`}>
                            <div className='random-products d-flex pt-3 pb-3 gap-10'>
                              <div className='w-50'>
                                <img
                                  src={random?.images[0]?.url}
                                  alt={random?.images[0]?.url}
                                  className='img-fluid'
                                />
                              </div>
                              <div className='w-50'>
                                <h5>{shortenText(random?.title, 15)}</h5>
                                <StarRatings
                                  rating={+random?.totalRating}
                                  starRatedColor='#febd69'
                                  starDimension='20px'
                                  starSpacing='2px'
                                />
                                <b>₹{random?.price.toFixed(2)}</b>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className='col-9'>
              <div className='filter-sort-grid mb-4'>
                <div className='d-flex justify-content-between align-items-center px-2'>
                  <div className='d-flex align-items-center gap-10 '>
                    <p className='mb-0 filter-sort'>Sort By:</p>
                    <select
                      name=''
                      className='form-control form-select'
                      id=''
                      onClick={(e) => setSortBy(e.target.value)}
                    >
                      <option value=''>Featured</option>
                      <option value='sold'>Best-selling</option>
                      <option value='title'>Alphabetically, A-Z</option>
                      <option value='-title'>Alphabetically, Z-A</option>
                      <option value='price'>Price, low to high</option>
                      <option value='-price'>Price, high to low</option>
                      <option value='-createdAt'>Date, new to old</option>
                      <option value='createdAt'>Date, old to new</option>
                    </select>
                    <button
                      className='normal-btn w-100'
                      style={{
                        border: '1px solid #000',
                        padding: '10px',
                        borderRadius: '10px',
                      }}
                      onClick={() => resetFilterHandler()}
                    >
                      Reset Filter
                    </button>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className='totalproducts mb-0'>
                      {totalProducts > 9
                        ? totalProducts
                        : totalProducts?.toString().padStart(2, '0')}{' '}
                      {totalProducts > 1 ? 'Products' : 'Product'}
                    </p>
                    <div className='d-flex align-items-center gap-10'>
                      <div className='grid-image' onClick={() => setGrid(3)}>
                        <img
                          src='/assests/gr4.svg'
                          alt='grid'
                          className='d-block img-fluid grid-image'
                        />
                      </div>
                      <div className='grid-image' onClick={() => setGrid(4)}>
                        <img
                          src='/assests/gr3.svg'
                          alt='grid'
                          className='d-block img-fluid '
                        />
                      </div>
                      <div className='grid-image' onClick={() => setGrid(6)}>
                        <img
                          src='/assests/gr2.svg'
                          alt='grid'
                          className='d-block img-fluid grid-image'
                        />
                      </div>
                      <div className='grid-image' onClick={() => setGrid(12)}>
                        <img
                          src='/assests/gr.svg'
                          alt='grid'
                          className='d-block img-fluid grid-image'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='product-list pb-5 d-flex gap-10 flex-wrap'>
                {products?.length === 0 && (
                  <div
                    className='col-12 d-flex flex-column align-items-center justify-content-center'
                    style={{ height: '15rem' }}
                  >
                    <h4>No Products Found</h4>
                    <p>You have no items in your products.</p>
                  </div>
                )}
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
              <div className='load-more d-flex align-items-center justify-content-center gap-30'>
                {products?.length >= limit && (
                  <button className='button' onClick={loadMoreHandler}>
                    Load More ({products.length})
                  </button>
                )}
                {products?.length >= totalProducts && (
                  <button className='button' onClick={loadLessHandler}>
                    Load Less ({products.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
