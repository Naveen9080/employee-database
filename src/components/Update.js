import {  useState } from 'react';
import './Form.css';
import '../App.css';
import { Toaster } from '@blueprintjs/core';
const AppToaster=Toaster.create({
  position:'top'
})
function Update(props){
  const item=props.item;
  const [edit,setedit]=useState(props.editv);
  const [value,setvalue]=useState(props.value);
  const [firstname,setfname]=useState(item.firstname);
  const [lastname,setlname]=useState(item.lastname);
  const [age,setage]=useState(item.age);
  const [salary,setsalary]=useState(item.salary);   
  const [dob,setdob]=useState(item.dob);
  const [role,setrole]=useState(item.role);
  const [pno,setpno]=useState(item.pno);
  const [email,setmailid]=useState(item.email);
  const [address,setaddress]=useState(item.address);
  const [url,seturl]=useState(item.url);
  const han=(e)=>{
    e.stopPropagation();
  }
   const update=async(did)=>{
    if(did!==0){
    const newone={did,firstname,lastname,age,salary,dob,role,pno,email,address,url};
    await fetch(`http://localhost:8080/doit/editD/${did}`,{
      method:'PUT',
      body:JSON.stringify(newone),
      headers:{
        'Content-Type':'application/json'
      }
    });
    props.setinfo((pre)=>pre.map((ele)=>{
      if(ele.did===did){
        return{
          firstname,lastname,age,salary,dob,role,pno,email,address,url
        };
      }
      else{
        return ele;
      }
    })
  )
    setedit(false);
    setTimeout(() => {
      props.fun();
      props.newcha(newone);
      AppToaster.show({
        message:'Updated Successfully',
        intent:'success',
        timeout:3000
      })
    }, 1000);
    // props.fun();
  }
  else{
    setedit(false);
    setTimeout(() => {
    props.fun();
    AppToaster.show({
      message:'its sample info you can`t change it',
      intent:'primary',
      timeout:3000
    })
  }, 1000);

  }
  }
 // props.change(value);
    return(
      <>
     {edit && <form className={`form ${edit?`active`:`inactive`}`}  onClick={han}>
      <h3>Update your Details<p className='cross' onClick={()=>setedit(false)} >&#10006;</p></h3>
      <div className="inp">
        <input type='text' onChange={(e)=>setfname(e.target.value)} value={firstname}></input>
        <input type='text' onChange={(e)=>setlname(e.target.value)} value={lastname}></input>
        <input type='number' onChange={(e)=>setage(e.target.value)} value={age}></input>
        <input type='number' onChange={(e)=>setsalary(e.target.value)} value={salary}></input>
        <input type='text' onChange={(e)=>setdob(e.target.value)}  value={dob}></input>
        <input type='text' onChange={(e)=>setrole(e.target.value)} value={role}></input>
        <input type='text' onChange={(e)=>setpno(e.target.value)} value={pno}></input>
        <input type='text' onChange={(e)=>setmailid(e.target.value)} value={email}></input>
        <input type='text' onChange={(e)=>setaddress(e.target.value)} value={address}></input>
        <input type='url' placeholder='Image URL(optional)' onChange={(e)=>seturl(e.target.value)}></input>
      </div>
      <div className='btn'>
       <span type='submit' onClick={()=>update(item.did)} style={{cursor:'pointer'}}>Update</span>
      </div>
    </form>
}
   </>
    )

}

export default Update;