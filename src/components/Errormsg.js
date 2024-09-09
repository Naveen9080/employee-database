function Errormsg(props){
   const emsg=props.msg;
   return (
    <span style={{color:"red"}}>{emsg}</span>
   )
}
export default Errormsg;