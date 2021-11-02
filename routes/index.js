let express = require("express");
let router = express.Router();
const myDB = require("../db/airbnbSQLiteDB.js");



/* ---------Districts related functions starts from here -----------------*/
/* GET home page. */
router.get("/", async function (req, res) {
  console.log("Got request for /");

  const district = await myDB.getDistricts();

  console.log("got districts", district);

  // render the _index_ template with the districts attrib as the list of districts
  res.render("index", { districts: district});
});





/* GET districts details. */
router.get("/district/:districtId", async function (req, res) {
  console.log("Got districts details");

  const districtId = req.params.districtId;

  console.log("got districts ", districtId);

  const district = await myDB.getdistrictByID(districtId);

  console.log("got district by id");

  res.render("DistrictDetails", {district: district});
});

/* POST create districts. */
router.post("/district/create", async function (req, res) {
  console.log("Got post create/district");

  const district = req.body;

  console.log("got create district", district);

  await myDB.createDistrict(district);

  console.log("districts created");

  res.redirect("/");
});

/* POST delete districts. */
router.post("/district/delete", async function (req, res) {
  console.log("Got post delete district");

  const district = req.body;

  console.log("got delete district", district);

  await myDB.deleteDistrict(district);

  console.log("district deleted");

  res.redirect("/");
});


/* POST update districts. */
router.post("/district/:districtId", async function (req, res) {
  console.log("Got post update district");

  const district = req.body;

  console.log("got update district", district);

  await myDB.updateDistrict(district);

  console.log("district updated");

  res.redirect("/");
});




/* ---------Reviews related functions starts from here -----------------*/
router.get("/review", async function (req, res) {
  console.log("Got request for /");

  const reviews = await myDB.getReviews();

  // console.log("got reviews", reviews);

  // render the _index_ template with the reviews attrib as the list of reviews
  res.render("index-reviews", { reviews: reviews});
});



/* GET review details. */
router.get("/review/:reviewID", async function (req, res) {
  console.log("Got review details");

  const reviewID = req.params.reviewID;

  console.log("got reviewID ", reviewID);

  const review = await myDB.getReviewByID(reviewID);

  console.log("got review by id");

  res.render("ReviewDetails", {review: review});
});



/* POST create reviews. */
router.post("/review/create", async function (req, res) {
  console.log("Got post create/review");

  const review = req.body;

  console.log("got create review", review);

  await myDB.createReview(review);

  console.log("reviews created");

  res.redirect("/review");
});

/* POST delete reviews. */
router.post("/review/delete", async function (req, res) {
  console.log("Got post delete review");

  const review = req.body;

  console.log("got delete review", review);

  await myDB.deleteReview(review);

  console.log("review deleted");

  res.redirect("/review");
});


/* POST update reviews. */
router.post("/review/:reviewID", async function (req, res) {
  console.log("Got post update review");

  const review = req.body;

  console.log("got update review", review);

  await myDB.updateReview(review);

  console.log("review updated");

  res.redirect("/review");
});



/* ---------Roomtype related functions starts from here -----------------*/
/* GET home page. */
router.get("/roomType", async function (req, res) {
  console.log("Got request for /");

  const roomType = await myDB.getRoomType();

  console.log("got roomTypes", roomType);

  // render the _index_ template with the roomTypes attrib as the list of roomTypes
  res.render("index-roomType", { roomTypes: roomType});
});





/* GET roomTypes details. */
router.get("/roomType/:roomTypeID", async function (req, res) {
  console.log("Got roomType details");

  const roomTypeID = req.params.roomTypeID;

  console.log("got roomType ", roomTypeID);

  const roomType = await myDB.getRoomTypeByID(roomTypeID);

  console.log("got roomType by id");

  res.render("RoomTypeDetails", {roomType: roomType});
});

/* POST create roomTypes. */
router.post("/roomType/create", async function (req, res) {
  console.log("Got post create/roomType");

  const roomType = req.body;

  console.log("got create roomType", roomType);

  await myDB.createRoomType(roomType);

  console.log("roomTypes created");

  res.redirect("/roomType");
});

/* POST delete roomTypes. */
router.post("/roomType/delete", async function (req, res) {
  console.log("Got post delete roomType");

  const roomType = req.body;

  console.log("got delete roomType", roomType);

  await myDB.deleteRoomType(roomType);

  console.log("roomType deleted");

  res.redirect("/roomType");
});


/* POST update roomTypes. */
router.post("/roomType/:roomTypeID", async function (req, res) {
  console.log("Got post update roomType");

  const roomType = req.body;

  console.log("got update roomType", roomType);

  await myDB.updateRoomType(roomType);

  console.log("roomType updated");

  res.redirect("/roomType");
});



module.exports = router;
