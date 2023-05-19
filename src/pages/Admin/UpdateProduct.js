import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { productDetails } from '../../redux/actions/productActions';
import moment from 'moment';

const UpdateProduct = () => {
  const { product } = useSelector((state) => state.productDetails);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [type, setType] = useState();
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [isSpecial, setIsSpecial] = useState(false);
  const [offer, setOffer] = useState(0);
  const [specialTime, setSpecialTime] = useState('');

  let special = {};

  const { slug } = useParams();
  const dispatch = useDispatch();
  const { loading, productCategories } = useSelector(
    (state) => state.productCategories
  );

  const { loading: loadingBrand, productBrands } = useSelector(
    (state) => state.productBrand
  );

  const { loading: loadingType, types } = useSelector(
    (state) => state.productType
  );

  const { loading: loadingSize, productSizes } = useSelector(
    (state) => state.productSizes
  );

  const { loading: loadingColor, colors } = useSelector(
    (state) => state.productColors
  );

  const {
    loading: loadingProduct,
    error,
    success,
  } = useSelector((state) => state.newProduct);

  const navigate = useNavigate();

  const handleColor = (e) => {
    const { checked, value } = e.currentTarget;

    setColor((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  const handleSize = (e) => {
    const { checked, value } = e.currentTarget;
    setSize((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  const specialHandler = (e) => {
    const { checked } = e.currentTarget;

    setIsSpecial(checked ? true : false);

    if (checked === false) {
      setSpecialTime(undefined);
      setOffer(undefined);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    console.log(!size.length >= 1 || !product?.sizes?.length >= 1);
    console.log(!size.length >= 1);
    console.log(product?.sizes?.length >= 1);

    if (
      !title ||
      !price ||
      !quantity ||
      !category ||
      !brand ||
      !type ||
      !color.length >= 1
    ) {
      return toast.error('Please Fill All Fields.');
    }

    if (product?.sizes?.length >= 1 && !size.length >= 1) {
      return toast.error('Please Select Size');
    }

    if (isSpecial) {
      return toast.error('Please Fill Offer and Special Time');
    }

    special = {
      isSpecial,
      offer,
      specialTime,
    };

    const productData = new FormData();

    productData.set('title', title);
    productData.set('description', desc);
    productData.set('price', price);
    productData.set('category', category);
    productData.set('quantity', quantity);
    for (let i = 0; i < color.length; i++) {
      productData.append('color[]', color[i]);
    }
    productData.set('brand', brand);
    productData.set('type', type);
    for (let j = 0; j < size.length; j++) {
      productData.append('sizes[]', size[j]);
    }

    let keyName;
    for (let key in special) {
      if (special.hasOwnProperty(key)) {
        keyName = ['special', '[', key, ']'].join('');
        productData.append(keyName, special[key]);
      }
    }

    console.log(...productData);
  };

  const formClearHandler = () => {
    setTitle('');
    setCategory('');
    setDesc('');
    setBrand('');
    setPrice(0);
    setQuantity(1);
    setType('');
    setColor([]);
    setSize([]);
    setIsSpecial(false);
    setSpecialTime('');
    setOffer('');
  };

  useEffect(() => {
    if (slug) {
      dispatch(productDetails(slug));
      setTitle(product?.title);
      setPrice(product?.price);
      setQuantity(product?.quantity);
      setBrand(product?.brand?._id);
      setCategory(product?.category?._id);
      setDesc(product?.description);
      setType(product?.type?._id);
      setIsSpecial(product?.special?.isSpecial);
      setOffer(product?.special?.offer);
      setOffer(product?.special?.offer);
      setSpecialTime(product?.special?.specialTime);
      if (product?.special?.isSpecial) {
        document.getElementById('check3').checked = product?.special?.isSpecial;
      } else {
        document.getElementById('check3').checked = product?.special?.isSpecial;
      }
    }

    // if (error) {
    //   toast.error(error);
    //   dispatch(clearErrors());
    // }

    // if (success) {
    //   toast.success('Product Created Successfully.');
    //   navigate('/admin/dashboard/product-list');
    //   dispatch({ type: CREATE_PRODUCT_RESET });
    // }

    // dispatch(getProductCategories());
  }, [
    dispatch,
    error,
    success,
    navigate,
    slug,
    product?.title,
    product?.price,
    product?.quantity,
    product?.brand?._id,
    product?.category?._id,
    product?.type?._id,
    product?.description,
    product?.special?.isSpecial,
    product?.special?.offer,
    product?.special?.specialTime,
  ]);

  return (
    <>
      <MetaData title='Update Product' />
      <div>
        <h3 className='mb-4'>Update Product</h3>

        <div className='d-flex'>
          <form
            className='w-100'
            onSubmit={formSubmitHandler}
            encType='application/json'
          >
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
              <label htmlFor='floatingInput'>Enter Product Title*</label>
            </div>
            <div className='form-floating mb-3 w-100'>
              <input
                type='number'
                className='form-control form-border w-100'
                id='floatingInput'
                placeholder='Product Price'
                name='price'
                value={price}
                min={1}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor='floatingInput'>Enter Product Price* (₹)</label>
            </div>
            <div className='form-floating mb-3 w-100'>
              <input
                type='number'
                className='form-control form-border w-100'
                id='floatingInput'
                placeholder='Product Quantity'
                name='quantity'
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <label htmlFor='floatingInput'>Enter Product Quantity*</label>
            </div>
            <div className='form-floating mb-3 w-100'>
              {loading && <TextSpinner />}
              <select
                className='form-select w-100'
                id='floatingSelect'
                aria-label='Floating label select example'
                style={{ cursor: 'pointer' }}
                name='category'
                onClick={(e) => setCategory(e.target.value)}
              >
                {slug ? (
                  <option value={product?.category?._id}>
                    {product?.category?.title}
                  </option>
                ) : (
                  <option value={''}>Select Category</option>
                )}
                {productCategories &&
                  productCategories?.map((category) => {
                    return (
                      <option key={category?._id} value={category?._id}>
                        {capitalizeText(category?.title)}
                      </option>
                    );
                  })}
              </select>
              <label htmlFor='floatingSelect'>Category*</label>
            </div>
            <div className='form-floating mb-3 w-100'>
              {loadingType && <TextSpinner />}
              <select
                className='form-select w-100'
                id='floatingSelect'
                aria-label='Floating label select example'
                style={{ cursor: 'pointer' }}
                name='type'
                onClick={(e) => setType(e.target.value)}
              >
                {slug ? (
                  <option value={product?.type?._id}>
                    {product?.type?.title}
                  </option>
                ) : (
                  <option value={''}>Select Type</option>
                )}
                {types &&
                  types?.map((type) => {
                    return (
                      <option key={type?._id} value={type?._id}>
                        {capitalizeText(type?.title)}
                      </option>
                    );
                  })}
              </select>
              <label htmlFor='floatingSelect'>Type*</label>
            </div>
            <div className='form-floating mb-3 w-100'>
              {loadingBrand && <TextSpinner />}
              <select
                className='form-select w-100'
                id='floatingSelect'
                aria-label='Floating label select example'
                style={{ cursor: 'pointer' }}
                name='brand'
                onClick={(e) => setBrand(e.target.value)}
              >
                {slug ? (
                  <option value={product?.brand?._id}>
                    {product?.brand?.title}
                  </option>
                ) : (
                  <option value={''}>Select Brand</option>
                )}
                {productBrands &&
                  productBrands?.map((brand) => {
                    return (
                      <option key={brand?._id} value={brand?._id}>
                        {capitalizeText(brand?.title)}
                      </option>
                    );
                  })}
              </select>
              <label htmlFor='floatingSelect'>Brand*</label>
            </div>

            {slug && product?.sizes?.length >= 1 && (
              <div className='form-floating' id='floatingPreviousSize'>
                <label
                  htmlFor='floatingPreviousSize'
                  style={{
                    top: '-12px',
                    fontSize: '14px',
                  }}
                >
                  Previously Selected Size
                </label>
                <div className='product_check d-flex align-items-center justify-content-between my-3 flex-wrap py-4'>
                  {slug &&
                    product &&
                    product?.sizes?.map((size) => {
                      return (
                        <div className='form-check mt-2' key={size?._id}>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='check3'
                            name={size?.title}
                            value={size?._id}
                            defaultChecked
                            readOnly
                          />
                          <label className='form-check-label'>
                            {size?.title}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {slug && product?.sizes?.length > 0 && (
              <div className='form-floating' id='floatingSize'>
                <label
                  htmlFor='floatingSize'
                  style={{
                    top: '-12px',
                    fontSize: '14px',
                  }}
                >
                  Update Size
                </label>
                <div className='product_check d-flex align-items-center justify-content-between my-3 flex-wrap py-4'>
                  {loadingSize && <TextSpinner />}
                  {productSizes &&
                    productSizes?.map((size) => {
                      return (
                        <div className='form-check mt-2' key={size?._id}>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='check1'
                            name={size?.title}
                            value={size?._id}
                            onClick={handleSize}
                          />
                          <label className='form-check-label'>
                            {size?.title}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            <div className='form-floating' id='floatingPreviousColor'>
              <label
                html='floatingPreviousColor'
                className='custom_label'
                style={{
                  top: '-12px',
                  fontSize: '14px',
                }}
              >
                Previously Selected Color
              </label>
              <div className='product_check d-flex align-items-center mb-3 flex-wrap product_color gap-3 py-4'>
                {slug &&
                  product &&
                  product?.color?.map((color) => {
                    return (
                      <div className='form-check mt-2' key={color?._id}>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          id='check4'
                          name={color?.title}
                          value={color?._id}
                          checked
                          readOnly
                        />
                        <label
                          title={capitalizeText(color?.title)}
                          className='form-check-label'
                          style={{
                            background: `${color?.hex}`,
                            height: '1.5rem',
                            width: '1.5rem',
                            borderRadius: '100%',
                            border: `${
                              color?.hex.includes('#fff')
                                ? '1px solid #000'
                                : 'none'
                            }`,
                          }}
                        ></label>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className='form-floating' id='floatingColor'>
              <label
                html='floatingColor'
                className='custom_label'
                style={{
                  top: '-12px',
                  fontSize: '14px',
                }}
              >
                Update Color*
              </label>
              <div className='product_check d-flex align-items-center mb-3 flex-wrap product_color gap-3 py-4'>
                {loadingColor && <TextSpinner />}
                {colors &&
                  colors?.map((color) => {
                    return (
                      <div className='form-check mt-2' key={color?._id}>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          id='check2'
                          name={color?.title}
                          value={color?._id}
                          onClick={handleColor}
                        />
                        <label
                          title={capitalizeText(color?.title)}
                          className='form-check-label'
                          style={{
                            background: `${color?.hex}`,
                            height: '1.5rem',
                            width: '1.5rem',
                            borderRadius: '100%',
                            border: `${
                              color?.hex.includes('#fff')
                                ? '1px solid #000'
                                : 'none'
                            }`,
                          }}
                        ></label>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className='product_check d-flex align-items-center justify-content-between mb-3 flex-wrap'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='check3'
                  onClick={specialHandler}
                />
                <label className='form-check-label'>Update Special</label>
              </div>
            </div>

            {isSpecial && (
              <>
                <div className='form-floating mb-3 w-100'>
                  <input
                    type='number'
                    className='form-control form-border w-100'
                    id='floatingInput'
                    name='offer'
                    value={offer}
                    min={1}
                    onChange={(e) => setOffer(e.target.value)}
                  />
                  <label htmlFor='floatingInput'>Enter Offer (e.g. 20) </label>
                </div>

                {slug &&
                  product?.special?.specialTime &&
                  specialTime !== undefined && (
                    <div className='form-floating mb-3 w-100'>
                      <input
                        type='text'
                        className='form-control form-border w-100'
                        id='floatingInput'
                        value={moment(product?.special?.specialTime).format(
                          'DD MMMM YYYY hh:mm:ss a'
                        )}
                        readOnly
                      />
                      <label htmlFor='floatingInput'>
                        Previous Special Date
                      </label>
                    </div>
                  )}

                <div className='form-floating mb-3 w-100'>
                  <input
                    type='datetime-local'
                    className='form-control form-border w-100'
                    id='floatingInput'
                    name='specialTime'
                    value={specialTime}
                    onChange={(e) => setSpecialTime(e.target.value)}
                  />
                  <label htmlFor='floatingInput'>Enter Offer Time </label>
                </div>
              </>
            )}

            <div className='mb-3 w-100'>
              <ReactQuill
                theme='snow'
                value={desc}
                onChange={setDesc}
                modules={UpdateProduct.modules}
                formats={UpdateProduct.formats}
                className='w-100'
                placeholder='Enter Description*...'
                name='description'
              />
            </div>
            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3 my-3'
                disabled={loadingProduct ? true : false}
              >
                {loadingProduct ? <TextSpinner /> : 'Update Product'}
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

UpdateProduct.modules = {
  toolbar: [
    [{ header: 1 }, { header: 2 }],
    [{ font: [] }],

    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};

UpdateProduct.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];

export default UpdateProduct;
