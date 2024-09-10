import './SignUp.css';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Errormsg from './Errormsg';
function SignUp(){
    const navigate=useNavigate();
    const [msg,setmsg]=useState('');
    const [signData,setSignData]=useState({
        firstname:'',
        lastname:'',
        emailId:'',
        password:''
     });
    const log=async()=>{
        if(signData.emailId.length===0 || signData.password.length===0 || signData.firstname.length===0 || signData.lastname.length===0){
            setmsg("Please fill the field");
        }
        else{
        const response = await fetch(`http://localhost:8080/doit/getuser/${signData.emailId}`);
        const data= await response.json();
        if(!signData.emailId.endsWith("@gmail.com")){
            setmsg('Please enter valid Email ID');
        }
        else if(signData.password.length<8){
            setmsg('Password have atleast 8 character');
            console.log(data);
        }
        else if(data.uid!==null){
            setmsg('MailID alreay exits please singin');
        }
        else{
        setmsg('');
        await fetch('http://localhost:8080/doit/add_user',{
            method:'POST',
            body:JSON.stringify(signData),
            headers:{
              'Content-Type':'application/json'
            }});
        setSignData({
            firstname:'',
            lastname:'',
            emailId:'',
            password:''
        })
        navigate('/employee-database/data');
    }

    }
    // setmsg('');
    };
    
    const handsign=(e)=>{
        // e.preventDefault();
        const {name,value}=e.target;
        console.log(value+" "+name);
        setSignData(pre=>({
            ...pre,
            [name]:value,
        }));
    };
    const sign=()=>{
        navigate('/employee-database/login');
    }
    return(
        <body className='sign'>
                <h1><i>D</i>atabase <i>M</i>angement</h1>
                <hr></hr>
               <div className='parent'>
                <div>
                 <h1>Sign Up</h1><br></br>
                 <Errormsg msg={msg}/><br></br>
                 <input type='text' placeholder='First Name' name='firstname' onChange={(e)=>handsign(e)}></input><br></br>
                 <input type='text' placeholder='Last Name' name='lastname' onChange={(e)=>handsign(e)}></input><br></br>
                 <input type='email' placeholder='Email' name='emailId' onChange={(e)=>handsign(e)}></input><br></br>
                 <input type='password' placeholder='Password' name='password'  onChange={(e)=>handsign(e)}></input><br></br>
                 <span id='errmsg'></span>
                 <p>Already a member? <a onClick={sign}>Log In</a></p><br></br>
                 <button onClick={log} className='sbut' type='submit'>Sign up</button>
               </div>
               </div>
        </body>
    )
}
export default SignUp;