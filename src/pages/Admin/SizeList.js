import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Spinner, TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';

import {
  clearErrors,
  deleteProductSize,
  getSizes,
} from '../../redux/actions/sizeAction';
import { DELETE_SIZE_RESET } from '../../redux/constants/sizesConstants';

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
    title: 'Action',
    dataIndex: 'action',
  },
];

const SizeList = () => {
  const { loading, productSizes } = useSelector((state) => state.productSizes);

  const {
    loading: deleteLoading,
    isDeleted,
    error,
    message,
  } = useSelector((state) => state.sizeActions);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteProductSize(id));
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Size',
      message: 'Are you sure you want to delete this size.',
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
  for (let i = 0; i < productSizes?.length; i++) {
    data.push({
      srn: i + 1,
      key: productSizes[i]?._id,
      title: productSizes[i]?.title,

      action: (
        <div className='d-flex align-items-center justify-content-center gap-4'>
          <Link
            to={`/admin/dashboard/edit/product-size/${productSizes[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(productSizes[i]?._id)}
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
      dispatch({ type: DELETE_SIZE_RESET });
    }
    dispatch(getSizes());
  }, [dispatch, error, message, isDeleted]);

  return (
    <>
      <MetaData title='Size List' />
      <div className='size-list'>
        <h3 className='mb-4'>
          Type List (
          {productSizes?.length > 9
            ? productSizes?.length
            : productSizes?.length?.toString().padStart(2, '0')}
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

export default SizeList;
