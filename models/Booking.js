import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new Schema({
  // todo : add time field
  bookingDate: {
    type: String,
    required: true,
  },
  session: {
    type: [String],
    required: false,
  }, // timeSlot
  facilities: {
    type: [String],
    required: false,
  }, // Rooms
  courseID: {
    type: [String],
    required: true,
    // unique: true,
  }, //todo : *** add int ***
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
    /* required : true,  */
  }, // todo : studedntID & teacherID
  date: {
    type: Date,
    default: Date.now,
  },
  confNo: {
    type: String,
    required: false,
  }, // todo : for QR code and user confirmation
  others: {
    type: String,
    required: false,
  }, // todo : for clients others booking
  remarks: {
    type: String,
    required: false,
  },
});

const Booking = mongoose.model("Bookings", BookingSchema);
export default Booking;
