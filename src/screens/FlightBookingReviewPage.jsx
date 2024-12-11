import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FlightBookingReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    adults,
    children,
    infants,
    hasGST,
    gstNumber,
    mobileNumber,
    email,
    selectedSSRItems,
    totalSSRAmount,
    finalData,
  } = location.state || {}; // Pass data through navigation state

  const handleConfirmBooking = () => {
    // Perform final validation
    if (!mobileNumber || !email) {
      toast.error("Please complete your contact details.");
      return;
    }
    toast.success("Booking confirmed!");
    navigate("/confirmation"); // Navigate to a confirmation page
  };

  return (
    <div className="booking-review-page">
      <h2>Booking Review</h2>

      <section>
        <h3>Passengers</h3>
        <div>
          <strong>Adults:</strong> {adults.length}
          {adults.map((adult, index) => (
            <p key={index}>{`${adult.firstName} ${adult.lastName} (${adult.gender})`}</p>
          ))}
        </div>
        <div>
          <strong>Children:</strong> {children.length}
          {children.map((child, index) => (
            <p key={index}>{`${child.firstName} ${child.lastName} (${child.gender})`}</p>
          ))}
        </div>
        <div>
          <strong>Infants:</strong> {infants.length}
          {infants.map((infant, index) => (
            <p key={index}>{`${infant.firstName} ${infant.lastName} (${infant.gender})`}</p>
          ))}
        </div>
      </section>

      <section>
        <h3>Contact Details</h3>
        <p><strong>Mobile:</strong> {mobileNumber}</p>
        <p><strong>Email:</strong> {email}</p>
      </section>

      <section>
        <h3>Special Services</h3>
        {selectedSSRItems.length > 0 ? (
          <ul>
            {selectedSSRItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No special services selected.</p>
        )}
        <p><strong>Total SSR Amount:</strong> ₹{totalSSRAmount}</p>
      </section>


      <section>
        <h3>Payment Details</h3>
        <p><strong>Net Fare:</strong> ₹{finalData.NetFare}</p>
      </section>

      <button onClick={handleConfirmBooking} className="confirm-btn">
        Confirm Booking
      </button>
    </div>
  );
};

export default FlightBookingReviewPage;
