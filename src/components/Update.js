import {  useState } from 'react';
import './Form.css'
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
  const [ph_no,setpno]=useState(item.ph_no);
  const [mailid,setmailid]=useState(item.mailid);
  const [address,setaddress]=useState(item.address);
  const [url,seturl]=useState(item.url);
  const han=(e)=>{
    e.stopPropagation();
  }
  const update=(id)=>{
    const newone={id,firstname,lastname,age,salary,dob,role,ph_no,mailid,address,url};
    console.log('hello newone');
    setvalue((pre)=>pre.map((ele)=>{
      if(ele.id===id){
        return{
          firstname,lastname,age,salary,dob,role,ph_no,mailid,address,url
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
  console.log(value);
  props.change(value);
    return(
      <>
     {edit && <form className={`form ${edit?`active`:`inactive`}`}  onClick={han}>
      <h3>Update your Information<p className='cross' onClick={()=>setedit(false)} >&#10006;</p></h3>
      <div className="inp">
        <input type='text' onChange={(e)=>setfname(e.target.value)} value={firstname}></input>
        <input type='text' onChange={(e)=>setlname(e.target.value)} value={lastname}></input>
        <input type='number' onChange={(e)=>setage(e.target.value)} value={age}></input>
        <input type='number' onChange={(e)=>setsalary(e.target.value)} value={salary}></input>
        <input type='date' onChange={(e)=>setdob(e.target.value)}  value={dob}></input>
        <input type='text' onChange={(e)=>setrole(e.target.value)} value={role}></input>
        <input type='text' onChange={(e)=>setpno(e.target.value)} value={ph_no}></input>
        <input type='text' onChange={(e)=>setmailid(e.target.value)} value={mailid}></input>
        <input type='text' onChange={(e)=>setaddress(e.target.value)} value={address}></input>
        <input type='url' placeholder='Image URL(optional)' onChange={(e)=>seturl(e.target.value)}></input>
      </div>
      <div className='btn'>
       <span type='submit' onClick={()=>update(item.id)} style={{cursor:'pointer'}}>Update</span>
      </div>
    </form>
    }
   </>
    )

}

export default Update;