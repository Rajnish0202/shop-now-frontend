import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Spinner, TextSpinner } from '../../components/Loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  clearErrors,
  deleteCoupon,
  getAllCoupons,
} from '../../redux/actions/couponActions';
import moment from 'moment';
import { DELETE_COUPON_RESET } from '../../redux/constants/couponConstant';
import { toast } from 'react-toastify';

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
    title: 'Discount',
    dataIndex: 'discount',
    // sorter: (a, b) => {
    //   if (a.category.toLowerCase() < b.category.toLowerCase()) return -1;
    //   if (a.category.toLowerCase() > b.category.toLowerCase()) return 1;
    //   return 0;
    // },
  },
  {
    title: 'Expire',
    dataIndex: 'expire',
    // sorter: (a, b) => {
    //   if (a.brand.toLowerCase() < b.brand.toLowerCase()) return -1;
    //   if (a.brand.toLowerCase() > b.brand.toLowerCase()) return 1;
    //   return 0;
    // },
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  const { loading, coupons } = useSelector((state) => state.allCoupon);

  const {
    loading: deleteLoading,
    isDeleted,
    error,
    message,
  } = useSelector((state) => state.couponActions);

  const deleteHandler = (id) => {
    dispatch(deleteCoupon(id));
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Coupon',
      message: 'Are you sure you want to delete this coupon.',
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
  for (let i = 0; i < coupons.length; i++) {
    data.push({
      srn: i + 1,
      key: coupons[i]?._id,
      title: coupons[i]?.name,
      discount: coupons[i]?.discount,
      expire: (
        <div style={{ textAlign: 'center' }}>
          {`${moment(coupons[i].expiry).format('DD MMMM YYYY hh:mm:ss a')}`}
        </div>
      ),
      action: (
        <div className='d-flex align-items-center justify-content-center gap-4'>
          <Link
            to={`/admin/dashboard/edit-product/${coupons[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(coupons[i]?._id)}
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
      dispatch({ type: DELETE_COUPON_RESET });
      // dispatch(getBlogCategories());
    }
    dispatch(getAllCoupons());
  }, [dispatch, error, isDeleted, message]);

  return (
    <>
      <MetaData title='Coupon List' />
      <div>
        <h3 className='mb-4'>
          Coupon List (
          {coupons.length > 9
            ? coupons.length
            : coupons.length?.toString().padStart(2, '0')}
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

export default CouponList;
