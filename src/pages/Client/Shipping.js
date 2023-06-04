import React, { useEffect, useState } from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import {
  MdLocationCity,
  MdOutlineRealEstateAgent,
  MdPinDrop,
} from 'react-icons/md';
import { GiEarthAmerica } from 'react-icons/gi';

import BreadCrumb from '../../components/BreadCrumb';
import CheckoutWizard from '../../components/CheckoutWizard/CheckoutWizard';
import MetaData from '../../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveShippingInfo } from '../../redux/actions/cartAction';
import { Country, State } from 'country-state-city';

const Shipping = () => {
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pinCode, setPinCode] = useState();
  const [phoneNo, setPhoneNo] = useState();

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      return toast.error('Phone Number should be 10 digits long');
    }

    if (!street && !city && !state && !country && !pinCode && !phoneNo) {
      return toast.error('All feilds are required.');
    }

    dispatch(
      saveShippingInfo({
        street,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );

    navigate('/payment-method');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/shipping');
    }

    if (user) {
      setStreet(user?.address?.street);
      setCity(user?.address?.city);
      setPinCode(user?.address?.pinCode);
      setPhoneNo(user?.mobile);
      setCountry(user?.address?.country);
      setState(user?.address?.state);
    }
  }, [user, navigate]);

  return (
    <>
      <MetaData title='Shipping Address' />
      <BreadCrumb title='Shipping Address' />
      <div className=' home-wrapper-2 p-4'>
        <CheckoutWizard activeStep={1} />
        <div className='d-flex align-items-center justify-content-center flex-column '>
          <h2 className='text-center w-100'>Shipping Details</h2>
          <form
            onSubmit={shippingSubmit}
            className='d-flex align-items-center  flex-column p-4 w-50 gap-10'
          >
            <div className='updateProfileInput'>
              <FaHome size={25} />
              <input
                type='text'
                placeholder='Street'
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className='updateProfileInput'>
              <MdLocationCity size={25} />
              <input
                type='text'
                placeholder='City'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='updateProfileInput'>
              <MdPinDrop size={25} />
              <input
                type='number'
                placeholder='Pin Code'
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className='updateProfileInput'>
              <BsTelephoneFill size={25} />
              <input
                type='tel'
                placeholder='Phone Number'
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size='10'
              />
            </div>
            <div className='updateProfileInput'>
              <GiEarthAmerica size={25} />

              <select
                required
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className='form-control'
                style={{ background: 'transparent', cursor: 'pointer' }}
              >
                <option value=''>Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div className='updateProfileInput'>
                <MdOutlineRealEstateAgent size={25} />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className='form-control'
                  style={{ background: 'transparent', cursor: 'pointer' }}
                >
                  <option value=''>State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type='submit'
              value='Continue'
              className='button mt-2 w-50'
              disabled={country ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
