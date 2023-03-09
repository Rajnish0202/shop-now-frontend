import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import MetaData from '../utils/MetaData';
import services from '../utils/Data';

const Home = () => {
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
                    <h5>Buyy iPad Air.</h5>
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
              <div className='categories d-flex justify-content-between align-items-center flex-wrap'>
                <div className='d-flex align-items-center gap-15'>
                  <div>
                    <h6>Cameras & Videos</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='assests/camera.jpg' alt='camera' />
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <div>
                    <h6>Smart Television</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='assests/tv.jpg' alt='tv' />
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <div>
                    <h6>Headpones</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='assests/headphone.jpg' alt='headphone' />
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='assests/gaming.jpg' alt='gaming' />
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <div>
                    <h6>Mobiles & Tablets</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='assests/mobile.jpg' alt='mobile' />
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <div>
                    <h6>Computers & Laptop</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='assests/laptop.jpg' alt='laptop' />
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <div>
                    <h6>Accessories</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='assests/acc.jpg' alt='accessories' />
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <div>
                    <h6>Portable Speakers</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='assests/speaker.jpg' alt='speaker' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='featured-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Featured Collection </h3>
            </div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      <section className='famous-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img src='assests/famous-01.jpg' alt='watch' />
                <div className='famous-content position-absolute'>
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>Form ₹1250 or ₹235/mo. for 24 mo.</p>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img src='assests/famous-02.jpg' alt='watch' />
                <div className='famous-content position-absolute'>
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>Form ₹1250 or ₹235/mo. for 24 mo.</p>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img src='assests/famous-03.jpg' alt='watch' />
                <div className='famous-content position-absolute'>
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>Form ₹1250 or ₹235/mo. for 24 mo.</p>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img src='assests/famous-04.jpg' alt='watch' />
                <div className='famous-content position-absolute'>
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>Form ₹1250 or ₹235/mo. for 24 mo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='special-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Special Products</h3>
            </div>
          </div>
          <div className='row'>
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
          </div>
        </div>
      </section>

      <section className='popular-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Our Popular Products </h3>
            </div>
          </div>
          <div className='row'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      <section className='marque-wrapper p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='marque-inner-wrapper card-wrapper'>
                <Marquee className='d-flex align-items-center justify-content-between gap-30'>
                  <div className='mx-4 w-25'>
                    <img src='assests/brand-01.png' alt='apple' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='assests/brand-02.png' alt='bose' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='assests/brand-03.png' alt='canon' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='assests/brand-04.png' alt='dell' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='assests/brand-05.png' alt='intel' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='assests/brand-06.png' alt='lg' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='assests/brand-07.png' alt='samsung' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='assests/brand-08.png' alt='sandisk' />
                  </div>
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
              <h3 className='section-heading'>Our Latest Blogs</h3>
            </div>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
