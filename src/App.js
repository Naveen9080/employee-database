import './App.css';
import './components/Form.css';
import { Toaster } from '@blueprintjs/core';
import editimg from './components/img/edit.png';
import addsym from './components/img/addsym.jpg'
import Details from './components/Details';
import "./components/Iterate.css";
import Update from './components/Update';
import Errormsg from './components/Errormsg';
import { useState ,useEffect} from 'react';
import { useRef } from 'react';
const AppToaster=Toaster.create({
  position:'top'
})
function App({select}) {
   console.log(select);
   const [tab,setTab]=useState();
   const [info,setinfo]=useState();
   const [user,setuser]=useState();
   const [tp,settp]=useState(-1);
   //const [value,setvalue]=useState();
   //const [use,setuse]=useState(false);

  const fetchData = async (tid) => {
    if(tid>0){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/doit/getdetails/${tid}`);
    const data = await response.json();
    await setinfo(data);
    }
   };
  useEffect(() => {
    const fetchTable=async ()=>{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/doit/getuser/${select.emailId}`);
      const ValidTable = await response.json();
      if(ValidTable.uid!==null){
        window.localStorage.setItem('user',JSON.stringify(ValidTable));
        window.localStorage.setItem('table',JSON.stringify(ValidTable.tmap));
      }
      else{
        setuser();
        setTab();
      }
       setuser(JSON.parse(window.localStorage.getItem('user')));
       setTab(JSON.parse(window.localStorage.getItem('table')));
    }
  fetchTable();
  },[]);

  const [firstname,setfname]=useState("");
  const [lastname,setlname]=useState("");
  const [age,setage]=useState(0);
  const [salary,setsalary]=useState("");   
  const [dob,setdob]=useState("");
  const [role,setrole]=useState("");
  const [pno,setpno]=useState("");
  const [email,setmailid]=useState('');
  const [address,setaddress]=useState('');
  const [url,seturl]=useState('');
  const data=[
   {
    did:0,
    firstname:'Ram',
    lastname:'Raj',
    age:18,
    salary:20000,
    dob:'2003-04-02',
    role:'Developer',
    pno:'9879342345',
    email:'Ramraj@gmail.com',
    address:'west street,Salem',
    url:''
   },{
    did:0,
    firstname:'Rohit',
    lastname:'Sharma',
    age:18,
    salary:20000,
    dob:'2003-12-02',   
    role:'Data Scientiest',
    pno:'9879342345',
    email:'rohitsharma@gmail.com',
    address:'west street,Salem',
    url:''
   }
  ];
  const [id,setid]=useState(13);
  const [value,setvalue]=useState(data);
  const [view,setview]=useState(false);
  const [tview,settview]=useState(false);

  const menuref=useRef(null);
  const call=()=>{
     setview(!view);
  }
  const callsub=()=>{
    settview(!view);
 }
  const change=(data)=>{
    setvalue(data);
  }
  const newcha=(newone)=>{
    setval(newone);
  }
  const removeitem=async(did)=>{
    const newlist=value.filter((ele)=>ele.did!==did);
    await fetch(`${process.env.REACT_APP_API_URL}/doit/details/${did}`,
      {
        method:'DELETE'
      }
    )
    setinfo(newlist);
  }
  const add=async (e)=>{
    e.preventDefault();
    setid(()=>id+3);
    const newobj={firstname,lastname,age,salary,dob,role,pno,email,address,url};
    const res=await fetch(`${process.env.REACT_APP_API_URL}/doit/add_details/${tp}`,{
      method:'POST',
      body:JSON.stringify(newobj),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const data=await res.json();
    const alldata=await info;
    await alldata?.push(data);
    setinfo(alldata);
    setview(false);
    AppToaster.show({
      message:'User Added Successfully',
      intent:'success',
      timeout:3000
    });
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
  const [msg,setmsg]=useState('');
  const handle=(e)=>{
    if(!menuref.current.contains(e.target)){
     setview(false);
     seteditv(false);
     settview(false);
     setmsg('');
    }
    else if(e.target.className==='cross' || e.target.className==='btn'){
       seteditv(false);
       setmsg('');
    }
  }
  const [editv,seteditv]=useState(false);
  const showedit=()=>{
    seteditv(!editv);
  }
  useEffect(()=>{
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
  const [tablen,setTablen]=useState({
    dname:''
  })
  const handledname=(e)=>{
      const {name,value}=e.target;
      setTablen({
        [name]:value
      })
  }
  const handletable=async(e)=>{
        e.preventDefault();
        if(tablen.dname.length!==0){
        const res = await fetch(`${process.env.REACT_APP_API_URL}/doit/add_table/${user.uid}`,{
        method:'POST',
        body:JSON.stringify(tablen),
        headers:{
          'Content-Type':'application/json'
        }}); 
        const newtable=await res.json();
        console.log("welcome to table "+newtable);
        setTab((previousvalue)=>[...previousvalue,newtable]);
        settview(false);
        setTablen({dname:''});
        AppToaster.show({
          message:'Table Created Successfully',
          intent:'success',
          timeout:3000
        });
      }
      else{
        setmsg('please enter the table name');
      }
  }
  const switchtable=async(e)=>{
    if(e.target.value>=0){
      await settp(tab[e.target.value].tid);
      fetchData(tab[e.target.value].tid);
    }
  }
  return (
    <>
    <body className={`main ${view || tview?`active`:editv?`active`:`inactive`}`}>
      <div className='add_emp'> 
      <div className='leftcorner'>
          <select className='sname' title='Select_table' onChange={e=>switchtable(e)}>
            <option value={-1} onClick={e=>switchtable(e)}>Please choose your table</option>
            {tab?.map((opt,index)=>{
              return(
              <option value={index} onClick={e=>switchtable(e)}>{opt.dname}</option>
              );
            })}
          </select>
          <img src={addsym} alt='/' className='addsym' title='Add_Table' onClick={callsub}/>
        </div> 
        <h1 className='head'>Employee Database Management</h1>
        <div className='add' onClick={call}>Add Employee</div>
      </div>
      <div className="container">  
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
        <div className="sub1">  
         <h1 className="title">Employee List</h1>
         <div className='emp list'>
         <ul className='over'>
            {info?.map((ele,index) => {
               return( 
                <li key={index} onClick={()=>showid(ele)} >{ele.firstname} {ele.lastname} <span className="icon" onClick={()=>{removeitem(ele.did)}}>&#10060;</span></li>
                );
            })};
          </ul>
         </div>
        </div>
       </div>
    </body>
    <div ref={menuref} className='cen'>
    {view &&  
       <form className={`form ${view?`active`:`inactive`}`}  onClick={han}>
       <h3>Enter the Details<p className='cross' onClick={()=>setview(false)}>&#10006;</p></h3>
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
       <button  className='btn' disabled={firstname.length===0 ||lastname.length===0||age.length===0||age.length>2||role.length===0||salary.length===0||pno.length===0||pno.length>10|| !email.endsWith('@gmail.com') || address.length===0}>
        <span onClick={add} type='submit'>Submit</span>
       </button>
     </form>
   }
   {tview&&
      <form className={`form ${view?`active`:`inactive`} hel`} onClick={han}>
       <h3>Enter Table Name<p className='cross' onClick={()=>settview(false)}>&#10006;</p></h3>
       <Errormsg msg={msg}/><br></br>
       <input type='text' placeholder='Enter table Name' name='dname' onChange={(e)=>handledname(e)}></input>
       <button onClick={(e)=>handletable(e)}>Create</button>
       </form>
   }
   {editv && <Update item={val} editv={editv} fun={showedit} value={info} change={change} newcha={newcha} setinfo={setinfo} />}
 </div>
 </> 
  );
}
export default App;
