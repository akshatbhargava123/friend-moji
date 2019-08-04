import React, { Component } from "react";
import firebase from '../firebase.init';
import './Login.css';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      error: null,
    };
	}
	
	componentWillMount() {
		let user = localStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
			this.props.history.push({
				pathname: '/home',
				state: { user }
			});
		}
	}
  onChange = e => { 
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  login = e => {
    e.preventDefault();
    console.log("Submiting ", this.state);
    const { userName, password } = this.state;
    firebase
     .auth()
     .signInWithEmailAndPassword(userName, password)
     .then((res) => {
			 localStorage.setItem('user', JSON.stringify(res.user));
        this.props.history.push({
          pathname: '/home',
          state: { user: res.user }
        });
     })
     .catch((error) => {
        console.log(error)
        alert(error.message)
        this.setState({ error: error });
     });
	};
	signup = () => this.props.history.push('/signup');
  forgetPassword = () => {
    this.props.history.push('/forget-password')
  }
  render() {
    return (
      <div className="main-container">
        <div className="login-block">
          <h1>मित्रMoji</h1>
          <input type="text" placeholder="Email" name="userName" id="username" onChange={this.onChange} />
          <input type="password" placeholder="Password" name="password" id="password" onChange={this.onChange} />
          <p className="forget" onClick={this.forgetPassword}>Forget Password</p>
          <button onClick={this.login}>Submit</button>
					<button onClick={this.signup}>New? Sign up now!</button>
        </div>
      </div>
    );
  }
}
