import { useState } from "react";
import axios from "axios";
import NotFound from "./img/nofound.png";
import HomeNav from "../Home/HomeNav";

const URL = "http://localhost:8081/paymentFunction"; // Your backend API

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function MyPayment() {
  const [email, setEmail] = useState(""); // Track user input
  const [paymentFunction, setPaymentFunction] = useState([]);
  const [message, setMessage] = useState(""); // For error/success messages

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle validation and display relevant payment details
  const handleViewPayments = () => {
    if (email === "") {
      setMessage("Please enter an email.");
      return;
    }

    fetchHandler()
      .then((data) => {
        // Filter payment data based on entered email
        const filteredData = data.paymentFunction.filter(
          (payment) => payment.email === email
        );

        if (filteredData.length > 0) {
          setPaymentFunction(filteredData); // Set filtered data
          setMessage(""); // Clear any previous messages
        } else {
          setPaymentFunction([]); // Clear table if no data found
          setMessage("No payment records found for this email.");
        }
      })
      .catch((error) => {
        setMessage("Error fetching data. Please try again.");
        console.error(error);
      });
  };

  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to Cancel This Payment?"
    );
    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`);
        window.alert("Payment canceled successfully!");
        window.location.reload(); // Reload to refresh displayed data
      } catch (error) {
        console.error("Error deleting payment details:", error);
      }
    }
  };

  return (
    <div>
      <HomeNav />
      <div className="check_gmail_box_payment">
        <div className="payment_gmail_box">
          <label className="form_label_email" htmlFor="email">
            Enter Your Email to View Payments:
          </label>
          <br />
          <input
            type="email"
            id="email"
            className="gmail_insert"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <button onClick={handleViewPayments} className="submit_btn_gmail">
            Validate
          </button>
          <br />
          {message && (
            <div className="not_found_box">
              <img src={NotFound} alt="noimg" className="notfound" />
              <p className="nodata_pera">{message}</p>
            </div>
          )}
        </div>
      </div>
      <div className="main_payment_staf">
        {/* Display table only if payment data is available */}
        {paymentFunction.length > 0 && (
          <div>
            <h2 className="topic_admin_payment">My Payments</h2>
            <div className="table_container">
              <table className="payment_table">
                <thead>
                  <tr className="admin_tbl_tr">
                    <th className="payment_table_th">Payment ID</th>
                    <th className="payment_table_th">Payment Method</th>
                    <th className="payment_table_th">Full Name</th>
                    <th className="payment_table_th">Address</th>
                    <th className="payment_table_th">Contact No</th>
                    <th className="payment_table_th">Amount</th>
                    <th className="payment_table_th">Email</th>
                    <th className="payment_table_th">Card Name</th>
                    <th className="payment_table_th">Card Number</th>
                    <th className="payment_table_th">Card Holder Name</th>
                    <th className="payment_table_th">Expiration Date</th>
                    <th className="payment_table_th">CVV</th>
                    <th className="payment_table_th">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentFunction
                    .filter(
                      (item) =>
                        item.paymentID &&
                        item.paymentMethod &&
                        item.fullname &&
                        item.address &&
                        item.contactNo &&
                        item.amount
                    )
                    .map((item, index) => (
                      <tr key={index}>
                        <td className="payment_table_td">{item.paymentID}</td>
                        <td className="payment_table_td">
                          {item.paymentMethod}
                        </td>
                        <td className="payment_table_td">{item.fullname}</td>
                        <td className="payment_table_td">{item.address}</td>
                        <td className="payment_table_td">{item.contactNo}</td>
                        <td className="payment_table_td">{item.amount}</td>
                        <td className="payment_table_td">{item.email}</td>
                        <td className="payment_table_td">
                          {item.cardname || "💸"}
                        </td>
                        <td className="payment_table_td">
                          {item.cardnumber || "💸"}
                        </td>
                        <td className="payment_table_td">
                          {item.cardholdername || "💸"}
                        </td>
                        <td className="payment_table_td">
                          {item.expdate || "💸"}
                        </td>
                        <td className="payment_table_td">{item.cvv || "💸"}</td>
                        <td className="payment_table_td">
                          <button
                            onClick={() => deleteHandler(item._id)}
                            className="payment_deletbtn2"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPayment;
