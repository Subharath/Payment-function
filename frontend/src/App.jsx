import React from "react";
import { Route, Routes } from "react-router";
import AddPayment from "./Components/PaymentFunction/User/AddPayment";
import PaymentSummary from "./Components/PaymentFunction/User/PaymentSummary";
import MyPayment from "./Components/PaymentFunction/User/MyPayment";
import AllPaymentDetails from "./Components/PaymentFunction/Staff/AllPaymentDetails";
import MyCard from "./Components/PaymentFunction/User/MyCard";
import AddCard from "./Components/PaymentFunction/User/AddCard";
import UpdateCard from "./Components/PaymentFunction/User/UpdateCard";
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*User */}
          <Route path="/" element={<AddPayment />} />
          <Route path="/paymentSummry" element={<PaymentSummary />} />
          <Route path="/myPayment" element={<MyPayment />} />
          <Route path="/addCard" element={<AddCard />} />
          <Route path="/myCard" element={<MyCard />} />
          <Route path="/updateCard/:id" element={<UpdateCard />} />
          {/*Staff */}
          <Route path="/allPayment" element={<AllPaymentDetails />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
