import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CREATE_PRODUCT_RESET } from '../../redux/constants/productConstants';
import { clearErrors, createProduct } from '../../redux/actions/productActions';

const AddProduct = () => {
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
  const [offer, setOffer] = useState('');
  const [specialTime, setSpecialTime] = useState('');

  let special = {};

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
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !title ||
      !category ||
      !desc ||
      !brand ||
      !type ||
      !color.length >= 1 ||
      !price ||
      !quantity
    ) {
      return toast.error('Please Fill All Fields.');
    }

    console.log(Date.parse(specialTime), Date.now());

    if (isSpecial && !offer && !specialTime) {
      return toast.error('Please Fill Offer and Special Time');
    } else if (isSpecial && !offer && specialTime) {
      return toast.error('Please Fill Offer');
    } else if (isSpecial && offer && !specialTime) {
      return toast.error('Please Fill Special Time');
    } else if (isSpecial && offer && Date.parse(specialTime) <= Date.now()) {
      return toast.error('Special Time must be greater than Now.');
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

    dispatch(createProduct(productData));
  };

  const formClearHandler = () => {
    setTitle('');
    setCategory('');
    setDesc();
    setBrand();
    setPrice(0);
    setQuantity(1);
    setType();
    setColor([]);
    setSize([]);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Product Created Successfully.');
      navigate('/admin/dashboard/product-list');
      dispatch({ type: CREATE_PRODUCT_RESET });
    }

    // dispatch(getProductCategories());
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <MetaData title='Add Product' />
      <div>
        <h3 className='mb-4'>Add Product</h3>

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
                value={title}
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
                <option value={''}>Select Category</option>;
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
                <option value={''}>Select Type</option>;
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
                <option value={'select'}>Select Brand</option>;
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
            <div className='form-floating' id='floatingSize'>
              <label
                htmlFor='floatingSize'
                style={{
                  top: '-12px',
                  fontSize: '14px',
                }}
              >
                Select Size
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

            <div className='form-floating' id='floatingColor'>
              <label
                html='floatingColor'
                className='custom_label'
                style={{
                  top: '-12px',
                  fontSize: '14px',
                }}
              >
                Select Color*
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
                <label className='form-check-label'>Add Special</label>
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
                  <label htmlFor='floatingInput'>Enter Offer </label>
                </div>
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
                modules={AddProduct.modules}
                formats={AddProduct.formats}
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
                {loadingProduct ? <TextSpinner /> : 'Add Product'}
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

AddProduct.modules = {
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

AddProduct.formats = [
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

export default AddProduct;
