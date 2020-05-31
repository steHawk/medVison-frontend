import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;

    if (error !== prevProps.error) {
      if (error.msg.message === "Network Error") alert.error('Please check your Internet');
      if (error.msg === "Network Error") alert.error('Please check your Internet');
      if ( error.msg.includes("`userName` is required.")) alert.error('User Name is Required');
      if ( error.msg.includes("userName_1 dup key")) alert.error('User Name is already taken');
    }
    
    if (message !== prevProps.message) {
      if (message.number) alert.error(message.number);
      if (message.otp) alert.error(message.otp);
      if (message.password) alert.error(message.password);
      if (message.passwordL) alert.error(message.passwordL);
      if (message.duplicate) alert.error(message.duplicate);
      if (message.check) alert.error(message.check);
      if (message.itemAdded) alert.success(message.itemAdded);
      if (message.itemDel) alert.success(message.itemDel);
      if (message.email) alert.error(message.email);
      if (message.logCart) alert.error(message.logCart);


      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));

