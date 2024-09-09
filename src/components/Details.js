import '../index.css'
function Details(props){
        let item=props.item;
        return(
            <>
            <center>
                <h3 className='name'><u>{item.firstname+' '+item.lastname}</u></h3>
            <table style={{fontSize:'medium'}} className="show">
                <tr>
                    <td><span>Age :</span> {item.age}</td>
                    <td><span>D.O.B :</span> {item.dob}</td>
                </tr>
                <tr>
                    <td><span>Role :</span> {item.role}</td>
                    <td><span>Salary :</span> {item.salary}</td>
                </tr>
                <tr>
                    <td><span>Phone no :</span> {item.pno}</td>
                    <td><span>Mail :</span> {item.email}</td>
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