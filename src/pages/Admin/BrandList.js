import React from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { shortenText } from '../../utils/ShortenText';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Spinner } from '../../components/Loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

  const deleteHandler = (id) => {
    console.log(id);
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
  for (let i = 0; i < productBrands.length; i++) {
    data.push({
      srn: i + 1,
      key: productBrands[i]?._id,
      title: shortenText(productBrands[i]?.title, 20),
      logo: (
        <img
          style={{ width: '80px', display: 'block', margin: 'auto' }}
          src={productBrands[i]?.logo?.url}
          alt={productBrands[i]?.logo?.url}
        />
      ),

      action: (
        <div className='d-flex align-items-center gap-4 justify-content-center'>
          <Link
            to={`/admin/dashboard/edit-product/${productBrands[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(productBrands[i]?._id)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    });
  }
  return (
    <>
      <MetaData title='Brand List' />
      <div>
        <h3 className='mb-4'>
          Brand List (
          {productBrands.length > 9
            ? productBrands.length
            : productBrands.length?.toString().padStart(2, '0')}
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