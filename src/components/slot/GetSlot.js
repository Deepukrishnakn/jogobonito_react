import React, { useEffect, useState, useContext} from 'react';
import { Row,Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from '../Header';
import Navebar from '../Navebar';
import '../slot/Slot.css'
import Card from 'react-bootstrap/Card';
import axios from "../../constants/constants"
import { useParams } from 'react-router-dom';
import '../List.css'
import authContext from '../../context/authContext'
import Pagination from '../../components/Pagination';
import Alert from 'react-bootstrap/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GetSlot() {
  let {authTokens,} = useContext(authContext)
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const successcall = () => toast.success("Payment is succefuly complited!");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

  const {Turf_id} = useParams();
  const [err,setErr]= useState('')

  const [loading,setLoading] = useState(false);
  const [slotPrice,setSlotPrice] = useState('');
  const [slotId,setSlotId] = useState('');
  const [Slot_No,setSlotNo] = useState('');
  const [Slot,setSlot] = useState([])
  const getslot =  async () => {
  const { data } = await axios.get(`vendor/GetSlot/${Turf_id}/`,
  {headers:{Authorization:`Bearer ${authTokens}`}}).then((response)=>{
    if (response.status===200){
      console.log("success")            
      setSlot(response.data) 
    }
   
  }).catch((err)=>{
    console.log(err.response.data.detail,"erorr").finally(()=>setLoading(false))
    setErr(err.data.detail)
      console.log(err.data.detail)
    
  })}
  
  
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));
      bodyData.append("slot", slotId);

      await axios.post('payment/payment/success/',bodyData,{headers:{Authorization:`Bearer ${authTokens}`}})
        .then((res) => {
          successcall()
          console.log("Everything is OK!");
          setName("");
          setAmount("");
          setSlotId("");
          setSlotNo("")
          getslot()
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", slotPrice+20);
    console.log(slotPrice)
    bodyData.append("name", Slot_No);
    bodyData.append("slot", slotId);
    console.log(slotId)

    const data = await axios.post('payment/pay/',bodyData,{headers:{Authorization:`Bearer ${authTokens}`}}).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
      key_secret: process.env.REACT_APP_SECRET_KEY,
      amount: data.data.payment.amount,
      currency: "INR",
      name: "Org. Name",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const paymentHandler=(price,id,Slot_No)=>{
    setSlotPrice(price)
    setSlotId(id)
    setSlotNo(Slot_No)
    showRazorpay()
    console.log(price)
  }


  useEffect(()=>{
    getslot()
  },[])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - indexOfLastPost;
  const currentPost = Slot.slice(indexOfFirstPost, indexOfLastPost);
  // change page 
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <Navebar/>
      <Header/>
      <ToastContainer/>
      {loading && <h4>loading...</h4>}
<h1 className='title mt-5'>Find Your Time</h1>
{Slot.length ==0  ?  <Alert variant='danger' className='m-5'>
Sorry Slot is Not available !!!
        </Alert>:
      <Row>
        {Slot.map((obj)=>
      <Col lg={3}>
<Card  className='m-5'>
      <Card.Img variant="top" src={obj.turf.image} />
      <Card.Body>
        <Card.Title>{obj.turf.turf_name}</Card.Title>
        <Card.Text>
        ₹  {obj.turf.price}
        </Card.Text>
        <Card.Text>
        Date: {obj.Date}
        </Card.Text>
        <Card.Text>
        Time: {obj.Time}
        </Card.Text>
        <Card.Text>
        Slot No.: {obj.Slot_No}
        </Card.Text>
        <Button variant="primary" onClick={()=>paymentHandler(obj.turf.price,obj.id,obj.Slot_No)}>
Book It
</Button>
      </Card.Body>
    </Card>
    </Col>

)}

</Row> }
<Pagination postsPerPage={postsPerPage} 
totalPosts={Slot.length}
paginate={paginate}
/>
    </>
  )
}

export default GetSlot


{/* <Button variant="primary" onClick={handleShow}>
Launch demo modal
</Button>

<Modal show={show} onHide={handleClose} animation={false}>
<Modal.Header closeButton>
  <Modal.Title>Modal heading</Modal.Title>
</Modal.Header>
<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="primary" onClick={handleClose}>
    Save Changes
  </Button>
</Modal.Footer>
</Modal> */}