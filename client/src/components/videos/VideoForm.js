import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import { connect } from 'react-redux';
import { addVideo } from '../../actions/video';

const VideoForm = ({ addVideo }) => {
  const [title, setTitle] = useState('');
  const [fileName, setFileName] = useState(null);

  const onDrop = async (files) => {
    let formData = new FormData();
    formData.append('file', files[0]);
    const res = await api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setFileName(res.data.fileName);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addVideo({ title, fileName });
    setTitle('');
    setFileName(null);
  };

  return (
    <div className='stream-form'>
      <div className='bg-primary p'>
        <h3>Create a Stream</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={onSubmit}
      >
        <Dropzone
          onDrop={onDrop}
          multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
        <textarea
          name='title'
          cols='30'
          rows='5'
          placeholder='Create a Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

VideoForm.propTypes = {
  addVideo: PropTypes.func.isRequired
};

export default connect(
  null,
  { addVideo }
)(VideoForm);
