import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import HomeNav from "../Home/HomeNav";

function PaymentSummary() {
  const [paymentData, setPaymentData] = useState({});

  // Retrieve data from localStorage on component mount
  useEffect(() => {
    const savedPaymentData = JSON.parse(localStorage.getItem("paymentDetails"));
    if (savedPaymentData) {
      setPaymentData(savedPaymentData);
    }
  }, []);

  const downloadSummary = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.setTextColor(40); // Dark color for title
    doc.text("Payment Summary", 10, 20);

    // Payment Method Section
    doc.setDrawColor(0, 123, 255); // Blue color for borders
    doc.setFillColor(0, 123, 255, 0.1); // Light blue fill
    doc.rect(10, 30, 190, 10, "F"); // Fill rectangle
    doc.setFontSize(16);
    doc.setTextColor(0); // Reset text color to black
    doc.text("Payment Method", 12, 36);

    doc.setFontSize(12);
    doc.setTextColor(0); // Reset text color to black
    doc.text(`Payment Method: ${paymentData.paymentMethod}`, 10, 45);
    doc.text(`Payment ID: ${paymentData.paymentID}`, 10, 50);

    // Payment Details Section
    doc.setDrawColor(0, 255, 0); // Green color for borders
    doc.setFillColor(0, 255, 0, 0.1); // Light green fill
    doc.rect(10, 60, 190, 10, "F"); // Fill rectangle
    doc.setFontSize(16);
    doc.setTextColor(0); // Reset text color to black
    doc.text("Payment Details", 12, 66);

    doc.setFontSize(12);
    doc.setTextColor(0); // Reset text color to black
    if (paymentData.paymentMethod === "cash") {
      doc.text(`Full Name: ${paymentData.fullname}`, 10, 75);
      doc.text(`Address: ${paymentData.address}`, 10, 80);
      doc.text(`Contact No: ${paymentData.contactNo}`, 10, 85);
      doc.text(`Email: ${paymentData.email}`, 10, 90);
    } else {
      doc.text(`Card Name: ${paymentData.cardname}`, 10, 75);
      doc.text(`Card Number: ${paymentData.cardnumber}`, 10, 80);
      doc.text(`Cardholder Name: ${paymentData.cardholdername}`, 10, 85);
      doc.text(`Expiration Date: ${paymentData.expdate}`, 10, 90);
      doc.text(`CVV: ${paymentData.cvv}`, 10, 95);
      doc.text(`Full Name: ${paymentData.fullname}`, 10, 100);
      doc.text(`Address: ${paymentData.address}`, 10, 105);
      doc.text(`Contact No: ${paymentData.contactNo}`, 10, 110);
      doc.text(`Email: ${paymentData.email}`, 10, 115);
    }

    // Save the PDF with a filename
    doc.save("payment-summary.pdf");
  };

  return (
    <div className="paymnt_background">
      <HomeNav />
      <div className="form_full_payment">
        <div className="payment_from_full">
          <h1 className="form_head_payment">Payment Summary</h1>
          {paymentData && (
            <div>
              {paymentData.paymentMethod === "cash" ? (
                <>
                  <p className="invoce_data">
                    <b>Payment Method: </b>
                    {paymentData.paymentMethod}
                  </p>
                  <p className="invoce_data">
                    <b>Payment ID: </b>
                    {paymentData.paymentID}
                  </p>
                  <p className="invoce_data">
                    <b>Full Name: </b>
                    {paymentData.fullname}
                  </p>
                  <p className="invoce_data">
                    <b>Address: </b>
                    {paymentData.address}
                  </p>
                  <p className="invoce_data">
                    <b>Contact No: </b>
                    {paymentData.contactNo}
                  </p>
                  <p className="invoce_data">
                    <b>Email: </b>
                    {paymentData.email}
                  </p>
                </>
              ) : (
                <>
                  <p className="invoce_data">
                    <b>Payment Method: </b>
                    {paymentData.paymentMethod}
                  </p>
                  <p className="invoce_data">
                    <b>Payment ID: </b>
                    {paymentData.paymentID}
                  </p>
                  <p className="invoce_data">
                    <b>Card Name: </b>
                    {paymentData.cardname}
                  </p>
                  <p className="invoce_data">
                    <b>Card Number: </b>
                    {paymentData.cardnumber}
                  </p>
                  <p className="invoce_data">
                    <b>Cardholder Name:</b> {paymentData.cardholdername}
                  </p>
                  <p className="invoce_data">
                    <b>Expiration Date: </b>
                    {paymentData.expdate}
                  </p>
                  <p className="invoce_data">
                    <b>CVV: </b>
                    {paymentData.cvv}
                  </p>
                  <p className="invoce_data">
                    <b>Full Name:</b> {paymentData.fullname}
                  </p>
                  <p className="invoce_data">
                    <b>Address:</b> {paymentData.address}
                  </p>
                  <p className="invoce_data">
                    <b>Contact No: </b>
                    {paymentData.contactNo}
                  </p>
                  <p className="invoce_data">
                    <b>Email:</b> {paymentData.email}
                  </p>
                </>
              )}
            </div>
          )}
          <div className="invoice_action">
            <button className="dwon_btn" onClick={downloadSummary}>
              Download
            </button>
            <button
              className="dwon_btn"
              onClick={() => (window.location.href = "/myPayment")}
            >
              My Payment Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;
