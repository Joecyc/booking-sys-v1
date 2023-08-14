import express from "express";

import {
  getBookings,
  getAddBookings,
  postAddBookings,
  deleteBookings,
  getEditBookings,
  putEditBookings,
} from "../controllers/bookingsController.js";

// import ensureAuthenticated from "../../helpers/auth.js";

const router = express.Router();

router.route("/").get(getBookings);
router.route("/add").get(getAddBookings).post(postAddBookings);
router.route("/:id").delete(deleteBookings);
router.route("/edit/:id").get(getEditBookings).put(putEditBookings);

export default router;
