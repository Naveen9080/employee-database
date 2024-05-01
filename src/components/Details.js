import '../index.css'
function Details(props){
        let item=props.item;
        return(
            <>
            <center>
                <h3 className='name'><u>{item.firstname+' '+item.lastname}</u></h3>
            <table style={{fontSize:'medium'}} className="show">
                <tr>
                    <td>Age : {item.age}</td>
                    <td>D.O.B : {item.dob}</td>
                </tr>
                <tr>
                    <td>Role : {item.role}</td>
                    <td>Salary : {item.salary}</td>
                </tr>
                <tr>
                    <td>Phone no : {item.ph_no}</td>
                    <td>Mail : {item.mailid}</td>
                </tr>
                {/* <tr>
                    <td>Address :-</td>
                </tr> */}
                {/* <tr>
                    <center>
                    <td>{item.address}</td>
                    </center>
                </tr> */}
            </table>
            <h4>Address:-</h4>
            <p>{item.address}</p>
            </center>
            
            </>
        );
}
export default Details;