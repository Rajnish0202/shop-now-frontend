import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Spinner, TextSpinner } from '../../components/Loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import {
  clearErrors,
  deleteProductCategory,
  getProductCategories,
} from '../../redux/actions/productCategoryAction';
import { DELETE_PRODUCT_CATEGORY_RESET } from '../../redux/constants/productCategory';

const columns = [
  {
    title: 'SNo.',
    dataIndex: 'srn',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    sorter: (a, b) => {
      if (a.slug.toLowerCase() < b.slug.toLowerCase()) return -1;
      if (a.slug.toLowerCase() > b.slug.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Image',
    dataIndex: 'image',
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ProductCategoryList = () => {
  const { loading, productCategories } = useSelector(
    (state) => state.productCategories
  );

  const {
    loading: deleteLoading,
    isDeleted,
    error,
    message,
  } = useSelector((state) => state.productCategoryAction);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteProductCategory(id));
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Category',
      message: 'Are you sure you want to delete this category.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => deleteHandler(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No'),
        },
      ],
    });
  };

  const data = [];
  for (let i = 0; i < productCategories.length; i++) {
    data.push({
      srn: i + 1,
      key: productCategories[i]?._id,
      title: capitalizeText(productCategories[i]?.slug),
      slug: productCategories[i]?.slug,
      image: (
        <img
          style={{ width: '80px', display: 'block', margin: 'auto' }}
          src={productCategories[i]?.image?.url}
          alt={productCategories[i]?.image?.url}
        />
      ),
      action: (
        <div className='d-flex align-items-center justify-content-center gap-4'>
          <Link
            to={`/admin/dashboard/edit-product/${productCategories[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(productCategories[i]?._id)}
          >
            {deleteLoading ? <TextSpinner /> : <MdDelete />}
          </button>
        </div>
      ),
    });
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      dispatch({ type: DELETE_PRODUCT_CATEGORY_RESET });
      dispatch(getProductCategories());
    }
  }, [dispatch, error, message, isDeleted]);

  return (
    <>
      <MetaData title='Product Category List' />
      <div>
        <h3 className='mb-4'>
          Product Category List (
          {productCategories.length > 9
            ? productCategories.length
            : productCategories.length?.toString().padStart(2, '0')}
          )
        </h3>
        {loading && (
          <div className='my-4'>
            <Spinner />
          </div>
        )}
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </>
  );
};

export default ProductCategoryList;
