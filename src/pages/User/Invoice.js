import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import { Spinner } from '../../components/Loader/Loader';
import { orderdetails } from '../../redux/actions/orderActions';
import MetaData from '../../utils/MetaData';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Invoice = () => {
  const { loading, order } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      console.log(imgData);
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        'JPEG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`shop-now/${order?._id}/invoice.pdf`);
    });
  };

  useEffect(() => {
    dispatch(orderdetails(id));
  }, [dispatch, id]);

  return (
    <>
      <MetaData title={`My Orders (${order?._id}`} />
      <BreadCrumb title={`My Orders (${order?._id})`} />
      <div className='home-wrapper-2 p-4'>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className='d-flex align-items-center justify-content-end px-2 mb-3'>
              <button className='btn btn-primary' onClick={downloadPDF}>
                Download Invoice
              </button>
            </div>
            <div ref={pdfRef}>
              <div className='invoice-logo'>
                <img src='/assests/logo.png' alt='logo' />
              </div>
              <div className='container-xxl col-12 d-flex gap-10'>
                <div className='my-2 col-9 d-flex flex-column gap-30'>
                  <div
                    className='p-4'
                    style={{
                      border: '1px solid #000',
                      borderRadius: '10px',
                    }}
                  >
                    <div className='d-flex align-items-center gap-10 mb-2'>
                      <h3 className='mb-0 text-center w-100 text-black-50'>
                        <u>Invoice</u>
                      </h3>
                    </div>
                    <div className='d-flex align-items-center gap-10 mb-2'>
                      <h5 className='fw-bolder mb-0 fs-6'>Order Id</h5>
                      <p className='mb-0 fs-6'>{order?._id}</p>
                    </div>
                    <div className='mb-2'>
                      <h5 className='fw-bolder mb-0 fs-6'>Shipping Address</h5>
                      <p className='mb-0 fs-6'>
                        {order?.shippingInfo?.street},&nbsp;
                        {order?.shippingInfo?.city},&nbsp;
                        {order?.shippingInfo?.state},&nbsp;
                        {order?.shippingInfo?.country} - &nbsp;
                        {order?.shippingInfo?.pinCode},
                      </p>
                    </div>
                    <div className='d-flex align-items-center gap-10 '>
                      <p className='fw-bold mb-0'>Mobile : </p>
                      <p className='mb-0'>{order?.shippingInfo?.phoneNo}</p>
                    </div>
                  </div>
                  <div
                    className='p-4'
                    style={{
                      border: '1px solid #000',
                      borderRadius: '10px',
                    }}
                  >
                    <div className='d-flex align-items-center gap-10 mb-2'>
                      <h5 className='fw-bolder mb-0 fs-5'>Payment Method</h5>
                      <p
                        className='mb-0 fs-6 text-success'
                        style={{ fontWeight: '500' }}
                      >
                        {order?.paymentIntent?.method === 'Stripe'
                          ? 'Online Pay'
                          : order?.paymentIntent?.method}
                      </p>
                    </div>
                    <div className='d-flex align-items-center gap-10 mb-2'>
                      <h5 className='fw-bolder mb-0 fs-5'>Payment Id</h5>
                      <p
                        className='mb-0 text-success fs-6'
                        style={{ fontWeight: '500' }}
                      >
                        {order?.paymentIntent?.paymentId}
                      </p>
                    </div>
                    <div className='d-flex align-items-center gap-10 mb-2'>
                      <h5 className='fw-bolder mb-0 fs-5'>Payment Status</h5>
                      <p
                        className='mb-0 text-success fs-6'
                        style={{ fontWeight: '500' }}
                      >
                        {order?.paymentIntent?.status}
                      </p>
                    </div>
                    <div className='d-flex align-items-center gap-10 mb-2'>
                      <h5 className='fw-bolder fs-5 mb-0'>Paid</h5>
                      <p
                        className='mb-0 text-success fs-6'
                        style={{ fontWeight: '500' }}
                      >
                        {order?.paymentIntent?.paid}
                      </p>
                    </div>
                    <div className='d-flex align-items-center gap-10 mb-2'>
                      <h5 className='fw-bolder fs-5 mb-0'>Date</h5>
                      <p
                        className='mb-0 text-success fs-6'
                        style={{ fontWeight: '500' }}
                      >
                        {moment(order?.paymentIntent?.created).format(
                          'DD MMMM YYYY hh:mm:ss a'
                        )}
                      </p>
                    </div>
                  </div>
                  <div
                    className='p-4'
                    style={{
                      border: '1px solid #000',
                      borderRadius: '10px',
                    }}
                  >
                    <h5 className='fw-bolder'>Order Items</h5>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th className='text-start'>Item</th>
                          <th className='text-center'>Qunatity</th>
                          <th className='text-end'>Price</th>
                        </tr>
                      </thead>

                      <tbody>
                        {order &&
                          order?.products?.map((item) => {
                            return (
                              <tr
                                style={{ verticalAlign: 'middle' }}
                                key={item?._id}
                              >
                                <td>
                                  <Link
                                    href={`/product/${item?.product?.slug}`}
                                  >
                                    <p
                                      className='mb-0 text-dark'
                                      style={{ maxWidth: '650px' }}
                                    >
                                      {item?.product?.title}
                                    </p>
                                  </Link>
                                  {item?.size && (
                                    <p className='mb-0'>
                                      Size: {item?.size?.title}
                                    </p>
                                  )}
                                  {item?.color && (
                                    <p className='mb-0 d-flex gap-5 align-items-center'>
                                      Color:
                                      <span
                                        style={{
                                          display: 'inline-block',
                                          width: '15px',
                                          height: '15px',
                                          backgroundColor: `${item?.color?.hex}`,
                                          borderRadius: '100%',
                                        }}
                                      ></span>
                                    </p>
                                  )}
                                </td>
                                <td>
                                  <p className='mb-0 text-center'>
                                    {item?.count}
                                  </p>
                                </td>
                                <td>
                                  <p className='mb-0 text-end'>
                                    ₹ {item?.price?.toFixed(2)}
                                  </p>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className='col-3 my-2'
                  style={{
                    border: '1px solid #000',
                    borderRadius: '10px',
                    width: '24%',
                  }}
                >
                  <ul className='p-4'>
                    <li>
                      <div>
                        <h4>Order Summary</h4>
                        <div className='d-flex align-items-center justify-content-between my-2'>
                          <p
                            className='fw-bold mb-0'
                            style={{
                              textDecoration: `${
                                order?.totalAfterDiscount
                                  ? 'line-through'
                                  : 'none'
                              }`,
                            }}
                          >
                            Items:
                          </p>
                          <p
                            className='mb-0'
                            style={{
                              textDecoration: `${
                                order?.totalAfterDiscount
                                  ? 'line-through'
                                  : 'none'
                              }`,
                            }}
                          >
                            ₹{order?.cartTotal?.toFixed(2)}
                          </p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between my-2'>
                          <p className='fw-bold mb-0'>After Discount:</p>
                          <p className='mb-0'>
                            ₹{order?.totalAfterDiscount?.toFixed(2)}
                          </p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between my-2'>
                          <p className='fw-bold mb-0'>Tax:</p>
                          <p className='mb-0'>
                            ₹{order?.paymentIntent?.taxPrice?.toFixed(2)}
                          </p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between my-2'>
                          <p className='fw-bold mb-0'>Shipping:</p>
                          <p className='mb-0'>
                            ₹{order?.paymentIntent?.shippingPrice?.toFixed(2)}
                          </p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between border-top border-2 mt-2 py-2'>
                          <p
                            className='fw-bold mb-0'
                            style={{
                              textDecoration: `${
                                order?.totalAfterDiscount
                                  ? 'line-through'
                                  : 'none'
                              }`,
                            }}
                          >
                            Total:
                          </p>
                          <p
                            className='mb-0'
                            style={{
                              textDecoration: `${
                                order?.totalAfterDiscount
                                  ? 'line-through'
                                  : 'none'
                              }`,
                            }}
                          >
                            ₹
                            {(
                              order?.cartTotal +
                              order?.paymentIntent?.taxPrice +
                              order?.paymentIntent?.shippingPrice
                            ).toFixed(2)}
                          </p>
                        </div>
                        {order?.totalAfterDiscount > 1 && (
                          <div className='d-flex align-items-center justify-content-between border-top border-2 py-2'>
                            <p className='fw-bold mb-0'>
                              Total After Discount:
                            </p>
                            <p className='mb-0'>
                              ₹{order?.paymentIntent?.amount}
                            </p>
                          </div>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Invoice;
