import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


class PayModal extends React.Component {
    constructor () {
      super();
      this.state = {
        showModal: false,
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
      console.log(this.state)
    }

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
      }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        
        this.setState({ [name]: value });
      }
    
    render () {
      return (
        <div>
          <button onClick={this.handleOpenModal}>Subscribe!</button>
          <Modal 
             isOpen={this.state.showModal}
          >
              <div><p>---- </p></div>
              <div><p>---- </p></div>
              <div><p>Custom Payment Form</p></div>
              <div><p>---- </p></div>
              <div><p>---- </p></div>
              
        <form>
        	<input
            name="name"
            placeholder="Name"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            name="expiry"
            placeholder="Expiration"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            name="CVC"
            placeholder="CVC"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          
        </form>
        <button
            //onClick={() => addSubscribe(profile._id)}
            type="button"
            className="btn btn-light"
          >
            Subscribe
          </button>
              
            <button onClick={this.handleCloseModal}>Cancel</button>
          </Modal>
        </div>
      );
    }
  }

  export default PayModal;