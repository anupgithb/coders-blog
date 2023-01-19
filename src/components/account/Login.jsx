
import { Box, Button, TextField, styled, Typography} from '@mui/material'
import React,{useState,useContext} from 'react'
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
import {useNavigate} from 'react-router-dom';
const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
    `

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const Text = styled(Typography)`
    color:#878787;
    font-size:16px;
`

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 1px 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const loginInitialValues = {
    username:'',
    password:''
}
const  signupInitialValues={
    name:'',
    username:'',
    password:''
}

const Login = ({isUserAuthenticated}) => {

    const [account,toggleAccount] = useState('login');
    const [ signup,setSignup]= useState(signupInitialValues);
    const [login,setLogin] = useState(loginInitialValues);
    const [error, showError] = useState('');
    const {setAccount} = useContext(DataContext);
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const navigate = useNavigate();

    const toggleSignUp = ()=>{
        account ==='login'?
        toggleAccount('signup'):
        toggleAccount('login')
    }
    
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async() =>{
       let response= await API.userSignup(signup);
       if (response.isSuccess) {
        showError('');
        setSignup(signupInitialValues);
        toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const loginUser= async() =>{
        let response= await API.userLogin(login);
        if(response.isSuccess){
          showError('');
          sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
          sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
          
          setAccount({username:response.data.username, name : response.data.name});
          isUserAuthenticated(true);
          navigate('/');
        }
        else{
            showError('Something went wrong Please try again later');
        }
    }
  return (
    <Component>
        <Box>
            <Image src={imageURL} alt="login" />
            {
                account ==='login' 
            
                ?
            <Wrapper>
                <TextField variant='standard' label='Enter username' value={login.username} name='username' onChange={(e)=> onValueChange(e)}/>
                <TextField variant='standard' label='Enter password' value={login.password} name='password' onChange={(e)=> onValueChange(e)}/>

                {error&&<Error>{error}</Error>}
                <LoginButton variant='contained' onClick={()=>loginUser()}>Login</LoginButton>
                <Text style={{ textAlign: 'center' }}>OR</Text>
                <SignupButton onClick={()=> toggleSignUp()}>Create An Account</SignupButton>
            </Wrapper> 
            :
            <Wrapper>
                <TextField variant="standard" onChange={(e) => onInputChange(e)} value={signup.name} name='name' label='Enter Name' />
                <TextField variant="standard" onChange={(e) => onInputChange(e)} value={signup.username} name='username' label='Enter Username' />
                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                {error&&<Error>{error}</Error>}
                <SignupButton onClick={()=>signupUser()}>Sign Up</SignupButton>
                <Text style={{ textAlign: 'center' }}>OR</Text>
                <LoginButton variant='contained' onClick={()=>toggleSignUp()}>Already have An Account</LoginButton>
            </Wrapper>
                }
        </Box>
    </Component>
  )
}

export default Login;