import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { shortenText } from '../../utils/ShortenText';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { BsCloudUpload } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Spinner, TextSpinner } from '../../components/Loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  clearErrors,
  getAllBlogs,
  deleteBlog,
} from '../../redux/actions/blogActions';
import { toast } from 'react-toastify';
import { DELETE_BLOG_RESET } from '../../redux/constants/blogConstants';

const columns = [
  {
    title: 'SNo.',
    dataIndex: 'srn',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => {
      if (
        a.title.props.children.toLowerCase() <
        b.title.props.children.toLowerCase()
      )
        return -1;
      if (
        a.title.props.children.toLowerCase() >
        b.title.props.children.toLowerCase()
      )
        return 1;
      // return 0;
    },
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => {
      if (
        a.category.props.children.toLowerCase() <
        b.category.props.children.toLowerCase()
      )
        return -1;
      if (
        a.category.props.children.toLowerCase() >
        b.category.props.children.toLowerCase()
      )
        return 1;
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

  const {
    loading: deleteLoading,
    isDeleted,
    error,
    message,
  } = useSelector((state) => state.blogActions);

  const deleteHandler = (id) => {
    dispatch(deleteBlog(id));
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

      title: (
        <Link to={`/blogs/${blogs?.allBlog[i]?._id}`} className='text-link'>
          {capitalizeText(shortenText(blogs?.allBlog[i]?.title, 20))}
        </Link>
      ),
      category: (
        <div style={{ textAlign: 'center' }}>
          {capitalizeText(blogs?.allBlog[i]?.category?.title)}
        </div>
      ),

      action: (
        <div className='d-flex align-items-center justify-content-center gap-4'>
          <Link
            to={`/admin/dashboard/upload-image/blog/${blogs?.allBlog[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
            title='Upload Images'
          >
            <BsCloudUpload />
          </Link>
          <Link
            to={`/admin/dashboard/edit-blog/${blogs?.allBlog[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
            title='Update Blog'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(blogs?.allBlog[i]?._id)}
            title='Delete Blog'
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
      dispatch({ type: DELETE_BLOG_RESET });
      // dispatch(getAllBlogs(0, null));
    }

    dispatch(getAllBlogs(0, null));
  }, [dispatch, error, isDeleted, message]);

  return (
    <>
      <MetaData title='Blog List' />
      <div>
        <h3 className='mb-4'>
          Blog List (
          {blogs?.allBlog?.length === 0
            ? '00'
            : blogs?.allBlog?.length > 9
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
