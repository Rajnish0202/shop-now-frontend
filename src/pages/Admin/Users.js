import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { BiDetail } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import { Spinner, TextSpinner } from '../../components/Loader/Loader';
import { capitalizeText } from '../../utils/Capitalized';
import { toast } from 'react-toastify';
import { DELETE_USER_RESET } from '../../redux/constants/userConstants';

const columns = [
  {
    title: 'SNo.',
    dataIndex: 'srn',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => {
      if (a.email.toLowerCase() < b.email.toLowerCase()) return -1;
      if (a.email.toLowerCase() > b.email.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    sorter: (a, b) => {
      if (a.role.toLowerCase() < b.role.toLowerCase()) return -1;
      if (a.role.toLowerCase() > b.role.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Users = () => {
  const dispatch = useDispatch();
  const { loading, users } = useSelector((state) => state.adminUsers);
  const {
    loading: deleteLoading,
    error,
    isDeleted,
    message,
  } = useSelector((state) => state.adminActions);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete User',
      message: 'Are you sure you want to delete this user.',
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
  for (let i = 0; i < users.length; i++) {
    data.push({
      srn: i + 1,
      key: users[i]?._id,
      name: `${capitalizeText(users[i]?.firstname)} ${capitalizeText(
        users[i]?.lastname
      )}`,
      email: users[i]?.email,
      mobile: users[i]?.mobile,
      role: users[i]?.role,
      action: (
        <div className='d-flex align-items-center justify-content-center gap-2'>
          <Link
            to={`/admin/dashboard/user-details/${users[i]?._id}`}
            className='btn btn-primary d-flex align-items-center justify-content-center fs-5'
          >
            <BiDetail />
          </Link>

          <Link
            to={`/admin/dashboard/update-user-role/${users[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(users[i]?._id)}
          >
            {deleteLoading ? <TextSpinner /> : <MdDelete />}
          </button>
        </div>
      ),
    });
  }

  useEffect(() => {
    dispatch(getAllUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      dispatch({ type: DELETE_USER_RESET });
      dispatch(getAllUsers());
    }
  }, [dispatch, error, isDeleted, message]);
  return (
    <>
      <MetaData title='Users' />

      <div>
        <h3 className='mb-4'>
          Users (
          {users.length > 9
            ? users.length
            : users.length?.toString().padStart(2, '0')}
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

export default Users;
