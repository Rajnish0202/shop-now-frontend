import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';

const RefundPolicy = () => {
  return (
    <>
      <MetaData title='Refund Policy' />
      <BreadCrumb title='Refund Policy' />
      <div className='policy-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='policy'>
                <code className='text-dark'>June 3rd ,2022</code>
                <h3 className='title text-center'>RRFUND POLICY</h3>
                <div>
                  <p>
                    We value the trust you place in us and recognize the
                    importance of secure transactions and information privacy.
                    This Privacy Policy describes how Shop-Now Internet Private
                    Limited and its affiliates (collectively “Shop-Now, we, our,
                    us”) collect, use, share or otherwise process your personal
                    information through Shop-Now website www.shopnow.com, its
                    mobile application, and m-site (hereinafter referred to as
                    the “Platform”).
                  </p>

                  <p>
                    While you may be able to browse certain sections of the
                    Platform without registering with us, however, please note
                    we do not offer any product or service under this Platform
                    outside India. Your personal information will primarily be
                    stored and processed in India and may have data protection
                    laws that are different from those that apply in the country
                    in which you are located. By visiting this Platform,
                    providing your information or availing out product/service,
                    you expressly agree to be bound by the terms and conditions
                    of this Privacy Policy, the Terms of Use and the applicable
                    service/product terms and conditions, and agree to be
                    governed by the laws of India including but not limited to
                    the laws applicable to data protection and privacy. If you
                    do not agree please do not use or access our Platform.
                  </p>

                  <h6>Collection of Your Information</h6>

                  <p>
                    When you use our Platform, we collect and store your
                    information which is provided by you from time to time. In
                    general, you can browse the Platform without telling us who
                    you are or revealing any personal information about
                    yourself. Once you give us your personal information, you
                    are not anonymous to us. Where possible, we indicate which
                    fields are required and which fields are optional. You
                    always have the option to not provide information by
                    choosing not to use a particular service, product or feature
                    on the Platform.
                  </p>

                  <p>
                    We may track your buying behaviour, preferences, and other
                    information that you choose to provide on our Platform. We
                    use this information to do internal research on our users'
                    demographics, interests, and behaviour to better understand,
                    protect and serve our users. This information is compiled
                    and analysed on an aggregated basis. This information may
                    include the URL that you just came from (whether this URL is
                    on our Platform or not), which URL you next go to (whether
                    this URL is on our Platform or not), your computer browser
                    information, and your IP address.
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

export default RefundPolicy;
