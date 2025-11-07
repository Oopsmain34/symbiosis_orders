import React from 'react'
import Axios from "axios";
import {Form,Button,Container,Table} from 'react-bootstrap'
class Admin_Home extends React.Component
{
  constructor(props)
  { 
   super(props);
   this.state = { "id":'',"name":'',"price":'',"qty":'',"file":'',mylist:[] }
   
  }
  componentDidMount()
  {
    Axios.get("http://localhost:4200/showproduct").then(
        res=> this.setState({mylist:res.data}) );
  }
  change1 = (e) => { this.setState({"name":e.target.value}); }

 change2 = (e) => { this.setState({"price":e.target.value}); }
 change3 = (e) => { this.setState({"file":e.target.files[0]}); }
changeQ = (e) => { this.setState({"qty":e.target.value}); }

  mysubmit = () =>
    {
     
    const formData = new FormData();
    formData.append('product_name',this.state.name);
    formData.append('product_price',this.state.price);
    formData.append('product_qty',this.state.qty);
   
    formData.append('file',this.state.file)
 
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
  Axios.post("http://localhost:4200/saveproduct",formData,config).then(
res=> this.setState({mylist:res.data}) );
    }

  myupdate = () =>
    {
      const data={...this.state};
        Axios.post("http://localhost:4200/update",data).then(
res=> this.setState({mylist:res.data}) );
    }
onDelete = e => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    Axios.get(`http://localhost:4200/productdelete/${id}`).then(res => {
       this.setState({mylist:res.data});
     });
  };
onEdit = e => {
    e.preventDefault();
    const id = e.target.id;
   
    console.log(id);
    Axios.get(`http://localhost:4200/productedit/${id}`).then(res => {
        this.setState({name:res.data[0].product_name,price:res.data[0].product_price,id:res.data[0].product_id}) ;
 
    });
  };

   render()
    {
        return(
            <div>
                 <h3 align="center"> Welcome to Admin Home </h3>


             
<Container>
<Form>
  <Form.Group className="mb-3" controlId="p1">
    <Form.Label>Product Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Product Name" name="t1" onChange={this.change1} value={this.state.name} />
    
  </Form.Group>

 <Form.Group className="mb-3" controlId="p2">
    <Form.Label>Product Price</Form.Label>
    <Form.Control type="text" placeholder="Enter Product Price" name="t2" onChange={this.change2} value={this.state.price}  />
    
    
  </Form.Group>
 <Form.Group className="mb-3" controlId="p3">
    <Form.Label>Product Quantity</Form.Label>
    <Form.Control type="text" placeholder="Enter Product Quantity" name="t2" onChange={this.changeQ} value={this.state.qty}  />
    
    
  </Form.Group>

 <Form.Group className="mb-3" controlId="p4">
    <Form.Label>Product Image</Form.Label>
   <Form.Control type="file"  name="file" onChange={this.change3}  />
    
  </Form.Group>


  
  <Button variant="primary" type="button" onClick={this.mysubmit}  >
   
    Submit
  </Button>

&nbsp;
  <Button variant="success" type="button" onClick={this.myupdate}  >
   
    Update
  </Button>

</Form>

 
<br/>


      

<Table striped bordered hover> 
<thead>
<th>Image</th><th> ID </th> <th> Name </th> <th> Price </th>
                      <th>Delete</th> <th>Edit</th>
</thead>
<tbody>
                        {this.state.mylist.map((item,index)=>{
                            
                            return(
                                <tr key={index}>
                                  <td><img src={item.product_image} width="100" height="100" /></td>
                                    <td>{item.product_id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.product_price}</td>
                                <td><Button
                      variant="danger"
                      id={item.product_id}
                      onClick={this.onDelete}
                    >
                      Delete
                    </Button>
</td>



<td><Button
                      variant="warning"
                      id={item.product_id}
                      onClick={this.onEdit}
                    >
                      Edit
                    </Button>
</td>
                                    </tr>
                            );
                        })}

                        
                    </tbody>
</Table>
</Container>

            </div>
             );
     }

}

export default Admin_Home;
