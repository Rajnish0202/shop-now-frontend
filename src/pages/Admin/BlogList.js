import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { shortenText } from '../../utils/ShortenText';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Spinner } from '../../components/Loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getAllBlogs } from '../../redux/actions/blogActions';

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
    title: 'Action',
    dataIndex: 'action',
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  const { loading, blogs } = useSelector((state) => state.allBlogs);

  const deleteHandler = (id) => {
    console.log(id);
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Blog',
      message: 'Are you sure you want to delete this blog.',
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
  for (let i = 0; i < blogs?.allBlog?.length; i++) {
    data.push({
      srn: i + 1,
      key: blogs?.allBlog[i]?._id,
      title: capitalizeText(shortenText(blogs?.allBlog[i]?.title, 20)),
      category: capitalizeText(blogs?.allBlog[i]?.category?.title),

      action: (
        <div className='d-flex align-items-center justify-content-center gap-4'>
          <Link
            to={`/admin/dashboard/edit-product/${blogs?.allBlog[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(blogs?.allBlog[i]?._id)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    });
  }

  useEffect(() => {
    dispatch(getAllBlogs(0, null));
  }, [dispatch]);

  return (
    <>
      <MetaData title='Blog List' />
      <div>
        <h3 className='mb-4'>
          Blog List (
          {blogs?.allBlog?.length > 9
            ? blogs?.allBlog?.length
            : blogs?.allBlog?.length?.toString().padStart(2, '0')}
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

export default BlogList;
