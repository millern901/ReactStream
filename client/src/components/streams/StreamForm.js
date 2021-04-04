import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addStream } from '../../actions/stream';

const StreamForm = ({ addStream }) => {
  const [title, setTitle] = useState('');

  return (
    <div className='stream-form'>
      <div className='bg-primary p'>
        <h3>Create a Stream</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addStream({ title });
          setTitle('');
        }}
      >
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

StreamForm.propTypes = {
  addStream: PropTypes.func.isRequired
};

export default connect(
  null,
  { addStream }
)(StreamForm);
