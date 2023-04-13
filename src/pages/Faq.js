import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFaqs } from '../redux/actions/faqActions';
import MetaData from '../utils/MetaData';
import BreadCrumb from '../components/BreadCrumb';
import { Spinner } from '../components/Loader/Loader';

const Faq = () => {
  const [limit, setLimit] = useState(5);
  const [category, setCategory] = useState('64378f9012d1f706b4b59505');

  const { faqs, loading, faqCategories } = useSelector((state) => state.faqs);
  const {
    faqCategory,
    counts,
    loading: faqLoading,
  } = useSelector((state) => state.faqCategories);
  const dispatch = useDispatch();

  const faqTitle = faqCategory?.find((cat) => cat?._id === category);
  const faqCategoryCount = faqCategories?.find(
    (count) => count?._id === category
  );

  useEffect(() => {
    dispatch(getAllFaqs(limit, category));
  }, [dispatch, limit, category]);

  return (
    <>
      <MetaData title="FAQ's" />
      <BreadCrumb title="FAQ's" />
      <div className='home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <h3 className='text-center mb-4'>
              FAQs (
              {faqs?.faqCount > 10
                ? faqs?.faqCount
                : faqs?.faqCount?.toString().padStart(2, '0')}
              )
            </h3>
            <div className='col-12 d-flex gap-15'>
              <div className='col-3'>
                <div className='filter-card'>
                  {faqLoading && <Spinner />}
                  <h3 className='filter-title'>
                    Shop by categories (
                    {counts > 10 ? counts : counts?.toString().padStart(2, '0')}
                    )
                  </h3>
                  {faqCategory && (
                    <ul className='ps-0'>
                      {faqCategory?.map((curCategory) => {
                        return (
                          <li
                            key={curCategory?.slug}
                            className='px-2 mb-2 fs-6'
                            onClick={() => setCategory(curCategory?._id)}
                            style={{
                              border: `${
                                category === curCategory?._id
                                  ? '2px solid #bf4800'
                                  : ''
                              }`,
                              textAlign: `${
                                category === curCategory?._id ? 'center' : ''
                              }`,
                              transition: `${
                                category === curCategory?._id
                                  ? 'all 1s linear ease-in-out'
                                  : ''
                              }`,
                            }}
                          >
                            {curCategory?.title}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>

              <div className='product-card '>
                <div className='col-9 w-100'>
                  <h5 className='text-center py-2'>
                    <u>{faqTitle?.title}</u>
                  </h5>
                  <div className='accordion' id='accordionExample'>
                    {loading && <Spinner />}

                    {faqs && faqs?.allFaq?.length === 0 ? (
                      <p className='text-center my-4 fs-5'>No FAQs Found</p>
                    ) : (
                      faqs?.allFaq?.map((faq, i) => {
                        return (
                          <div className='accordion-item' key={i}>
                            <h2 className='accordion-header' id='headingOne'>
                              <button
                                className='accordion-button'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target={'#collapseOne' + i}
                                aria-expanded='false'
                                aria-controls='collapseOne'
                              >
                                {faq?.question}
                              </button>
                            </h2>
                            <div
                              id={'collapseOne' + i}
                              className='accordion-collapse collapse'
                              aria-labelledby='headingOne'
                              data-bs-parent='#accordionExample'
                            >
                              <div className='accordion-body'>
                                <strong>{faq?.answer}</strong>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {limit < faqCategoryCount?.number_of_faq && (
                    <div className='d-flex align-items-center justify-content-center mt-2'>
                      <button
                        className='button'
                        onClick={() => setLimit((prev) => prev + 5)}
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
