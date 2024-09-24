import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import NotFound from "./img/nofound.png";
import "jspdf-autotable"; // Import the autoTable plugin

const URL = "http://localhost:8081/paymentFunction";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function AllPaymentDetails() {
  const [paymentFunction, setPaymentFunction] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setPaymentFunction(data.paymentFunction));
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.paymentFunction.filter((paymentFunction) =>
        Object.values(paymentFunction).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setPaymentFunction(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Payment Details", 14, 16);
    doc.autoTable({
      head: [
        [
          "Payment ID",
          "Payment Method",
          "Card Name",
          "Card Number",
          "Card Holder Name",
          "Expiration Date",
          "CVV",
          "Full Name",
          "Address",
          "Contact No",
          "Amount",
          "Email",
        ],
      ],
      body: paymentFunction.map((item) => [
        item.paymentID,
        item.paymentMethod,
        item.cardname,
        item.cardnumber,
        item.cardholdername,
        item.expdate,
        item.cvv,
        item.fullname,
        item.address,
        item.contactNo,
        item.amount,
        item.email,
      ]),
      startY: 22,
    });
    doc.save("payment_details.pdf");
  };

  return (
    <div>
      <div className="main_payment_staf">
        <h1 className="topic_admin_payment">Payment Details</h1>
        <div>
          <div className="action_set_staf">
            <tr>
              <td className="">
                <input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  name="search"
                  className="search_input"
                  placeholder="Search Here..."
                />
              </td>
              <td>
                <button onClick={handleSearch} className="search_btn">
                  Search
                </button>
              </td>
            </tr>
            <button onClick={generatePDF} className="denttl_btnn">
              Generate PDF
            </button>
          </div>
          <br /> <br />
          {noResults ? (
            <div className="not_found_box">
              <img src={NotFound} alt="noimg" className="notfound" />
              <p className="nodata_pera">No Details Found</p>
            </div>
          ) : (
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
                  </tr>
                </thead>
                <tbody>
                  {paymentFunction
                    .filter((item) => item.paymentID)
                    .map((item, index) => (
                      <tr className="" key={index}>
                        <td className="payment_table_td">{item.paymentID}</td>
                        <td className="payment_table_td">
                          {item.paymentMethod}
                        </td>{" "}
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
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllPaymentDetails;
