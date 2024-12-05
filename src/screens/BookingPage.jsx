import React, { useState } from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const BookingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        state: "",
        zip: "",
        specialRequests: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardName: ""
    });
    const [errors, setErrors] = useState({});

    const handleNext = () => {
        if (currentStep < 2) {
            const validationErrors = validateStep(currentStep);
            if (Object.keys(validationErrors).length === 0) {
                setCurrentStep(currentStep + 1);
            } else {
                setErrors(validationErrors);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear error when the field changes
    };

    const validateStep = (step) => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.fullName) newErrors.fullName = "Full Name is required";
            if (!formData.email) newErrors.email = "Email is required";
            if (!formData.phone) newErrors.phone = "Phone Number is required";
            if (!formData.address1) newErrors.address1 = "Address line 1 is required";
            if (!formData.state) newErrors.state = "State/Province/Region is required";
            if (!formData.zip) newErrors.zip = "ZIP/Postal code is required";
        }
        if (step === 2) {
            if (!formData.cardNumber) newErrors.cardNumber = "Card Number is required";
            if (!formData.expiryDate) newErrors.expiryDate = "Expiry Date is required";
            if (!formData.cvv) newErrors.cvv = "CVV is required";
            if (!formData.cardName) newErrors.cardName = "Name on Card is required";
        }
        return newErrors;
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Step Indicator */}
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <div className={`flex items-center space-x-2 ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center">
                            {currentStep > 1 ? <FaCheckCircle /> : "1"}
                        </div>
                        <span className="font-medium">Fill Details</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${currentStep === 2 ? "text-blue-600" : "text-gray-400"}`}>
                        <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center">
                            {currentStep === 2 ? <FaCheckCircle /> : "2"}
                        </div>
                        <span className="font-medium">Payment Details</span>
                    </div>
                </div>

                {/* Blue Banner */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-blue-600">
                        Sign in to book with your saved details or register to manage your bookings on the go!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Booking Details Section */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md lg:col-span-1">
                        <h2 className="text-xl font-medium mb-4">Your booking details</h2>
                        <div className="flex items-center mb-4">
                            <img
                                src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Hotel image"
                                className="w-24 h-24 rounded-lg mr-4"
                            />
                            <div>
                                <h3 className="font-medium">Great Northern Hotel, a Tribute Portfolio Hotel, London</h3>
                                <p className="text-gray-500">Westminster Borough, London</p>
                                <div className="flex items-center space-x-1">
                                    <span className="text-blue-600 font-medium">4.8</span>
                                    <span className="text-gray-500">Exceptional · 3,014 reviews</span>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-b py-4 mb-4">
                            <div className="flex justify-between mb-2">
                                <span>Check-in</span>
                                <span>Thu 21 Apr 2022</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Check-out</span>
                                <span>Sat 30 Apr 2022</span>
                            </div>
                            <div className="flex justify-between">
                                <span>15:00 – 23:00</span>
                                <span>01:00 – 11:00</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p>
                                Total length of stay: <span className="font-medium">9 nights</span>
                            </p>
                            <a href="#" className="text-blue-600">
                                Travelling on different dates?
                            </a>
                        </div>
                        <div>
                            <p>You selected:</p>
                            <p className="font-medium">Superior Double Studio</p>
                            <p>1 room, 4 adult</p>
                            <a href="#" className="text-blue-600">
                                Change your selection
                            </a>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        {currentStep === 1 && (
                            <>
                                <h2 className="text-xl font-medium mb-4">Let us know who you are</h2>
                                <form className="space-y-4">
                                    {/* Personal Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                placeholder="Full Name"
                                                className="border border-gray-300 p-2 rounded-lg w-full"
                                                onChange={handleInputChange}
                                            />
                                            {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                placeholder="Email"
                                                className="border border-gray-300 p-2 rounded-lg w-full"
                                                onChange={handleInputChange}
                                            />
                                            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                placeholder="Phone Number"
                                                className="border border-gray-300 p-2 rounded-lg w-full"
                                                onChange={handleInputChange}
                                            />
                                            {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        name="address1"
                                        value={formData.address1}
                                        placeholder="Address line 1"
                                        className="border border-gray-300 p-2 rounded-lg w-full"
                                        onChange={handleInputChange}
                                    />
                                    {errors.address1 && <p className="text-red-600 text-sm">{errors.address1}</p>}
                                    <input
                                        type="text"
                                        name="address2"
                                        value={formData.address2}
                                        placeholder="Address line 2"
                                        className="border border-gray-300 p-2 rounded-lg w-full"
                                        onChange={handleInputChange}
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                placeholder="State/Province/Region"
                                                className="border border-gray-300 p-2 rounded-lg w-full"
                                                onChange={handleInputChange}
                                            />
                                            {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="zip"
                                                value={formData.zip}
                                                placeholder="ZIP/Postal code"
                                                className="border border-gray-300 p-2 rounded-lg w-full"
                                                onChange={handleInputChange}
                                            />
                                            {errors.zip && <p className="text-red-600 text-sm">{errors.zip}</p>}
                                        </div>
                                    </div>
                                    <textarea
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        placeholder="Special Requests"
                                        className="border border-gray-300 p-2 rounded-lg w-full"
                                        onChange={handleInputChange}
                                    />
                                </form>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <h2 className="text-xl font-medium mb-4">Payment Information</h2>
                                <form className="space-y-4">
                                    {/* Payment Details */}
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        placeholder="Card Number"
                                        className="border border-gray-300 p-2 rounded-lg w-full"
                                        onChange={handleInputChange}
                                    />
                                    {errors.cardNumber && <p className="text-red-600 text-sm">{errors.cardNumber}</p>}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                placeholder="Expiry Date (MM/YY)"
                                                className="border border-gray-300 p-2 rounded-lg w-full"
                                                onChange={handleInputChange}
                                            />
                                            {errors.expiryDate && <p className="text-red-600 text-sm">{errors.expiryDate}</p>}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                placeholder="CVV"
                                                className="border border-gray-300 p-2 rounded-lg w-full"
                                                onChange={handleInputChange}
                                            />
                                            {errors.cvv && <p className="text-red-600 text-sm">{errors.cvv}</p>}
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        placeholder="Name on Card"
                                        className="border border-gray-300 p-2 rounded-lg w-full"
                                        onChange={handleInputChange}
                                    />
                                    {errors.cardName && <p className="text-red-600 text-sm">{errors.cardName}</p>}
                                </form>
                            </>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-gray-300 text-white py-2 px-4 rounded-md"
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                            >
                                Back
                            </button>
                            <button
                                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                                onClick={handleNext}
                            >
                                {currentStep === 1 ? "Next" : "Confirm Booking"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
