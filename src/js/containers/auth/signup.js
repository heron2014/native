import { connect } from 'react-redux';
import Signup from '../../components/auth/signup';
import { signupUser } from '../../actions/signup';

const mapStateToProps = ({ user }) => ({
  isSigningUp: user.isSigningUp,
  serverError: user.error
});

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ firstname, surname, email, password }, dispatch, props) => {
    dispatch(signupUser(firstname, surname, email.toLowerCase(), password, props.navigation));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
