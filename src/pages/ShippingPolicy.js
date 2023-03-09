import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';

const ShippingPolicy = () => {
  return (
    <>
      <MetaData title='Shipping Policy' />
      <BreadCrumb title='Shipping Policy' />
      <div className='policy-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='policy'>
                <code className='text-dark'>June 3rd ,2022</code>
                <h3 className='title text-center'>SHIPPING POLICY</h3>
                <div>
                  <h6>What are the delivery charges?</h6>
                  <p>Delivery charge varies with each Seller.</p>
                  <p>
                    Sellers incur relatively higher shipping costs on low value
                    items. In such cases, charging a nominal delivery charge
                    helps them offset logistics costs. Please check your order
                    summary to understand the delivery charges for individual
                    products.
                  </p>
                  <p>
                    For Products listed as Shop-Now Plus, a Rs 40 charge for
                    delivery per item may be applied if the order value is less
                    than Rs 500. While, orders of Rs 500 or above are delivered
                    free.
                  </p>

                  <h6>
                    Why does the delivery date not correspond to the delivery
                    timeline of X-Y business days?
                  </h6>

                  <p>
                    It is possible that the Seller or our courier partners have
                    a holiday between the day your placed your order and the
                    date of delivery, which is based on the timelines shown on
                    the product page. In this case, we add a day to the
                    estimated date. Some courier partners and Sellers do not
                    work on Sundays and this is factored in to the delivery
                    dates.
                  </p>

                  <h6>What is the estimated delivery time?</h6>

                  <p>
                    Sellers generally procure and ship the items within the time
                    specified on the product page. Business days exclude public
                    holidays and Sundays.
                  </p>
                  <ul className='ps-0'>
                    Estimated delivery time depends on the following factors:
                    <li style={{ listStyle: 'inside' }}>
                      The Seller offering the product
                    </li>
                    <li style={{ listStyle: 'inside' }}>
                      Product's availability with the Seller
                    </li>
                    <li style={{ listStyle: 'inside' }}>
                      The destination to which you want the order shipped to and
                      location of the Seller.
                    </li>
                  </ul>
                  <p>
                    At times Sellers prefer not to ship to certain locations.
                    This is entirely at their discretion.
                  </p>

                  <h6>Why is the CoD option not offered in my location?</h6>

                  <p>
                    Availability of CoD depends on the ability of our courier
                    partner servicing your location to accept cash as payment at
                    the time of delivery.
                  </p>

                  <p>
                    Our courier partners have limits on the cash amount payable
                    on delivery depending on the destination and your order
                    value might have exceeded this limit. Please enter your pin
                    code on the product page to check if CoD is available in
                    your location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
