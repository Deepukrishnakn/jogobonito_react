import "./components/app.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, UNSAFE_RouteContext } from 'react-router-dom'  
import { AuthProvider } from './context/authContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyPage from './pages/VerifyPage';
import ForgotpassPage from './pages/ForgotpassPage';
import HomePage from './pages/HomePage';
import ThomePage from './pages/ThomePage';
import Turf from "./components/Turf";
import BisunessPage from "./pages/BisunessPage";
import VendorLoginPage from "./pages/VendorLoginPage"
import AddTurf from "./components/AddTurf";
import Singleturfpage from './pages/Singleturfpage';
import TurfByCategory from "./components/TurfByCategory";
import SlotPage from "./pages/SlotPage";
// import Payment from "./components/Payment";
import VhomePage from "./pages/VhomePage";
import AddSlot from "./components/Vendor/AddSlot";
import VturfTable from "./components/Vendor/VturfTable";
import GetAllSlots from "./components/slot/GetAllSlots";
import UpdateTurf from "./components/Vendor/UpdateTurf";
import UpdateSlot from "./components/Vendor/UpdateSlot";
import VendorProfile from "./components/Vendor/VendorProfile";
import UpdateCategory from "./components/Mastar/UpdateCategory";
import Searchturf from "./components/Searchturf";
import Payment from "./components/Payment";
import BookedSlots from "./components/Vendor/BookedSlots";
import UserProfilePage from "./pages/UserProfilePage";
import UserBookedSlots from "./components/UserBookedSlots";
import VendorManage from "./components/Mastar/VendorManage";
import AllVendors from "./components/Mastar/AllVendors";
import AllUsers from "./components/Mastar/AllUsers";
import SlotbookedDetails from "./components/Mastar/SlotbookedDetails";
import VendorOrderDetails from "./components/Mastar/VendorOrderDetails";
import MastarHome from "./components/Mastar/MastarHome";
import SlotbookingChart from "./components/Mastar/SlotbookingChart";
import VendorprivetRouts from "./Utils/VendorprivetRouts";
import OnlyAdminPrivetRoutes from "./Utils/OnlyAdminPrivetRoutes";
import PrivetRouts from "./Utils/PrivetRouts";

function App(){
  return (
    <div>

     <BrowserRouter>
     <AuthProvider>
      <Routes>
      <Route path='/Register' element ={<RegisterPage/>} />
      <Route path='/Login' element ={<LoginPage/>} />
      <Route path='/Nave' element ={<HomePage/>} />
      <Route path='/Verify' element ={<VerifyPage/>} />
      <Route path='/ForgotPassword' element ={<ForgotpassPage/>} />
      <Route path='/Bisuness' element ={<BisunessPage/>} />
      <Route path='/VendorLogin' element ={<VendorLoginPage/>} />


      <Route path='/singleturf/:cate_slug/:turf_slug' element ={<Singleturfpage/>} />
      <Route path='/TurfByCategory/:slug' element ={<TurfByCategory/>} />
      <Route path='/UserBookedSlot/' element ={<UserBookedSlots/>} />


      <Route path='/' element ={<ThomePage/>} />
      <Route path='/Turf' element ={<Turf/>} />
      <Route path='/Search/:key' element ={<Searchturf/>} />

{/* user */}
      <Route element={<PrivetRouts/>}>
            <Route path='/getslot/:Turf_id' element ={<SlotPage/>} />
            <Route path="/userprofile" element = {<UserProfilePage/>} />
       </Route>

      {/* vendpr */}
      <Route element ={<VendorprivetRouts/>}> 
            <Route path='/getallslot/:Turf_id' element ={<GetAllSlots/>} />
            <Route path='/addturf' element ={<AddTurf/>} />
            <Route path='/vhome' element ={<VhomePage/>} />
            <Route path='/addslot' element ={<AddSlot/>} />
            <Route path='/turftable' element ={<VturfTable/>} />
            <Route path='/updateturf/:id' element ={<UpdateTurf/>} />
            <Route path='/updateslot/:id' element ={<UpdateSlot/>}/>
            <Route path="/vendorprofile" element ={<VendorProfile/>}/>
            <Route path="/allcategory/" element ={<UpdateCategory/>}/>
            <Route path='/payment' element ={<Payment/>} />
            <Route path='/bookedslot' element ={<BookedSlots/>} />
      </Route>

      {/* Mastar */}
      <Route element ={<OnlyAdminPrivetRoutes/>}>
            <Route path="/paidvendor" element={<VendorManage/>}/>
            <Route path="/allvendormanage" element={<AllVendors/>}/>
            <Route path="/allusers" element={<AllUsers/>}/>
            <Route path="/userorders" element={<SlotbookedDetails/>}/>
            <Route path='/vendororder' element ={<VendorOrderDetails/>} />
            <Route path='/mhome' element ={<MastarHome/>} />
            <Route path="/slotbookingchart" element={<SlotbookingChart/>}/>
      </Route>
    </Routes>
    </AuthProvider>
  </BrowserRouter>
    </div>
  );
}

export default App;
