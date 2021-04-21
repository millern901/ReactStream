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
            required="true"
          />
        </div>

        
        <div className="form-group">
        <i class="fas fa-credit-card"></i>
          <input
            type="tel"
            inputmode="numeric" 
            pattern="[0-9\s]{13,19}" 
            axlength="19" 
            placeholder="xxxx xxxx xxxx xxxx"
            placeholder="Card number"
            name="number"
            value={number}
            onChange={onChange}
            required="true"
          />
        </div>

        <div className="form-group">
        <input
            type="date"
            placeholder="Expiration date"
            name="expiry"
            value={expiry}
            onChange={onChange}
            required="true"
          />
        </div>        
        
        <div className="form-group">
        <input
            type="number"
            placeholder="cvc"
            name="cvc"
            value={cvc}
            onChange={onChange}
            required="true"
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
