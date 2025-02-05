import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const getBookings = (req, res) => {
  Booking.find({ userID: res.locals.user._id })
    .lean()
    .sort({ bookingDate: "desc", session: "asc" })
    //todo : fix time order
    .then((bookings) => {
      // console.log(bookings);
      console.log(">>>>>>>>> bookingDate formatting <<<<<<<<<");
      function dateFormat(value) {
        const weekday = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        if (!value) return value;
        let date = new Date(value),
          y = date.getFullYear(),
          m = date.getMonth() + 1,
          d = date.getDate(),
          w = weekday[date.getDay()],
          bookDate = y + "/" + m + "/" + d + " (" + w + ")";
        return bookDate;
      }
      bookings.forEach(function f(booking) {
        booking.bookingDate = dateFormat(booking.bookingDate);
      });
      res.locals.bookings = bookings;
      res.render("bookings/bookingsIndex", { bookings: bookings });
    });
};

export const getAddBookings = (req, res) => {
  res.render("bookings/add");
};

export const postAddBookings = (req, res) => {
  let errors = [];
  let today = new Date(),
    dateChecking = new Date(req.body.bookingDate);
  if (!req.body.bookingDate) {
    errors.push({ text: "Please select a date" });
  }
  if (!req.body.email) {
    errors.push({ text: "Please enter email" });
  } //todo : fix correct msg
  if (dateChecking < today) {
    errors.push({ text: "An error in booking Date and Time. Please review." });
  }
  if (errors.length > 0) {
    res.render("bookings/add", {
      errors: errors,
      bookingDate: req.body.bookingDate,
      session: req.body.session,
      facilities: req.body.facilities,
      courseID: req.body.courseID,
      email: req.body.email,
      phone: req.body.phone,
    });
  } else {
    const newBooking = {
      bookingDate: req.body.bookingDate,
      session: req.body.session,
      facilities: req.body.facilities,
      courseID: req.body.courseID,
      email: req.body.email,
      phone: req.body.phone,
      userID: res.locals.user._id,
    };
    console.log(">>>>>>>>> courseID formatting <<<<<<<<<");
    // function courseFormat(courseID) {
    //   if (!courseID) return courseID;
    //   let s = "01";
    //   s = courseID + s;
    //   return s;
    // }
    // newBooking.courseID = courseFormat(newBooking.courseID);

    new Booking(newBooking).save().then(() => {
      req.flash("success_msg", "Booking Added!");
      res.redirect("/bookings");
    });
  }
};

export const deleteBookings = (req, res) => {
  Booking.deleteOne({ _id: req.params.id }).then(() => {
    req.flash("error_msg", "Booking Deleted!");
    res.redirect("/bookings");
  });
};

export const getEditBookings = (req, res) => {
  Booking.findOne({ _id: req.params.id })
    .lean()
    .then((booking) => {
      //! define variable name "ideas" => booking
      res.render("bookings/edit", { booking: booking });
    });
};
export const putEditBookings = (req, res) => {
  Booking.findOne({
    _id: req.params.id,
  }).then((booking) => {
    let edit_error_msg = "";
    if (!req.body.bookingDate) {
      edit_error_msg += "Please select a date";
    }
    if (!req.body.session) {
      edit_error_msg += "Please select the times";
    }
    if (!req.body.facilities) {
      edit_error_msg += "Please select the rooms";
    }
    if (edit_error_msg) {
      req.flash("error_msg", edit_error_msg);
      console.log(res.locals);
      //? check the "locals" global or not
      res.redirect("/bookgins/edit/" + booking._id);
      //? if error return previous page
    } else {
      booking.bookingDate = req.body.bookingDate;
      booking.session = req.body.session;
      booking.facilities = req.body.facilities;
      booking.courseID = req.body.courseID;
      booking.email = req.body.email; //! body => locals.user
      booking.phone = req.body.phone; //! body => locals.user
      booking.save().then(() => {
        req.flash("success_msg", "Note Upated!");
        res.redirect("/bookings");
      });
    }
  });
};
