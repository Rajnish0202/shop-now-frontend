import React, { useState, useEffect } from 'react';
import MetaData from '../../utils/MetaData';

import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import {
  getMonthWiseOrderIncome,
  pendingOrders,
  getYearlyIncome,
} from '../../redux/actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { TextSpinner } from '../../components/Loader/Loader';

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
    title: 'Tax Price',
    dataIndex: 'tax',
    sorter: (a, b) => {
      if (a.tax < b.tax) return -1;
      if (a.tax > b.tax) return 1;
      return 0;
    },
  },
  {
    title: 'Shipping Price',
    dataIndex: 'shipping',
    sorter: (a, b) => {
      if (a.shipping < b.shipping) return -1;
      if (a.shipping > b.shipping) return 1;
      return 0;
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const Dashboard = () => {
  const [dataMonthly, setDataMonthly] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  const dispatch = useDispatch();
  const { loading, adminOrders } = useSelector((state) => state.adminOrders);
  const { loading: monthlyLoading, monthlyIncome } = useSelector(
    (state) => state.monthlyIncome
  );
  const { loading: yearlyLoading, yearlyIncome } = useSelector(
    (state) => state.yearlyIncome
  );

  const yearlyTotal =
    yearlyIncome[0]?.amount -
    yearlyIncome[0]?.taxPrice -
    yearlyIncome[0]?.shippingPrice;

  const data1 = [];
  for (let i = 0; i < adminOrders.length; i++) {
    data1.push({
      srn: i + 1,
      key: adminOrders[i]?._id,
      orderby: `${capitalizeText(
        adminOrders[i]?.orderby?.firstname
      )} ${capitalizeText(adminOrders[i]?.orderby?.lastname)}`,
      count: adminOrders[i]?.products?.length,
      payment:
        adminOrders[i]?.paymentIntent?.method === 'Stripe' ? 'Online' : 'COD',
      total: `₹ ${adminOrders[i]?.paymentIntent?.amount}`,
      tax: `₹ ${adminOrders[i]?.paymentIntent?.taxPrice}`,
      shipping: `₹ ${adminOrders[i]?.paymentIntent?.shippingPrice}`,
      status:
        adminOrders[i]?.orderStatus === 'Not Processed'
          ? 'Pending'
          : adminOrders[i]?.orderStatus,
    });
  }

  useEffect(() => {
    dispatch(getMonthWiseOrderIncome());
    dispatch(getYearlyIncome());
    dispatch(pendingOrders());
  }, [dispatch]);

  useEffect(() => {
    let monthNames = [
      ' ',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let data = [];
    let monthlyCount = [];
    for (let i = 0; i <= monthlyIncome?.length; i++) {
      const element = monthlyIncome[i];

      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount - element?.taxPrice - element?.shippingPrice,
      });

      monthlyCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }

    setDataMonthly(data);
    setMonthlySales(monthlyCount);
  }, [monthlyIncome]);

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => {
      return '#ffd333';
    },
    label: {
      position: 'middle',
      style: {
        fill: '#000000',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };

  const config2 = {
    data: monthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return '#ffd333';
    },
    label: {
      position: 'middle',
      style: {
        fill: '#000000',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };

  return (
    <>
      <MetaData title='Dashboard' />
      <div>
        <h3 className='mb-4'>Dashboard</h3>
        <div className='d-flex justify-content-between align-items-center gap-3'>
          <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
            <div>
              <p className=''>Total Income</p>
              <h4 className='mb-0'>₹ {yearlyTotal.toFixed(2)}</h4>
            </div>
            <div className='d-flex flex-column align-items-end'>
              <p className='mb-0'>Income in Last Year before Today</p>
            </div>
          </div>
          <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
            <div>
              <p className=''>Total Sales</p>
              <h4 className='mb-0'>{yearlyIncome[0]?.count}</h4>
            </div>
            <div className='d-flex flex-column align-items-end'>
              <p className='mb-0'>Sales in Last Year before Today</p>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between gap-3'>
          <div className='mt-4 flex-grow-1 w-50'>
            {monthlyLoading && <TextSpinner />}
            <h3 className='mb-4'>Income Statics</h3>
            <div>
              <Column {...config} />
            </div>
          </div>
          <div className='mt-4 flex-grow-1 w-50'>
            {yearlyLoading && <TextSpinner />}
            <h3 className='mb-4'>Sales Statics</h3>
            <div>
              <Column {...config2} />
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <h3 className='mb-4'>Recent Orders</h3>
          <div>
            {loading && <TextSpinner />}
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
        {/* <div className="my-4">
          <h3 className="mb-4">Recent Reviews</h3>
          <div className='d-flex'>
            <div></div>
            <div></div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
