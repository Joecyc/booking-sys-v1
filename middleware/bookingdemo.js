//* middleware *//
const getBookings = (req, res) => {
  Booking.find({ userID: res.locals.user._id })
    .lean()
    .sort({ date: "desc" })
    .then((bookings) => {
      //! define variable name "ideas" => bookingsapp
      console.log(ideas);
      res.locals.bookings = bookings;
      res.render("bookings/bookingsIndex");
    });
};

const getAddBookings = (req, res) => {
  res.render("bookings/add");
};

const postAddBookings = (req, res) => {
  let errors = []; //* if no variable => array
  if (!req.body.bookingDate) {
    errors.push({ text: "Please select a date" });
  }
  if (!req.body.session) {
    errors.push({ text: "Please select the times" });
  }
  if (!req.body.facilities) {
    errors.push({ text: "Please select the rooms" });
  }
  if (!req.body) {
    errors.push({ text: "An error in booking Date and Time. Please review." });
  } //! for chosing the day before

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
      email: req.body.email, //! body => locals.user
      phone: req.body.phone, //! body => locals.user
      userID: res.locals.user._id,
      //? passportConfig - user._id -> find the id and bring back for respond client, break though all the page code
    };
    //* available for edited more databese
    new Booking(newBooking).save().then(() => {
      req.flash("success_msg", "Booking Added!");
      res.redirect("/bookings");
    });
  }
};

const deleteBookings = (req, res) => {
  Booking.deleteOne({ _id: req.params.id }).then(() => {
    req.flash("error_msg", "Booking Deleted!");
    res.redirect("/bookings");
  });
};

const getEditBookings = (req, res) => {
  Booking.findOne({ _id: req.params.id })
    .lean()
    .then((booking) => {
      //! define variable name "ideas" => booking
      res.render("bookings/edit", { booking: booking });
    });
};
const putEditBookings = (req, res) => {
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
//* middleware *//
