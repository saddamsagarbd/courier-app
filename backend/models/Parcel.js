import mongoose from 'mongoose';

const parcelSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pickupAddress: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  parcelSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true
  },
  parcelType: {
    type: String,
    enum: ['document', 'box', 'fragile', 'other'],
    required: true
  },
  paymentType: {
    type: String,
    enum: ['cod', 'prepaid'],
    required: true
  },
  codAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'Picked Up', 'In Transit', 'Delivered', 'Failed'],
    default: 'Pending'
  },
  currentLocation: {
    lat: Number,
    lng: Number
  },
}, { timestamps: true });

export default mongoose.model('Parcel', parcelSchema);
