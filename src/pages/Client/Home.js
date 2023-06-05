import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import BlogCard from '../../components/BlogCard';
import ProductCard from '../../components/ProductCard';
import SpecialProduct from '../../components/SpecialProduct';
import MetaData from '../../utils/MetaData';
import services from '../../utils/Data';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getFeaturedProducts,
  getPopularProducts,
  getSpecialProducts,
} from '../../redux/actions/productActions';
import { toast } from 'react-toastify';
import { Spinner } from '../../components/Loader/Loader';
import { getProductCountCategories } from '../../redux/actions/productCategoryAction';
import { getAllTypesCount } from '../../redux/actions/productTypeAction';
import { getBrands } from '../../redux/actions/brandAction';
import { getAllBlogs } from '../../redux/actions/blogActions';

const Home = ({ setCategory, setType, setBrand }) => {
  const [limit, setLimit] = useState(4);
  const [limitFeatured, setLimitFeatured] = useState(4);
  const [limitType, setLimitType] = useState(4);
  const [blogLimit, setBlogLimit] = useState(4);
  const [specialLimit, setSpecialLimit] = useState(4);

  const { loading, error, popularProducts, totalPopular } = useSelector(
    (state) => state.popularProducts
  );

  const {
    loading: featuredLoading,
    error: featuredError,
    featuredProducts,
    featuredTotal,
  } = useSelector((state) => state.featuredProducts);

  const {
    loading: countLoading,
    error: countError,
    productCountCategories,
  } = useSelector((state) => state.productCountCategories);

  const {
    loading: specialLoading,
    error: specialError,
    specialProducts,
    totalSpecial,
  } = useSelector((state) => state.specialProducts);

  const filterSpecial = specialProducts?.filter(
    (special) => Date.parse(special?.special?.specialTime) > Date.now()
  );

  const {
    loading: typeLoading,
    error: typeError,
    countTypes,
  } = useSelector((state) => state.productTypeCount);

  const {
    loadin: brandLoading,
    error: brandError,
    productBrands,
  } = useSelector((state) => state.productBrand);

  const {
    loading: blogLoading,
    error: blogError,
    blogs,
  } = useSelector((state) => state.allBlogs);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryHandler = (id) => {
    navigate('/ourstore');
    setCategory(id);
  };

  const typeHandler = (id) => {
    navigate('/ourstore');
    setType(id);
  };

  const brandHandler = (id) => {
    navigate('/ourstore');
    setBrand(id);
  };

  const featuredMoreHandler = () => {
    if (limitFeatured > featuredProducts.length) {
      return;
    }
    setLimitFeatured((prev) => prev + 4);
  };

  const featuredLessHandler = () => {
    if (limitFeatured < 4) {
      return;
    }
    setLimitFeatured((prev) => prev - 4);
  };

  const popularMoreHandler = () => {
    if (limit >= totalPopular) {
      return;
    }
    setLimit((prev) => prev + 4);
  };

  const popularLessHandler = () => {
    if (limit < 4) {
      return;
    }
    setLimit((prev) => prev - 4);
  };

  const typeMoreHandler = () => {
    if (limitType > countTypes.length) return;
    setLimitType((prev) => prev + 4);
  };

  const typeLessHandler = () => {
    if (limitType < 4) {
      return;
    }
    setLimitType((prev) => prev - 4);
  };

  const blogLessHandler = () => {
    if (blogLimit < 4) {
      return;
    }
    setBlogLimit((prev) => prev - 4);
  };

  const blogMoreHandler = () => {
    if (blogLimit > blogs?.blogCount) return;

    setBlogLimit((prev) => prev + 4);
  };

  const specialLessHandler = () => {
    if (specialLimit < 4) {
      return;
    }
    setSpecialLimit((prev) => prev - 4);
  };

  const specialMoreHandler = () => {
    if (specialLimit > blogs?.blogCount) return;

    setSpecialLimit((prev) => prev + 4);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (countError) {
      toast.error(countError);
      dispatch(clearErrors());
    }

    if (featuredError) {
      toast.error(featuredError);
      dispatch(clearErrors());
    }

    if (typeError) {
      toast.error(typeError);
      dispatch(clearErrors());
    }

    if (brandError) {
      toast.error(brandError);
      dispatch(clearErrors());
    }

    if (blogError) {
      toast.error(blogError);
      dispatch(clearErrors());
    }

    if (specialError) {
      toast.error(specialError);
      dispatch(clearErrors());
    }

    dispatch(getPopularProducts(limit));
    dispatch(getFeaturedProducts(limitFeatured));
    dispatch(getAllTypesCount(limitType));
    dispatch(getProductCountCategories());
    dispatch(getBrands());
    dispatch(getAllBlogs(blogLimit));
    dispatch(getSpecialProducts(specialLimit));
  }, [
    dispatch,
    error,
    limit,
    countError,
    limitFeatured,
    featuredError,
    limitType,
    typeError,
    brandError,
    blogLimit,
    blogError,
    specialLimit,
    specialError,
  ]);

  return (
    <>
      <MetaData title='Home' />

      <section className='home-wrapper-1 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <div
                id='carouselExampleIndicators'
                className='carousel slide'
                data-bs-ride='carousel'
              >
                <div className='carousel-indicators'>
                  <button
                    type='button'
                    data-bs-target='#carouselExampleIndicators'
                    data-bs-slide-to='0'
                    className='active'
                    aria-current='true'
                    aria-label='Slide 1'
                  ></button>
                  <button
                    type='button'
                    data-bs-target='#carouselExampleIndicators'
                    data-bs-slide-to='1'
                    aria-label='Slide 2'
                  ></button>
                </div>
                <div className='carousel-inner'>
                  <div className='carousel-item active' data-bs-interval='3000'>
                    <div className='main-banner position-relative'>
                      <img
                        src='assests/main-banner.jpg'
                        className='img-fluid rounded-3'
                        alt='main banner'
                      />
                      <div className='main-banner-content position-absolute '>
                        <h4>SUPPERCHARGED FOR PROS.</h4>
                        <h5>iPad S13+ Pro.</h5>
                        <p>
                          From ₹999.00 or ₹123.52/mo. <br /> for 24 mo.
                          Footnote*
                        </p>
                        <Link to='' className='button'>
                          BUY NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='carousel-item' data-bs-interval='3000'>
                    <div className='main-banner position-relative'>
                      <img
                        src='assests/main-banner-1.jpg'
                        className='img-fluid rounded-3'
                        alt='main banner'
                      />
                      <div className='main-banner-content position-absolute '>
                        <h4>SUPPERCHARGED FOR PROS.</h4>
                        <h5>iPad S13+ Pro.</h5>
                        <p>
                          From ₹999.00 or ₹123.52/mo. <br /> for 24 mo.
                          Footnote*
                        </p>
                        <Link to='' className='button'>
                          BUY NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='d-flex flex-wrap gap-10 justify-content-between align-items-center'>
                <div className='small-banner position-relative'>
                  <img
                    src='assests/catbanner-01.jpg'
                    className='img-fluid rounded-3'
                    alt='main banner'
                  />
                  <div className='small-banner-content position-absolute'>
                    <h4>Best Sale</h4>
                    <h5>Laptops Max</h5>
                    <p>
                      From ₹45589.00 <br /> or ₹1235.52/mo.
                    </p>
                  </div>
                </div>
                <div className='small-banner position-relative'>
                  <img
                    src='assests/catbanner-03.jpg'
                    className='img-fluid rounded-3'
                    alt='main banner'
                  />
                  <div className='small-banner-content position-absolute '>
                    <h4>New Arrival</h4>
                    <h5>Buy iPad Air.</h5>
                    <p>
                      From ₹2599.00 <br />
                      or ₹1023.52/mo.
                    </p>
                  </div>
                </div>
                <div className='small-banner position-relative '>
                  <img
                    src='assests/catbanner-02.jpg'
                    className='img-fluid rounded-3'
                    alt='main banner'
                  />
                  <div className='small-banner-content position-absolute '>
                    <h4>15% Off</h4>
                    <h5>Smartwatch 7</h5>
                    <p>
                      Shop the latest band <br /> styles & colors.
                    </p>
                  </div>
                </div>
                <div className='small-banner position-relative'>
                  <img
                    src='assests/catbanner-04.jpg'
                    className='img-fluid rounded-3'
                    alt='main banner'
                  />
                  <div className='small-banner-content position-absolute '>
                    <h4>free Engraving</h4>
                    <h5>AirPods Max</h5>
                    <p>
                      High-fidelity playback <br /> & ultra-low distortion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='services d-flex aligin-items-center justify-content-between'>
                {services &&
                  services.map((service, index) => {
                    return (
                      <div
                        className='d-flex align-items-center gap-15'
                        key={index}
                      >
                        <img src={service.image} alt={service.title} />
                        <div>
                          <h6>{service.title}</h6>
                          <p className='mb-0'>{service.tagline}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              {countLoading && <Spinner />}
              <div className='categories d-flex justify-content-between align-items-center flex-wrap'>
                {productCountCategories &&
                  productCountCategories?.map((productCate) => {
                    return (
                      <div
                        className='d-flex align-items-center gap-15'
                        key={productCate?._id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => categoryHandler(productCate?._id)}
                      >
                        <div className='d-flex flex-column'>
                          <h6 className='text-capitalize'>
                            {productCate?.title}
                          </h6>
                          <p className='mb-0'>
                            {productCate?.number_of_product}{' '}
                            {productCate?.number_of_product > 1
                              ? 'Items'
                              : 'Item'}
                          </p>
                        </div>
                        <img
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                          }}
                          src={productCate?.image?.url}
                          alt={productCate?.image?.url}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='featured-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>
                Featured Collection (
                {featuredTotal === undefined
                  ? '00'
                  : featuredTotal > 10
                  ? featuredTotal
                  : featuredTotal?.toString().padStart(2, 0)}
                ){' '}
              </h3>
            </div>
            {featuredLoading && <Spinner />}
            {featuredProducts &&
              featuredProducts?.map((product) => {
                return <ProductCard product={product} key={product?.slug} />;
              })}
            <div className='d-flex align-items-center justify-content-center mt-3 gap-15'>
              {limitFeatured > 4 && (
                <button className='button' onClick={featuredLessHandler}>
                  Load Less
                </button>
              )}
              {limitFeatured <= featuredTotal && (
                <button className='button' onClick={featuredMoreHandler}>
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className='famous-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row' style={{ rowGap: '20px' }}>
            {typeLoading && <Spinner />}
            {countTypes &&
              countTypes?.map((type) => {
                return (
                  <div
                    className='col-3'
                    key={type?._id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => typeHandler(type?._id)}
                  >
                    <div className='famous-card position-relative'>
                      <img src={type?.image?.url} alt={type?.image?.url} />
                      <div className='famous-content position-absolute'>
                        <h5>Big Screen</h5>
                        <h6 className='text-capitalize' title={type?.title}>
                          {type?.title}
                        </h6>
                        <p>
                          {type?.number_of_product >= 10
                            ? type?.number_of_product
                            : type?.number_of_product
                                ?.toString()
                                ?.padStart(2, '0')}{' '}
                          &nbsp;
                          {type?.number_of_product > 1 ? 'Items' : 'Item'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className='d-flex align-items-center justify-content-center mt-3 gap-15'>
              {limitType > 4 && (
                <button className='button' onClick={typeLessHandler}>
                  Load Less
                </button>
              )}
              {limitType <= countTypes.length && (
                <button className='button' onClick={typeMoreHandler}>
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className='special-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>
                Special Products (
                {totalSpecial === undefined
                  ? '00'
                  : totalSpecial > 9
                  ? totalSpecial
                  : totalSpecial?.toString().padStart(2, '0')}
                )
              </h3>
            </div>
          </div>
          <div className='row'>
            {specialLoading && <Spinner />}
            {filterSpecial &&
              filterSpecial?.map((special) => {
                return <SpecialProduct key={special?._id} special={special} />;
              })}
            <div className='d-flex align-items-center justify-content-center mt-3 gap-15'>
              {specialLimit > 4 && (
                <button className='button' onClick={specialLessHandler}>
                  Load Less
                </button>
              )}
              {specialLimit <= totalSpecial && (
                <button className='button' onClick={specialMoreHandler}>
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className='popular-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>
                Our Popular Products (
                {totalPopular === undefined
                  ? '00'
                  : totalPopular && totalPopular > 10
                  ? totalPopular
                  : totalPopular?.toString()?.padStart(2, '0')}
                )
              </h3>
            </div>
          </div>
          <div className='row'>
            {loading && <Spinner />}

            {popularProducts &&
              popularProducts.map((product) => {
                return <ProductCard product={product} key={product?.slug} />;
              })}
            <div className='d-flex align-items-center justify-content-center mt-3 gap-15'>
              {limit > 4 && (
                <button className='button' onClick={popularLessHandler}>
                  Load Less
                </button>
              )}
              {limit < totalPopular && (
                <button className='button' onClick={popularMoreHandler}>
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className='marque-wrapper p-4'>
        <div className='container-xxl'>
          <div className='row'>
            {brandLoading && <Spinner />}
            <div className='col-12'>
              <div className='marque-inner-wrapper card-wrapper'>
                <Marquee className='d-flex align-items-center justify-content-between gap-30'>
                  {productBrands &&
                    productBrands?.map((brand) => {
                      return (
                        <div
                          className='mx-4 w-25'
                          key={brand?._id}
                          onClick={() => brandHandler(brand?._id)}
                        >
                          <img
                            src={brand?.logo?.url}
                            alt={brand?.logo?.url}
                            style={{
                              height: '100px',
                              objectFit: 'cover',
                              cursor: 'pointer',
                            }}
                          />
                        </div>
                      );
                    })}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='blog-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>
                Our Latest Blogs (
                {blogs?.blogCount === undefined
                  ? '00'
                  : blogs?.blogCount && blogs?.blogCount > 10
                  ? blogs?.blogCount
                  : blogs?.blogCount?.toString()?.padStart(2, '0')}
                )
              </h3>
            </div>
            {blogLoading && <Spinner />}
            {blogs &&
              blogs?.allBlog?.map((blog) => {
                return <BlogCard blog={blog} key={blog?._id} />;
              })}
            <div className='d-flex align-items-center justify-content-center mt-3 gap-15'>
              {blogLimit > 4 && (
                <button className='button' onClick={blogLessHandler}>
                  Load Less
                </button>
              )}
              {blogLimit !== blogs?.blogCount && (
                <button className='button' onClick={blogMoreHandler}>
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
