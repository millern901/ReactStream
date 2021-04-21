import React from 'react';
import PropTypes from 'prop-types';
import './Payment.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { addSubscribe } from '../../actions/profile';

const initialValues = {
			cardNo: '',
			name: '',
			date: '',
			code: '',
		};
		
const PaymentForm2 = ({
    profile: { profile },
    addSubscribe,
    history
}) => {
	const onSubmit = e => {		
        e.preventDefault();
        addSubscribe(profile._id);
        history.push("/");
    };

    const validate = values => {
        let errors = {};
        
        if(!values.cardNo){
            errors.cardNo = 'Required';
        }else if(values.cardNo.length !== 16){
            errors.cardNo = 'Card number should be atleast 16 digits';
        }
        
        if(!values.name){
            errors.name = 'Required';
        }
        
        if(!values.date){
            errors.date = 'Required';
        }
        
        if(!values.code){
            errors.code = 'Required';
        }else if(values.code.length !== 3){
            errors.code = 'CVV should be atleast 3 digits';
        }        
        return errors;
    }

	const formik = useFormik({
		initialValues,
		onSubmit,
		validate
	});
	
	//importing system date
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //as january = 0
	var yyyy = today.getFullYear();
	if(dd<10){ dd = '0' + dd; }
	if(mm<10){ mm = '0' + mm; }
	var day = yyyy + '-' + mm + '-' + dd;
	
  return (
    <div className='Payment'>
        <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
        </Link>

		<div className='Payment__form'>
			<form onSubmit={onSubmit}>
				<div className='Payment__form--input'>
					<label htmlFor='cardNo'>Credit card number</label>
					<input
						type='text'
						id='cardNo'
						name='cardNo'
						maxLength='16'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.cardNo}
					/>
					{formik.touched.cardNo && formik.errors.cardNo ? <div id='error'>{formik.errors.cardNo}</div> : null}
				</div>
				<div className='Payment__form--input'>
					<label htmlFor='name'>Card holder name</label>
					<input 
						type='text'
						id='name'
						name='name'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
					/>
					{formik.touched.name && formik.errors.name ? <div id='error'>{formik.errors.name}</div> : null}
				</div>
				<div className='Payment__form--input'>
					<label htmlFor='date'>Expiration date</label>
					<input
						type='date'
						id='date'
						name='date'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						min={day}
						value={formik.values.date}
					/>
					{formik.touched.date && formik.errors.date ? <div id='error'>{formik.errors.date}</div> : null}
				</div>
				<div className='Payment__form--input'>
					<label htmlFor='code'>Security code - CVV</label>
					<input 
						type='text'
						id='code'
						name='code'
						maxLength='3'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.code}
					/>
					{formik.touched.code && formik.errors.code ? <div id='error'>{formik.errors.code}</div> : null}
				</div>				
                <input type="submit" className="btn btn-primary my-1" Pay/>
			</form>
		</div>
    </div>
  );
};

PaymentForm2.propTypes = {
    addSubscribe: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    profile: state.profile
});
  
export default connect(mapStateToProps, { addSubscribe })(
    PaymentForm2
);