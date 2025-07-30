import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useParcel } from "../context/ParcelContext";
import { AuthContext } from "../context/AuthContext";

const ParcelBooking = () => {
  const { user } = useContext(AuthContext);
  const { bookParcel } = useParcel();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    recipientName: "",
    recipientPhone: "",
    parcelType: "document",
    weight: "0.5",
    dimensions: "10x10x10",
    paymentMethod: "prepaid",
    codAmount: 0,
    specialInstructions: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pickupAddress) newErrors.pickupAddress = "Required";
    if (!formData.deliveryAddress) newErrors.deliveryAddress = "Required";
    if (!formData.recipientName) newErrors.recipientName = "Required";
    if (!formData.recipientPhone) newErrors.recipientPhone = "Required";
    if (formData.paymentMethod === "cod" && formData.codAmount <= 0) {
      newErrors.codAmount = "Must be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await bookParcel({
        ...formData,
        userId: user.id,
        status: "pending",
      });
      navigate("/my-parcels");
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Book a Parcel Delivery</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup Information */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Pickup Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pickup Address*
              </label>
              <textarea
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.pickupAddress ? "border-red-500" : "border"
                }`}
                rows={3}
              />
              {errors.pickupAddress && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.pickupAddress}
                </p>
              )}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Delivery Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Delivery Address*
              </label>
              <textarea
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.deliveryAddress ? "border-red-500" : "border"
                }`}
                rows={3}
              />
              {errors.deliveryAddress && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.deliveryAddress}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipient Name*
              </label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.recipientName ? "border-red-500" : "border"
                }`}
              />
              {errors.recipientName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.recipientName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipient Phone*
              </label>
              <input
                type="tel"
                name="recipientPhone"
                value={formData.recipientPhone}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.recipientPhone ? "border-red-500" : "border"
                }`}
              />
              {errors.recipientPhone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.recipientPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Parcel Details */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Parcel Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Parcel Type
              </label>
              <select
                name="parcelType"
                value={formData.parcelType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="document">Document</option>
                <option value="package">Package</option>
                <option value="fragile">Fragile Item</option>
                <option value="perishable">Perishable Goods</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <select
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="0.5">0-0.5 kg</option>
                <option value="1">0.5-1 kg</option>
                <option value="3">1-3 kg</option>
                <option value="5">3-5 kg</option>
                <option value="10">5-10 kg</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dimensions (cm)
              </label>
              <select
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="10x10x10">Small (10x10x10)</option>
                <option value="20x20x20">Medium (20x20x20)</option>
                <option value="30x30x30">Large (30x30x30)</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Payment Method</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="prepaid"
                name="paymentMethod"
                type="radio"
                value="prepaid"
                checked={formData.paymentMethod === "prepaid"}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="prepaid"
                className="ml-2 block text-sm text-gray-700"
              >
                Prepaid
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="cod"
                name="paymentMethod"
                type="radio"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="cod" className="ml-2 block text-sm text-gray-700">
                Cash on Delivery (COD)
              </label>
            </div>

            {formData.paymentMethod === "cod" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  COD Amount (₹)
                </label>
                <input
                  type="number"
                  name="codAmount"
                  value={formData.codAmount}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    errors.codAmount ? "border-red-500" : "border"
                  }`}
                />
                {errors.codAmount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.codAmount}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Instructions
          </label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            rows={2}
            placeholder="Any special handling instructions..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Booking..." : "Book Parcel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParcelBooking;
