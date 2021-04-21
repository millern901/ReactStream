import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSubscribe } from '../../actions/profile';

const initialState = {
    cvc: '',
    expiry: '',
    name: '',
    number: ''
};

const PaymentForm = ({
  profile: { profile },
  addSubscribe,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const {
    cvc,
    expiry,
    name,
    number,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addSubscribe(profile._id);
    history.push("/");
  };

  return (
    <Fragment>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Card number"
            name="number"
            value={number}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Expiration date"
            name="expiry"
            value={expiry}
            onChange={onChange}
          />
        </div>        
        
        <div className="form-group">
          <textarea
            placeholder="cvc"
            name="cvc"
            value={cvc}
            onChange={onChange}
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

PaymentForm.propTypes = {
  addSubscribe: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { addSubscribe })(
    PaymentForm
);
