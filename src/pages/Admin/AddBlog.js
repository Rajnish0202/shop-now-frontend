import React, { useState } from 'react';
import MetaData from '../../utils/MetaData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlog = () => {
  const [desc, setDesc] = useState('');

  return (
    <>
      <MetaData title='Add Blogs' />
      <div>
        <h3 className='mb-4'>Add Blog</h3>

        <div className='d-flex'>
          <form className='w-100'>
            <div className='form-floating mb-3 w-100'>
              <input
                type='text'
                className='form-control form-border w-100'
                id='floatingInput'
                placeholder='Blog Title'
              />
              <label htmlFor='floatingInput'>Enter Blog Title</label>
            </div>
            <div className='form-floating mb-3 w-100'>
              <select
                className='form-select w-100'
                id='floatingSelect'
                aria-label='Floating label select example'
              >
                <option value={''}>Open this select menu</option>
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option>
              </select>
              <label htmlFor='floatingSelect'>Works with selects</label>
            </div>
            <div className='mb-3 w-100'>
              <ReactQuill
                theme='snow'
                value={desc}
                onChange={setDesc}
                modules={AddBlog.modules}
                formats={AddBlog.formats}
                className='w-100'
                placeholder='Enter Description...'
              />
            </div>
            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3 my-3'
              >
                Add Blog
              </button>
              <button
                type='submit'
                className='btn btn-danger border-0 rounded-3 my-3'
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

AddBlog.modules = {
  toolbar: [
    [{ header: 1 }, { header: 2 }],
    [{ font: [] }],

    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};

AddBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];

export default AddBlog;
