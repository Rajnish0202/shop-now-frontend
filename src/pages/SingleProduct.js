import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import BreadCrumb from '../components/BreadCrumb';
import ProductCard from '../components/ProductCard';
import MetaData from '../utils/MetaData';
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { BsHeart, BsLink } from 'react-icons/bs';
import { TiArrowShuffle } from 'react-icons/ti';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { toast } from 'react-toastify';

const SingleProduct = () => {
  const [toggleReview, setToggleReview] = useState(false);

  const shareLink = window.location.href;

  const copyToClipboard = (text) => {
    // console.log('text', text);
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    toast.success('Copied!');
  };

  const props = {
    zoomWith: 600,
    img: 'https://res.cloudinary.com/dukdn1bpp/image/upload/v1675181440/MERN-INVENTORY/lt3skh0oukrzciohedr1.webp',
  };

  return (
    <>
      <MetaData title='Product Name' />
      <BreadCrumb title='Product Name' />
      <div className='main-product-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <div className='main-product-image'>
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>

              <div className='other-product-images d-flex flex-wrap gap-15'>
                <div>
                  <img
                    src='https://res.cloudinary.com/dukdn1bpp/image/upload/v1675016207/MERN-INVENTORY/b5jpjnzhxmbumtnmupxr.webp'
                    alt=''
                  />
                </div>
                <div>
                  <img
                    src='https://res.cloudinary.com/dukdn1bpp/image/upload/v1674885646/MERN-INVENTORY/kjbsit99vtkwtateksic.webp'
                    alt=''
                  />
                </div>
                <div>
                  <img src='/assests/acc.jpg' alt='' />
                </div>
                <div>
                  <img src='/assests/acc.jpg' alt='' />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='main-product-details'>
                <div className='border-bottom'>
                  <h3 className='title'>
                    Kids Headphones Bulk 10 Pack Multi Colored For Stidents
                  </h3>
                </div>

                <div className='border-bottom'>
                  <p className='price'>₹1253.00</p>
                  <div className='d-flex  align-items-center gap-5'>
                    <StarRatings
                      rating={4}
                      starRatedColor='#febd69'
                      starDimension='18px'
                      starSpacing='2px'
                    />
                    <p className='mb-0 single-review'>(2 Reviews)</p>
                  </div>
                  <div>
                    <a
                      href='#review'
                      className='text-decoration-underline'
                      onClick={() => setToggleReview(!toggleReview)}
                    >
                      Write a Review
                    </a>
                  </div>
                </div>

                <div className='pt-3'>
                  <div className='d-flex align-items-center gap-10 mb-2'>
                    <h6 className='product-heading'>Type :</h6>
                    <p className='product-data'>Headsets</p>
                  </div>
                  <div className='d-flex align-items-center gap-10 my-2'>
                    <h6 className='product-heading'>Brand :</h6>
                    <p className='product-data'>Havells</p>
                  </div>
                  <div className='d-flex align-items-center gap-10 my-2'>
                    <h6 className='product-heading'>Category :</h6>
                    <p className='product-data'>Havells</p>
                  </div>
                  <div className='d-flex align-items-center gap-10 my-2'>
                    <h6 className='product-heading'>Tag :</h6>
                    <p className='product-data'>Watch</p>
                  </div>
                  <div className='d-flex align-items-center gap-10 my-2'>
                    <h6 className='product-heading'>SKU :</h6>
                    <p className='product-data'>SKU1254</p>
                  </div>
                  <div className='d-flex align-items-center gap-10 my-2'>
                    <h6 className='product-heading'>Availabilty :</h6>
                    <p className='product-data'>In Stock</p>
                  </div>
                  <div className='d-flex flex-column gap-5 my-2'>
                    <h6 className='product-heading'>Size :</h6>
                    <div className='d-flex flex-wrap gap-15 mt-2 mb-3'>
                      <span className='badge border border-1 bg-white text-dark '>
                        S
                      </span>
                      <span className='badge border border-1 bg-white text-dark '>
                        M
                      </span>
                      <span className='badge border border-1 bg-white text-dark '>
                        XL
                      </span>
                      <span className='badge border border-1 bg-white text-dark '>
                        XXXL
                      </span>
                    </div>
                  </div>
                  <div className='d-flex flex-column gap-10 mt-2 mb-3'>
                    <h6 className='product-heading'>Color :</h6>
                    <Color />
                  </div>
                  <div className='d-flex flex-row align-items-center gap-10 mt-2 '>
                    <h6 className='product-heading'>Quantity :</h6>
                    <div>
                      <input
                        type='number'
                        style={{
                          width: '50px',
                          padding: '5px 10px',
                          textAlign: 'center',
                        }}
                        className='form-control'
                        min={1}
                        defaultValue={1}
                      />
                    </div>
                    <div>
                      <button className='button mx-4'>Add To Cart</button>
                    </div>
                  </div>
                  <div className='d-flex align-items-center gap-30 mt-3 '>
                    <div className='additional-btns'>
                      <BsHeart size={20} />
                      <button className='normal-btn'>Add To Wishlist</button>
                    </div>
                    <div className='additional-btns'>
                      <TiArrowShuffle size={20} />
                      <button className='normal-btn'>Add To Compare</button>
                    </div>
                  </div>

                  <div className='accodion d-flex gap-10 align-items-center my-2'>
                    <MdOutlineLocalShipping size={20} />
                    <h6 className='product-heading'>Shipping & Returns :</h6>
                    <p className='product-data'>
                      Free shipping and returns available on all orders! <br />
                      We ship all US domestic orders within &nbsp;
                      <b> 5-10 business days!</b>
                    </p>
                  </div>
                  <div className='links d-flex gap-10 align-items-center my-2'>
                    <BsLink size={20} />
                    <button
                      className='normal-btn'
                      onClick={() => copyToClipboard(shareLink)}
                    >
                      <h6 className='product-heading'>Product Link</h6>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='description-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h4>Description</h4>
              <div className=' bg-white p-3' style={{ borderRadius: '10px' }}>
                <p className='mb-0'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Autem earum at consectetur impedit? Doloremque similique porro
                  nobis, officia vel quia voluptatum. Deleniti illum earum
                  aliquam sunt asperiores molestias! Similique tempore commodi
                  dolorem fugiat qui ea vero, necessitatibus, animi, quo id
                  iste? Explicabo impedit iure eius ipsam ad quam quae! Commodi!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='reviews-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h4>Reviews</h4>
              <div className='review-inner-wrapper'>
                <div className='review-head d-flex justify-content-between align-items-center'>
                  <div>
                    <h4 className='mb-2'>Customer reviews</h4>
                    <div className='d-flex  align-items-center gap-10'>
                      <StarRatings
                        rating={4}
                        starRatedColor='#febd69'
                        starDimension='20px'
                        starSpacing='2px'
                      />
                      <p className='mb-0'>Based on 2 Reviews</p>
                    </div>
                  </div>
                  <div>
                    <button
                      className='text-decoration-underline'
                      onClick={() => setToggleReview(!toggleReview)}
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
                {toggleReview && (
                  <div className='review-form' id='review'>
                    <h4>Write a Review</h4>
                    <form action='' className='d-flex flex-column gap-15'>
                      <div>
                        <StarRatings
                          rating={4}
                          starRatedColor='#febd69'
                          starDimension='20px'
                          starSpacing='2px'
                          changeRating={''}
                        />
                      </div>

                      <div>
                        <textarea
                          type='text'
                          className='form-control'
                          placeholder='Comment...'
                          rows='4'
                          cols='30'
                        ></textarea>
                      </div>
                      <div className='d-flex justify-content-end'>
                        <button className='button' type='submit'>
                          Submit Review
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className='reviews'>
                  <div className='review'>
                    <div className='d-flex gap-15 align-items-center'>
                      <h6 className='mb-0'>kajol raj</h6>
                      <StarRatings
                        rating={4}
                        starRatedColor='#febd69'
                        starDimension='20px'
                        starSpacing='2px'
                      />
                    </div>
                    <p className='mt-2'>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Velit sequi vel vero blanditiis, expedita quisquam autem
                      nulla. Tenetur, cupiditate. Voluptate.
                    </p>
                  </div>
                  <div className='review'>
                    <div className='d-flex gap-15 align-items-center'>
                      <h6 className='mb-0'>kajol raj</h6>
                      <StarRatings
                        rating={4}
                        starRatedColor='#febd69'
                        starDimension='20px'
                        starSpacing='2px'
                      />
                    </div>
                    <p className='mt-2'>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Velit sequi vel vero blanditiis, expedita quisquam autem
                      nulla. Tenetur, cupiditate. Voluptate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='popular-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Our Popular Products</h3>
            </div>
            <div className='row'>
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
