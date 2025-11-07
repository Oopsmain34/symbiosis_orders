import React from 'react'
import Axios from "axios";
import { Form,FormControl,Button,Container,Table } from 'react-bootstrap'
 
class View_Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  "gross": '', mylist: [] }

     }
 updateAmount =() =>
  {
     var myTotal = 0;
     for (var i = 0, len = this.state.mylist.length; i < len; i++) {
            myTotal += (this.state.mylist[i].product_price *this.state.mylist[i].qty); 
        }
          this.setState({gross:myTotal});
    localStorage.setItem("gross",myTotal+"");
    localStorage.setItem("products",JSON.stringify(this.state.mylist));
   }
 Incqty= (e) =>
 {
e.preventDefault();
    const id = e.target.id;
var qty=1;
for (var i = 0, len = this.state.mylist.length; i < len; i++) {

          if(this.state.mylist[i].product_id==id)
             {
            
              this.state.mylist[i].qty+=1;
               qty= this.state.mylist[i].qty;
              this.setState({ mylist: this.state.mylist });
              break;
              }
        }
  this.updateAmount();
  const data={"id":id,"qty":qty}
  Axios.post(`http://localhost:4200/updatecart`,data).then(res => {
    if(qty==0)
    this.setState({ mylist: res.data });
  });
 }
 onIncrementqty= (e) =>
 {
e.preventDefault();
    const id = e.target.id;
    const qty = e.target.value;
    console.log(id +"   "+qty);
   for (var i = 0, len = this.state.mylist.length; i < len; i++) {

          if(this.state.mylist[i].product_id==id)
             {
            
              this.state.mylist[i].qty=qty; 
              this.setState({ mylist: this.state.mylist });
              break;
              }
        }
  this.updateAmount();
  const data={"id":id,"qty":qty}
  Axios.post(`http://localhost:4200/updatecart`,data).then(res => {
    if(qty==0)
    this.setState({ mylist: res.data });
  });

 }



  async componentDidMount() {
    const response = await fetch('http://localhost:4200/showcart');
    const json = await response.json();
    this.setState({ mylist: json });
    var myTotal = 0;
        console.log(this.state.mylist);
        for (var i = 0, len = this.state.mylist.length; i < len; i++) {
            myTotal += this.state.mylist[i].product_price * this.state.mylist[i].qty; 
        }
         this.setState({gross:myTotal});
  }

 
 

  buildOptions(e) {
    var arr = [];

    for (let i = 0; i <= 10; i++) {
      if(i==e)
      arr.push(<option key={i} value={i} selected>{i}</option>)
      else
        arr.push(<option key={i} value={i}>{i}</option>)
    }

    return arr; 
}

  render() {
    return (
      <div>
      <h3 align="center"><u> Cart Items</u> </h3>

<Container>
              
<Table striped bordered hover>
<thead>
<th>Image</th> <th>Id </th> <th> Name</th><th> Price </th><th>Quantity</th> 
</thead>
<tbody>
              {this.state.mylist.map((item, index) => {
              console.log(item);
              return (
                <tr key={index}>
                  <td><img src={item.product_image} width="100" height="100" alt="image" /></td>
                     
                  <td>{item.product_id}</td>
                  <td>{item.product_name}</td>
                  <td>{item.product_price}</td>
                    <td>{item.qty}</td>
             
                 <td><select id={item.product_id} onChange={this.onIncrementqty}>
                
                         {this.buildOptions(item.qty)}

                    
                  

                   </select>
                   </td>
                    <td>

                    <input type="button" value="+" onClick={this.Incqty} id={item.product_id} />


                   </td>
                        
                </tr>
              );
            })}
           <tr>
            <td colspan="4">Gross Amount {this.state.gross} </td> </tr>
            <tr>
            <td colspan="4"> <a href="/payment">Payment</a> </td> </tr>

          </tbody>

      

        </Table>

</Container>
      </div>
    );
  }

}

export default View_Cart;
