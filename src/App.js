import './App.css';
import './components/Form.css';
import { Toaster } from '@blueprintjs/core';
import editimg from './components/img/edit.png';
import Details from './components/Details';
import "./components/Iterate.css";
import Update from './components/Update';
import { useState ,useEffect} from 'react';
import { useRef } from 'react';
const AppToaster=Toaster.create({
  position:'top'
})
function App() {
  const [firstname,setfname]=useState("");
  const [lastname,setlname]=useState("");
  const [age,setage]=useState(0);
  const [salary,setsalary]=useState("");   
  const [dob,setdob]=useState("");
  const [role,setrole]=useState("");
  const [ph_no,setpno]=useState("");
  const [mailid,setmailid]=useState('');
  const [address,setaddress]=useState('');
  const [url,seturl]=useState('');
  const data=[
   {
    id:1,
    firstname:'Ram',
    lastname:'Raj',
    age:18,
    salary:20000,
    dob:'2003-04-02',
    role:'Developer',
    ph_no:'9879342345',
    mailid:'Ramraj@gmail.com',
    address:'west street,Salem',
    url:''
   },{
    id:2,
    firstname:'Rohit',
    lastname:'Sharma',
    age:18,
    salary:20000,
    dob:'2003-12-02',   
    role:'Data Scientiest',
    ph_no:'9879342345',
    mailid:'rohitsharma@gmail.com',
    address:'west street,Salem',
    url:''
   }
  ]
  const [id,setid]=useState(data.length+1);
  const [value,setvalue]=useState(data);
  const [view,setview]=useState(false);
  const menuref=useRef(null);
  const call=()=>{
     setview(!view);
  }
  const change=(data)=>{
    setvalue(data);
    //console.log(data,newone);
  }
  const newcha=(newone)=>{
    setval(newone);
  }
  const removeitem=(id)=>{
    const newlist=value.filter((ele)=>ele.id!==id);
    setvalue(newlist);
  }
  const add=(e)=>{
    setid(()=>id+3);
    const newobj={id,firstname,lastname,age,salary,dob,role,ph_no,mailid,address,url};
    setvalue((previousvalue)=>[...previousvalue,newobj]);
    // <List value={value}/>
    //setval(newobj);
    setview(false);
    AppToaster.show({
      message:'User Added Successfully',
      intent:'success',
      timeout:3000
    })
    setfname('');
    setlname('');
    setage('');
    setsalary('');
    setdob('');
    setmailid('');
    setrole('');
    setpno('');
    setaddress('');
    seturl('');
  };
  const handle=(e)=>{
    if(!menuref.current.contains(e.target)){
     setview(false);
     seteditv(false);
    }
    else if(e.target.className==='cross' || e.target.className==='btn'){
       seteditv(false);
    }
  }
  const [editv,seteditv]=useState(false);
  const showedit=()=>{
    seteditv(!editv);
  }
  useEffect(()=>{
    console.log(firstname);
    document.addEventListener("mousedown",handle);
    return()=> {
      document.removeEventListener("mousedown",handle);
    }
  });
  const han=(e)=>{
    e.stopPropagation();
  }
  const [val,setval]=useState(data[0]);
  const showid=(item)=>{
    setval(item);
  }
  
  return (
    <>
    <body className={`main ${view?`active`:editv?`active`:`inactive`}`}>
      <div className='add_emp'  > 
        <h1 className='head'>Employee Database Management</h1>
        <div className='add' onClick={call}>Add Employee</div>

      </div>
      <div className="container">
        <div className="sub1">  
         <h1 className="title">Employee List</h1>
         <div className='emp list'>
         <ul >
            {value.map((ele) => (
                <li key={ele.id} onClick={()=>showid(ele)} >{ele.firstname} {ele.lastname} <span className="icon" onClick={()=>{removeitem(ele.id)}}>&#10060;</span></li>
            ))}
          </ul>
         </div>
        </div>
        <div className="sub2">
          <h1 className="title">Employee Details</h1>
          <div className="image">
           {Object.keys(val.url).length===0?<img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt='Not Found' />:<img src={val.url} alt='Not Found'/>}
          </div>
          <div className='corner' onClick={showedit}>
          <p className='edit'>Edit</p>
          <img className='editi' src={editimg} alt=''/>
          </div>
          <div className='emp details'>
             <Details item={val} /> 
          </div>
        </div>
       </div>
    </body>
    <div ref={menuref}>
    {view &&  
       <form className={`form ${view?`active`:`inactive`}`}  onClick={han}>
       <h3>Enter the Information<p className='cross' onClick={()=>setview(false)}>&#10006;</p></h3>
       <div className="inp">
         <input type='text' onChange={(e)=>setfname(e.target.value)} placeholder='FirstName' required></input>
         <input type='text' onChange={(e)=>setlname(e.target.value)} placeholder='LastName'></input>
         <input type='number' onChange={(e)=>setage(e.target.value)} placeholder='Age'></input>
         <input type='number' onChange={(e)=>setsalary(e.target.value)} placeholder='Salary'></input>
         <input type='date' onChange={(e)=>setdob(e.target.value)}  placeholder='D.O.B'></input>
         <input type='text' onChange={(e)=>setrole(e.target.value)} placeholder='Role'></input>
         <input type='text' onChange={(e)=>setpno(e.target.value)}placeholder='Phone no'></input>
         <input type='text' onChange={(e)=>setmailid(e.target.value)}placeholder='Email'></input>
         <input type='text' onChange={(e)=>setaddress(e.target.value)}placeholder='Address'></input>
         <input type='url' placeholder='Image URL(optional)' onChange={(e)=>seturl(e.target.value)}></input>
       </div>
       <button className='btn' disabled={firstname.length===0 ||lastname.length===0||age.length===0||age.length>2||role.length===0||salary.length===0||ph_no.length===0||ph_no.length>10|| !mailid.endsWith('@gmail.com') || address.length===0}>
        <span onClick={add} type='submit' style={{cursor:'pointer'}}>Submit</span>
       </button>
     </form>
   }
   {editv && <Update item={val} editv={editv} fun={showedit} value={value} change={change} newcha={newcha}/>}
 </div>
 </> 
  );
}
export default App;
