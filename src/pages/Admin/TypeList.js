import React from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { shortenText } from '../../utils/ShortenText';
import { capitalizeText } from '../../utils/Capitalized';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Spinner } from '../../components/Loader/Loader';

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

  const deleteHandler = (id) => {
    console.log(id);
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
            to={`/admin/dashboard/edit-product/${types[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(types[i]?._id)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    });
  }
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
