import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import { Spinner } from '../../components/Loader/Loader';
import { allUserOrders } from '../../redux/actions/orderActions';
import MetaData from '../../utils/MetaData';
import { shortenText } from '../../utils/ShortenText';
import { capitalizeText } from '../../utils/Capitalized';
import { BiDetail } from 'react-icons/bi';
import { Table } from 'antd';

const columns = [
  {
    title: 'SNo.',
    dataIndex: 'srn',
  },
  {
    title: 'Product List',
    dataIndex: 'productList',
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

const Orders = () => {
  const { loading, orders } = useSelector((state) => state.allOrders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userName = `${user.firstname}${user.lastname}`;

  const data1 = [];
  for (let i = 0; i < orders.length; i++) {
    data1.push({
      srn: i + 1,
      key: orders[i]?._id,
      productList: (
        <ul className='mb-0'>
          {orders[i]?.products?.map((item) => {
            return (
              <li
                className='mb-0'
                style={{ listStyle: 'outside' }}
                key={item?.product?._id}
              >
                {shortenText(item?.product?.title, 35)}
              </li>
            );
          })}
        </ul>
      ),
      count: orders[i]?.products?.length,
      payment: orders[i]?.paymentIntent?.method === 'Stripe' ? 'Online' : 'COD',
      total: `₹ ${
        orders[i]?.totalAfterDiscount
          ? orders[i]?.totalAfterDiscount
          : orders[i]?.cartTotal
      }`,
      status: orders[i]?.orderStatus,
      action: (
        <div className='d-flex align-items-center justify-content-center gap-2'>
          <Link
            to={`/user-orders/${orders[i]?._id}`}
            className='btn btn-primary d-flex align-items-center justify-content-center fs-5'
          >
            <BiDetail />
          </Link>
        </div>
      ),
    });
  }

  useEffect(() => {
    dispatch(allUserOrders());
  }, [dispatch]);

  return (
    <>
      <MetaData title='My Orders' />
      <BreadCrumb title='My Orders' />
      <div className='home-wrapper-2 p-4'>
        <h3 className='text-center'>
          {capitalizeText(userName)}'s Orders List
        </h3>
        {loading ? (
          <Spinner />
        ) : (
          <div className='col-12 px-4'>
            <Table columns={columns} dataSource={data1} />
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
