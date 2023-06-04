import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { clearErrors } from '../../redux/actions/updateActions';
import { UPDATE_RESET } from '../../redux/constants/updateConstants';
import { getUserDetails, setUserRole } from '../../redux/actions/userActions';
import { UPDATE_USER_ROLE_RESET } from '../../redux/constants/userConstants';

const UpdateUserRole = () => {
  const [role, setRole] = useState('');
  const roles = [
    {
      id: 1,
      type: 'user',
    },
    {
      id: 2,
      type: 'admin',
    },
  ];

  const { loading, user } = useSelector((state) => state.adminUserDetails);

  const {
    loading: loadingRole,
    error,
    isChanged,
    message,
  } = useSelector((state) => state.useRoleActions);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const filterRole = roles.filter((item) => item.type !== user?.role);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!role) {
      return toast.error('Please Select Role');
    }

    const formData = new FormData();

    formData.set('role', role);

    dispatch(setUserRole(id, formData));
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isChanged) {
      toast.success(message);
      dispatch({ type: UPDATE_USER_ROLE_RESET });
      navigate(`/admin/dashboard/user-details/${id}`);
    }

    dispatch({ type: UPDATE_RESET });
  }, [dispatch, navigate, id, error, isChanged, message]);

  return (
    <>
      <MetaData title='Update User Role' />
      <div>
        <h3 className='mb-4 text-capitalize'>{`Update ${user?.firstname} ${user?.lastname}'s Role`}</h3>

        <div className='d-flex'>
          <form className='w-100' onSubmit={formSubmitHandler}>
            <div className='form-floating mb-3 w-100'>
              {loading && <TextSpinner />}
              <select
                className='form-select w-100'
                id='floatingSelect'
                aria-label='Floating label select example'
                style={{ cursor: 'pointer', textDecoration: 'capitalize' }}
                name='role'
                onChange={(e) => setRole(e.target.value)}
              >
                {id ? (
                  <option value={user?.role} className='text-capitalize'>
                    {user?.role &&
                      user?.role[0]?.toUpperCase() + user?.role?.slice(1)}
                  </option>
                ) : (
                  <option value={''}>Update Order Status</option>
                )}
                {filterRole &&
                  filterRole?.map((item) => {
                    return (
                      <option
                        value={item?.type}
                        key={item?.id}
                        className='text-capitalize'
                      >
                        {item?.type[0]?.toUpperCase() + item?.type?.slice(1)}
                      </option>
                    );
                  })}
                );
              </select>
              <label htmlFor='floatingSelect'>User Role</label>
            </div>

            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3 my-3 text-capitalize'
                disabled={loadingRole ? true : false}
              >
                {loadingRole ? <TextSpinner /> : `Update Role`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUserRole;
