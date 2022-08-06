import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap'
import React, { useEffect, useState } from 'react'
import { fetchRegister } from '../redux/actions/api'
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { getCookie } from '../utils/helpers/auth';
import Group from '../styles/imgs/group.svg';

const SignUp = () => {
  const token = getCookie('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formValid, setFormValid] = useState(false); 

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const [validate, setValidate] = useState({
    firstName: false,
    lastName: false,
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

  console.log('formvalid',formValid);

  const validateField = (fieldName, value) => {
    let emailValid = true;
    let passwordValid = true;
    let firstNameValid;
    let lastNameValid;

    switch (fieldName) {
      case 'firstName': 
        firstNameValid = (/^$/i).test(value);
        break;
      case 'lastName': 
        lastNameValid = (/^$/i).test(value);
        break;
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
      firstName: firstNameValid,
      lastName: lastNameValid,
      email: !emailValid,
      password: !passwordValid,
    })
  }

  const signUp = {
    firstName: 'Thai',
    lastName: 'Bao',
    email: 'jackymad+20@gmail.com',
    password: 'jackymad'
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form, 
      [name]: value
    })
    validateField(name, value)
  }

  const onSuccess = (res) => {
    return navigate("/");
  }

  const onFailure = (res) => {
    alert(res?.errors?.error)
  }

  const clickSignUp = async () => {
    if(formValid){
      dispatch(await fetchRegister(form, onSuccess, onFailure));
    } else {
      alert('Form in valid');
    }
    
  }

  return (
    <div className='container-fluid component__pages'>
      <div className="row">
        <div className="col-7  left_section">
          <img src={Group} alt="group-img"/>
        </div>
        <div className="col-5 right_section">
          <h4 className='main_title'>Adventure starts here</h4>
          <span className='sub_title'>Make your app management easy and fun!</span>
          <Form className='sign_up_form'>
            <FormGroup>
              <Label for="examplePassword">
                First name<span className='required'>*</span>
              </Label>
              <Input required value={form.firstName} name='firstName' onChange={(e) => handleOnChange(e)} invalid={validate.firstName} />
              <FormFeedback>
                First name is required
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                Last name<span className='required'>*</span>
              </Label>
              <Input required value={form.lastName} name='lastName' onChange={(e) => handleOnChange(e)} invalid={validate.lastName} />
              <FormFeedback>
                Last name is required
              </FormFeedback>
            </FormGroup>
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
            <Button className='submit_button' onClick={clickSignUp} disabled={buttonDisabled}>
              Submit
            </Button>
            <Link to={'/login'}>
              <Button className='submit_button mt-2'>
                Already have account ? Log in
              </Button>
            </Link>
            
          </Form>
        </div>
      </div>
   </div>
  )
}
export default SignUp