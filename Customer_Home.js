import React from 'react'
import Axios from "axios";
import {Form,Button,Container,Table} from 'react-bootstrap'

class Customer_Home extends React.Component
{
  constructor(props)
  { 
   super(props);
   this.state = { "qty":'',mylist:[] }

  
   
  }
 
  componentDidMount()
  {
    Axios.get("http://localhost:4200/showproduct").then(
        res=> this.setState({mylist:res.data}) );
  }
 
onAddcart = e => {
    e.preventDefault();
    const id = e.target.id;
    const qty = 1;
    console.log(qty);
    
 const data={"id":id,"qty":qty};
        Axios.post("http://localhost:4200/productaddcart",data).then(
res=> console.log("Added to Cart") );

  
  };


   render()
    {
        return(
            <div>
<Container>
                 <h2 align="center">  Customer Home </h2>
                
<hr/>    
<Table striped bordered hover> 
<thead>

<th> Image</th><th>Id</th> <th> Name </th> <th> Price </th>
<th>Add Cart</th>
</thead>
<tbody>
                        {this.state.mylist.map((item,index)=>{
                            
                            return(
                                <tr key={index}>
 <td><img src={item.product_image} width="100" height="100" /></td>
                                    <td>{item.product_id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.product_price}</td>
                                <td>
                                 
<Button variant="success" type="button"  id={item.product_id}
                      onClick={this.onAddcart}>
    Add To Cart
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

export default Customer_Home;
