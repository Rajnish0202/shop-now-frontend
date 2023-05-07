import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import { capitalizeText } from '../../utils/Capitalized';
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
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => {
      if (a.category.toLowerCase() < b.category.toLowerCase()) return -1;
      if (a.category.toLowerCase() > b.category.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => {
      if (a.brand.toLowerCase() < b.brand.toLowerCase()) return -1;
      if (a.brand.toLowerCase() > b.brand.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter: (a, b) => {
      if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
      if (a.type.toLowerCase() > b.type.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => {
      if (
        +a.price.split('').splice(2).join('') <
        +b.price.split('').splice(2).join('')
      )
        return 1;
      if (
        +a.price.split('').splice(2).join('') >
        +b.price.split('').splice(2).join('')
      )
        return -1;
      return 0;
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);

  const deleteHandler = (id) => {
    console.log(id);
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product.',
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
  for (let i = 0; i < products.length; i++) {
    data1.push({
      srn: i + 1,
      key: products[i]?._id,
      title: shortenText(products[i]?.title, 20),
      category: capitalizeText(products[i]?.category?.title),
      brand: capitalizeText(products[i]?.brand?.title),
      type: capitalizeText(products[i]?.type?.title),
      price: `₹ ${products[i]?.price}`,
      action: (
        <div className='d-flex align-items-center justify-content-between'>
          <Link
            to={`/admin/dashboard/edit-product/${products[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(products[i]?._id)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    });
  }

  useEffect(() => {
    dispatch(
      getProducts(
        '',
        0,
        null,
        null,
        null,
        [0, 100000],
        null,
        0,
        null,
        null,
        null
      )
    );
  }, [dispatch]);

  return (
    <>
      <MetaData title='Product List' />
      <div>
        <h3 className='mb-4'>
          Product List (
          {products.length > 9
            ? products.length
            : products.length?.toString().padStart(2, '0')}
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

export default ProductList;