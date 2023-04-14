import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  removeItemsFromCart,
  updateQtyInCart,
  userCart,
} from '../redux/actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { UPDATE_CART_QUANTITY_RESET } from '../redux/constants/cartConstants';

const CartCard = ({ product }) => {
  const [count, setCount] = useState(product?.count);
  const [productId, setProductId] = useState('');
  console.log(count, productId);

  const { isUpdatedQty } = useSelector((state) => state.updateCart);
  const dispatch = useDispatch();

  const removeItemHandler = (id) => {
    dispatch(removeItemsFromCart(id));
    dispatch(userCart());
  };

  const countDecreaseHandler = (id) => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
      setProductId(id);
    } else {
      return;
    }
  };

  const countIncreaseHandler = (id) => {
    setCount((prevCount) => prevCount + 1);
    setProductId(id);
  };

  useEffect(() => {
    if (count && productId) {
      dispatch(updateQtyInCart(productId, count));
    }

    if (isUpdatedQty) {
      dispatch(userCart());
      dispatch({ type: UPDATE_CART_QUANTITY_RESET });
    }
  }, [isUpdatedQty, dispatch, count, productId]);

  return (
    <div className='cart-data d-flex justify-content-between align-items-center p-3'>
      <div className='cart-col-1 d-flex align-items-center gap-10'>
        <div>
          <Link to={`/product/${product?.product?.slug}`}>
            <img
              src={product?.product?.images[0]?.url}
              alt='acc'
              style={{
                width: '5rem',
                objectFit: 'cover',
              }}
            />
          </Link>
        </div>
        <div>
          <p className='mb-0'>{product?.product?.title}</p>
          {product?.color && (
            <p className='mb-0 d-flex gap-5 align-items-center'>
              Color:
              <span
                style={{
                  display: 'inline-block',
                  width: '15px',
                  height: '15px',
                  backgroundColor: `${product?.color?.hex}`,
                  borderRadius: '100%',
                }}
              ></span>
            </p>
          )}
          {product?.size && (
            <p className='mb-0'>Size: {product?.size?.title}</p>
          )}
        </div>
      </div>
      <div className='cart-col-2'>
        <h5 className='mb-0'>₹{product?.price}</h5>
      </div>
      <div className='cart-col-3 d-flex align-items-center justify-content-center gap-15'>
        <div className='d-flex align-item-center gap-10'>
          <button
            className='action-btn'
            onClick={() => countDecreaseHandler(product?.product?._id)}
          >
            -
          </button>
          <input
            type='number'
            className='form-control'
            min={1}
            value={count}
            readOnly
            style={{ height: '30px' }}
          />
          <button
            className='action-btn'
            onClick={() => countIncreaseHandler(product?.product?._id)}
          >
            +
          </button>
        </div>
        <div>
          <button
            className='trash-btn normal-btn'
            onClick={() => removeItemHandler(product?.product?._id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className='cart-col-4'>
        <div>
          <h5 className='mb-0'>
            ₹ {`${product?.price}` * `${product?.count}`}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
