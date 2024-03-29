import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { shortenText } from '../../utils/ShortenText';
import { capitalizeText } from '../../utils/Capitalized';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { BsCloudUpload } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Spinner, TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import {
  clearErrors,
  deleteProductType,
  getTypes,
} from '../../redux/actions/productTypeAction';
import { DELETE_TYPE_RESET } from '../../redux/constants/productTypeConstants';

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

const TypeList = () => {
  const { loading, types } = useSelector((state) => state.productType);

  const {
    loading: deleteLoading,
    isDeleted,
    error,
    message,
  } = useSelector((state) => state.typeActions);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteProductType(id));
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Type',
      message: 'Are you sure you want to delete this type.',
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
  for (let i = 0; i < types.length; i++) {
    data.push({
      srn: i + 1,
      key: types[i]?._id,
      title: capitalizeText(shortenText(types[i]?.title, 20)),
      slug: types[i]?.slug,
      image: (
        <img
          style={{
            width: '60px',
            height: '80px',
            display: 'block',
            margin: 'auto',
          }}
          src={types[i]?.image?.url}
          alt={types[i]?.image?.url}
        />
      ),

      action: (
        <div className='d-flex align-items-center justify-content-center gap-4'>
          <Link
            to={`/admin/dashboard/upload-image/type/${types[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
            title='Upload Images'
          >
            <BsCloudUpload />
          </Link>
          <Link
            to={`/admin/dashboard/edit/product-type/${types[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
            title='Update Type'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(types[i]?._id)}
            title='Delete Type'
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
      dispatch({ type: DELETE_TYPE_RESET });
    }
    dispatch(getTypes());
  }, [dispatch, error, message, isDeleted]);

  return (
    <>
      <MetaData title='Type List' />
      <div>
        <h3 className='mb-4'>
          Type List (
          {types.length > 9
            ? types.length
            : types.length?.toString().padStart(2, '0')}
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

export default TypeList;
