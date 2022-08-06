import React,{ useEffect, useState } from 'react'
import { getCookie } from '../utils/helpers/auth';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../redux/actions/api';
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import LoginImage from '../styles/imgs/login.svg';

const Login = () => {
  const token = getCookie('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formValid, setFormValid] = useState(false); 

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [validate, setValidate] = useState({
    email: false,
    password: false
  })

  useEffect(() => {
    if(token){
      return navigate("/");
    }
  },[])

  useEffect(() => {
    const isNotEmpty = Object.values(form).every((v) => v !== '');
    const isValid = Object.values(validate).includes(true);
    console.log('is valid',isValid);
    if(isValid){
      setFormValid(false)
    } else {
      setFormValid(true)
    }

    if(isNotEmpty){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [form])

  const signUp = {
    email: 'jackymad+20@gmail.com',
    password: 'jackymad'
  }

  const onSuccess = (res) => {
    return navigate("/");
  }

  const onFailure = (res) => {
    alert(res?.errors?.error)
  }

  const validateField = (fieldName, value) => {
    let emailValid = true;
    let passwordValid = true;

    switch (fieldName) {
      case 'email':
        emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value)
        break;
      case 'password': 
        passwordValid = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}/i).test(value)
      default:
        break;
    }

    
    
    setValidate({
      ...validate,
      email: !emailValid,
      password: !passwordValid,
    })

  }
  const handleLogin = async () => {
    if(formValid){
      dispatch(await fetchLogin(form, onSuccess, onFailure));
    } else {
      alert('Form in valid');
    }
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form, 
      [name]: value
    })
    validateField(name, value)
  }

  return (
    <div className='container-fluid component__pages'>
      <div className="row">
        <div className="col-7  left_section">
          <img src={LoginImage} alt="group-img"/>
        </div>
        <div className="col-5 right_section">
          <h4 className='main_title'>Welcome to ReactJS Test Interview! 👋🏻</h4>
          <span className='sub_title'>Please sign-in to your account and start the adventure</span>
          <Form className='sign_up_form'>
            <FormGroup>
              <Label for="examplePassword">
                Email<span className='required'>*</span>
              </Label>
              <Input required value={form.email} name='email' onChange={(e) => handleOnChange(e)} invalid={validate.email} />
              <FormFeedback>
                Email is not valid
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                Password<span className='required'>*</span>
              </Label>
              <Input required value={form.password} name='password' onChange={(e) => handleOnChange(e)} invalid={validate.password} type='password'/>
              <FormFeedback>
                The password must be between 6-18 characters and must be contain at least one digit, one special character, and one letter
              </FormFeedback>
            </FormGroup>
            <Button className='submit_button' onClick={handleLogin} disabled={buttonDisabled}>
              Log in
            </Button>
            <Link to={'/signup'}>
              <Button className='submit_button mt-2'>
                Sign up
              </Button>
            </Link>
          </Form>
        </div>
      </div>
   </div>
  )
}


export default Login