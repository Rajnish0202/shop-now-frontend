import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../../utils/MetaData';
import { capitalizeText } from '../../utils/Capitalized';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  uploadBlogImages,
  uploadProductImages,
} from '../../redux/actions/uploadImageAction';
import { toast } from 'react-toastify';
import { UPLOAD_IMAGE_RESET } from '../../redux/constants/uploadImagesConstants';
import { TextSpinner } from '../../components/Loader/Loader';

const UploadImage = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);

  const { page, id } = useParams();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.uploadImages
  );

  const navigate = useNavigate();

  const createSubmitHandler = (e) => {
    e.preventDefault();

    if (uploadImages.length === 0) {
      return toast.error(
        `Please Select ${
          page.includes('blog') || page.includes('product') ? 'Images' : 'Image'
        }`
      );
    }

    const imageData = new FormData();
    uploadImages.forEach((image) => {
      imageData.append('images', image);
    });

    if (page === 'product') {
      dispatch(uploadProductImages(id, imageData));
    }

    if (page === 'blog') {
      dispatch(uploadBlogImages(id, imageData));
    }
  };

  const createImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadImages([]);
    setPreviewImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
      setUploadImages((oldFile) => [...oldFile, file]);
    });
  };

  const formClearHandler = () => {
    setUploadImages([]);
    setPreviewImages([]);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success(
        `${capitalizeText(page)} ${
          page.includes('blog') || page.includes('product') ? 'Images' : 'Image'
        } Uploaded Successfully.`
      );
      dispatch({ type: UPLOAD_IMAGE_RESET });
      navigate(`/admin/dashboard/${page}-list`);
    }
  }, [error, dispatch, success, page, navigate]);

  return (
    <>
      <MetaData title={`Upload ${capitalizeText(page)} Image`} />
      <div>
        <h3 className='mb-4'>{`Upload ${capitalizeText(page)} ${
          page.includes('blog') || page.includes('product') ? 'Images' : 'Image'
        }`}</h3>
        <div>
          <form encType='multipart/form-data' onSubmit={createSubmitHandler}>
            <div id={`create${capitalizeText(page)}FormFile`}>
              <label htmlFor='formFileLg' className='form-label'>
                {`Select ${
                  page.includes('blog') || page.includes('product')
                    ? `Multiple Images (Max Images ${page === 'blog' ? 2 : 4})`
                    : 'Single Image'
                }`}
              </label>
              <input
                className='form-control form-control-lg'
                id='formFileLg'
                type='file'
                name='images'
                accept='image/*'
                multiple={
                  page.includes('blog') || page.includes('product')
                    ? true
                    : false
                }
                onChange={createImagesChange}
              />
            </div>
            <div
              id={`create${capitalizeText(page)}FormImage`}
              className='my-2 d-flex align-items-center justify-content-start gap-15 my-5'
            >
              {previewImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${capitalizeText(page)}  Preview`}
                  className='img-fluid border border-2 rounded p-4'
                  style={{ width: '120px', height: '200px' }}
                />
              ))}
            </div>

            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3'
                disabled={loading ? true : false}
              >
                {loading ? (
                  <TextSpinner />
                ) : (
                  `Upload ${
                    page.includes('blog') || page.includes('product')
                      ? 'Images'
                      : 'Image'
                  }`
                )}
              </button>
              <button
                type='button'
                className='btn btn-danger border-0 rounded-3 my-3'
                onClick={() => formClearHandler()}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
