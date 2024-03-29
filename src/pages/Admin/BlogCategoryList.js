import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { shortenText } from '../../utils/ShortenText';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Spinner, TextSpinner } from '../../components/Loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  getBlogCategories,
  deleteBlogCategory,
  clearErrors,
} from '../../redux/actions/blogCategoryActions';
import { toast } from 'react-toastify';
import { DELETE_BLOG_CATEGORY_RESET } from '../../redux/constants/blogCategoryConstants';

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
      return 0;
    },
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const BlogCategoryList = () => {
  const dispatch = useDispatch();
  const { loading, blogCategories } = useSelector(
    (state) => state.blogCategory
  );

  const {
    loading: deleteLoading,
    isDeleted,
    error,
    message,
  } = useSelector((state) => state.blogCategoryActions);

  const deleteHandler = (id) => {
    dispatch(deleteBlogCategory(id));
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Category',
      message: 'Are you sure you want to delete this category.',
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
  for (let i = 0; i < blogCategories.length; i++) {
    data.push({
      srn: i + 1,
      key: blogCategories[i]?._id,
      title: (
        <div style={{ textAlign: 'center' }}>
          {capitalizeText(shortenText(blogCategories[i]?.title, 20))}
        </div>
      ),

      action: (
        <div className='d-flex align-items-center justify-content-center gap-4'>
          <Link
            to={`/admin/dashboard/edit/blog-category/${blogCategories[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(blogCategories[i]?._id)}
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
      dispatch({ type: DELETE_BLOG_CATEGORY_RESET });
      // dispatch(getBlogCategories());
    }
    dispatch(getBlogCategories());
  }, [dispatch, error, isDeleted, message]);

  return (
    <>
      <MetaData title='Blog Category List' />
      <div>
        <h3 className='mb-4'>
          Blog Category List (
          {blogCategories.length === 0
            ? '00'
            : blogCategories.length > 9
            ? blogCategories.length
            : blogCategories.length?.toString().padStart(2, '0')}
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

export default BlogCategoryList;
