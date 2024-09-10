import { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import Errormsg from './Errormsg';
function Login({setselect}){
  const redirect=useNavigate();
  const [msg,setmsg]=useState('');
  const [check,setcheck]=useState({
    emailId:'',
    password:''
  });
  const relode=async(e)=>{
    if(check.emailId.length===0 || check.password.length===0){
      setmsg('please fill the field');
    }
    else{
    const response = await fetch(`http://localhost:8080/doit/getuser/${check.emailId}`);
    const Validdata = await response.json();
    console.log(check);
    console.log(Validdata);
    if(Validdata.emailId===null){
      setmsg("Mail Id Not found");
    }
    else{
      if(Validdata.password!==check.password){
         setmsg("Password Incorrect!");
      }
      else{
        setmsg("");
        setselect(check);
        redirect('/employee-database/data')
      }
    }
    //redirect('/employee-database/data')
  }
  }
  const sign=()=>{
    redirect('/employee-database')
  }
  const handetails=(e)=>{
    // e.preventDefault();
    const {name,value}=e.target;
    console.log(value+" "+name);
    setcheck(pre=>({
        ...pre,
        [name]:value,
    }));
    // setmsg("error in the field");
};
  return(
    <body className="log">
                <h1><i>D</i>atabase <i>M</i>angement</h1>
                <hr></hr>
            <div className="gparent">
                <div className="cparent">
                    <h1>Login</h1>
                    <Errormsg msg={msg}/>
                    <table>
                        <tr>
                            <td><label>UserName</label></td>
                            <td><input type="text" placeholder="UserName" name="emailId" onChange={(e)=>handetails(e)}></input></td>
                        </tr>
                        <tr>
                            <td><label>Password</label></td>
                            <td><input type="password" placeholder="Password" name="password" onChange={(e)=>handetails(e)}></input></td>
                        </tr>
                    </table>
                    <button className='but cbut' onClick={relode} >Login</button>
                    <span>if don`t have an account <a onClick={sign}>sign up</a></span>
                    </div>
            </div>
    </body>
  )
}
export default Login;