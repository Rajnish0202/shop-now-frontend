import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { capitalizeText } from '../../utils/Capitalized';
import { getBlogCategoryDetails } from '../../redux/actions/blogCategoryActions';
import { clearErrors, updateAction } from '../../redux/actions/updateActions';
import { UPDATE_RESET } from '../../redux/constants/updateConstants';
import { getBrandDetails } from '../../redux/actions/brandAction';
import { getProductCategoryDetails } from '../../redux/actions/productCategoryAction';
import { getTypeDetails } from '../../redux/actions/productTypeAction';
import { getSizeDetails } from '../../redux/actions/sizeAction';

const UpdateOther = () => {
  const [title, setTitle] = useState('');

  const { category } = useSelector((state) => state.blogCategoryDetails);
  const { brand } = useSelector((state) => state.brandDetails);
  const { type } = useSelector((state) => state.typeDetails);
  const { size } = useSelector((state) => state.sizeDetails);
  const { category: productCategory } = useSelector(
    (state) => state.productCategoryDetails
  );
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateAction
  );

  const { page, id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!title) {
      return toast.error('Please Fill All Fields.');
    }

    const formData = new FormData();

    formData.set('title', title);

    dispatch(updateAction(id, formData, page));
  };

  const formClearHandler = () => {
    setTitle('');
  };

  useEffect(() => {
    if (id) {
      if (page === 'blog-category') {
        dispatch(getBlogCategoryDetails(id));
        setTitle(category?.title);
      }

      if (page === 'brand') {
        dispatch(getBrandDetails(id));
        setTitle(brand?.title);
      }

      if (page === 'product-category') {
        dispatch(getProductCategoryDetails(id));
        setTitle(productCategory?.title);
      }

      if (page === 'product-type') {
        dispatch(getTypeDetails(id));
        setTitle(type?.title);
      }

      if (page === 'product-size') {
        dispatch(getSizeDetails(id));
        setTitle(size?.title);
      }
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success(
        `Updated ${capitalizeText(page?.split('-')?.join(' '))} Successfully.`
      );

      navigate(
        `/admin/dashboard/${
          page?.split('-').length > 1 ? page?.split('-')[1] : page
        }-list`
      );
    }

    dispatch({ type: UPDATE_RESET });
  }, [
    dispatch,
    navigate,
    id,
    page,
    category?.title,
    error,
    isUpdated,
    brand?.title,
    productCategory?.title,
    type?.title,
    size?.title,
  ]);

  return (
    <>
      <MetaData title={`Update ${capitalizeText(page)}`} />
      <div>
        <h3 className='mb-4 text-capitalize'>{`Update ${page
          ?.split('-')
          ?.join(' ')}`}</h3>

        <div className='d-flex'>
          <form className='w-100' onSubmit={formSubmitHandler}>
            <div className='form-floating mb-3 w-100'>
              <input
                type='text'
                className='form-control form-border w-100'
                id='floatingInput'
                placeholder='Blog Title'
                name='title'
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor='floatingInput' className='text-capitalize'>
                Enter {page?.split('-')?.join(' ')} Title
              </label>
            </div>

            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3 my-3 text-capitalize'
                disabled={loading ? true : false}
              >
                {loading ? (
                  <TextSpinner />
                ) : (
                  `Update ${page?.split('-')?.join(' ')}`
                )}
              </button>
              <button
                type='button'
                className='btn btn-danger border-0 rounded-3 my-3'
                onClick={() => formClearHandler()}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateOther;
