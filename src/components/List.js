import "./Iterate.css";
import { useState } from "react";
function List(props,{removeitem}){
  //const [list,setlist]=useState(props.value);
  const list=props.value;
 // const [value,setvalue]=useState([]);
  // list.onChange(()=>setvalue(list));
  console.log('call from list',list);
   function del(id){
    const newlist=list.filter((ele)=>ele.id!==id);
    //setvalue(newlist);
   }
    return(
        <>
          <ul >
            {list.map((ele) => (
                <li key={ele.id}>{ele.firstname} {ele.lastname} <span className="icon" onClick={()=>{removeitem(ele.id)}}>&#10060;</span></li>
            ))}
          </ul>
        </>
    )
}


export default List;