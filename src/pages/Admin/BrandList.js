import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { shortenText } from '../../utils/ShortenText';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Spinner, TextSpinner } from '../../components/Loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BsCloudUpload } from 'react-icons/bs';

import { toast } from 'react-toastify';
import {
  clearErrors,
  deleteProductBrand,
  getBrands,
} from '../../redux/actions/brandAction';
import { DELETE_BRAND_RESET } from '../../redux/constants/productBrand';

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
    title: 'Logo',
    dataIndex: 'logo',
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const BrandList = () => {
  const { loading, productBrands } = useSelector((state) => state.productBrand);
  const {
    loading: deleteLoading,
    isDeleted,
    error,
    message,
  } = useSelector((state) => state.brandActions);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteProductBrand(id));
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Brand',
      message: 'Are you sure you want to delete this brand.',
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
  for (let i = 0; i < productBrands?.length; i++) {
    data.push({
      srn: i + 1,
      key: productBrands[i]?._id,
      title: shortenText(productBrands[i]?.title, 20),
      logo: (
        <img
          style={{
            width: '80px',
            display: 'block',
            margin: 'auto',
          }}
          src={productBrands[i]?.logo?.url}
          alt={productBrands[i]?.logo?.url}
        />
      ),

      action: (
        <div className='d-flex align-items-center gap-4 justify-content-center'>
          <Link
            to={`/admin/dashboard/upload-image/brand/${productBrands[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
            title='Upload Images'
          >
            <BsCloudUpload />
          </Link>
          <Link
            to={`/admin/dashboard/edit-product/${productBrands[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
            title='Update Brand'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(productBrands[i]?._id)}
            title='Delete Brand'
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
      dispatch({ type: DELETE_BRAND_RESET });
    }
    dispatch(getBrands());
  }, [dispatch, error, message, isDeleted]);

  return (
    <>
      <MetaData title='Brand List' />
      <div>
        <h3 className='mb-4'>
          Brand List (
          {productBrands?.length > 9
            ? productBrands?.length
            : productBrands?.length?.toString().padStart(2, '0')}
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

export default BrandList;
