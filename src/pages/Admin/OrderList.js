import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { BiDetail } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { Spinner } from '../../components/Loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { allOrders } from '../../redux/actions/orderActions';

const columns = [
  {
    title: 'SNo.',
    dataIndex: 'srn',
  },
  {
    title: 'Order By',
    dataIndex: 'orderby',
    sorter: (a, b) => {
      if (a.orderby.toLowerCase() < b.orderby.toLowerCase()) return -1;
      if (a.orderby.toLowerCase() > b.orderby.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Product Count',
    dataIndex: 'count',
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
    sorter: (a, b) => {
      if (a.payment.toLowerCase() < b.payment.toLowerCase()) return -1;
      if (a.payment.toLowerCase() > b.payment.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Amount',
    dataIndex: 'total',
    sorter: (a, b) => {
      if (a.total < b.total) return -1;
      if (a.total > b.total) return 1;
      return 0;
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const OrderList = () => {
  const dispatch = useDispatch();
  const { loading, adminOrders } = useSelector((state) => state.adminOrders);

  const deleteHandler = (id) => {
    console.log(id);
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Order',
      message: 'Are you sure you want to delete this order.',
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

  const data1 = [];
  for (let i = 0; i < adminOrders.length; i++) {
    data1.push({
      srn: i + 1,
      key: adminOrders[i]?._id,
      orderby: `${capitalizeText(
        adminOrders[i]?.orderby?.firstname
      )} ${capitalizeText(adminOrders[i]?.orderby?.lastname)}`,
      count: adminOrders[i]?.products?.length,
      payment: capitalizeText(adminOrders[i]?.paymentIntent?.method),
      total: `₹ ${
        adminOrders[i]?.totalAfterDiscount
          ? adminOrders[i]?.totalAfterDiscount
          : adminOrders[i]?.cartTotal
      }`,
      status: adminOrders[i]?.orderStatus,
      action: (
        <div className='d-flex align-items-center justify-content-center gap-2'>
          <Link
            to={`/admin/dashboard/order-details/${adminOrders[i]?._id}`}
            className='btn btn-primary d-flex align-items-center justify-content-center fs-5'
          >
            <BiDetail />
          </Link>

          <Link
            to={`/admin/dashboard/edit-product/${adminOrders[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(adminOrders[i]?._id)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    });
  }

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);
  return (
    <>
      <MetaData title='Orders' />

      <div>
        <h3 className='mb-4'>
          Orders (
          {adminOrders.length > 9
            ? adminOrders.length
            : adminOrders.length?.toString().padStart(2, '0')}
          )
        </h3>
        {loading && (
          <div className='my-4'>
            <Spinner />
          </div>
        )}
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
};

export default OrderList;
