function Errormsg(props){
   const emsg=props.msg;
   return (
    <span style={{color:"red",textAlign:'center',margin:'0px',padding:'0px'}}>{emsg}</span>
   )
}
export default Errormsg;