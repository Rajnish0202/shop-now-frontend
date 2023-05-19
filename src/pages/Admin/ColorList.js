import React, { useEffect } from 'react';
import MetaData from '../../utils/MetaData';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Spinner, TextSpinner } from '../../components/Loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import {
  deleteProductColor,
  getAllColors,
} from '../../redux/actions/productColorAction';
import { clearErrors } from '../../redux/actions/productTypeAction';
import { DELETE_COLOR_RESET } from '../../redux/constants/productColorConstants';

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
    title: 'Hex',
    dataIndex: 'hex',
    sorter: (a, b) => {
      if (a.hex.toLowerCase() < b.hex.toLowerCase()) return -1;
      if (a.hex.toLowerCase() > b.hex.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    title: 'Shade',
    dataIndex: 'shade',
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ColorList = () => {
  const { loading, colors } = useSelector((state) => state.productColors);

  const {
    loading: deleteLoading,
    isDeleted,
    error,
    message,
  } = useSelector((state) => state.colorActions);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteProductColor(id));
  };

  // Confirm alert
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Color',
      message: 'Are you sure you want to delete this color.',
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
  for (let i = 0; i < colors.length; i++) {
    data.push({
      srn: i + 1,
      key: colors[i]?._id,
      title: capitalizeText(colors[i]?.title),
      hex: capitalizeText(colors[i]?.hex),
      shade: (
        <div
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: `${colors[i]?.hex}`,
            margin: 'auto',
            borderRadius: '100%',
            border: colors[i]?.hex.includes('#fff') ? '1px solid #000' : 'none',
          }}
        ></div>
      ),

      action: (
        <div className='d-flex align-items-center justify-content-center gap-4'>
          <Link
            to={`/admin/dashboard/edit-color/${colors[i]?._id}`}
            className='btn btn-success d-flex align-items-center justify-content-center fs-5'
          >
            <FaEdit />
          </Link>
          <button
            className='btn btn-danger d-flex align-items-center justify-content-center fs-5'
            onClick={() => confirmDelete(colors[i]?._id)}
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
      dispatch({ type: DELETE_COLOR_RESET });
    }
    dispatch(getAllColors());
  }, [dispatch, error, message, isDeleted]);

  return (
    <>
      <MetaData title='Color List' />
      <div>
        <h3 className='mb-4'>
          Color List (
          {colors.length > 9
            ? colors.length
            : colors.length?.toString().padStart(2, '0')}
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

export default ColorList;
