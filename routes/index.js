let express = require("express");
let router = express.Router();

const airbnbDB = require("../db/airbnbSQLiteDB.js");

/* GET home page. */
router.get("/", async function (req, res) {
  console.log("Got request for /");

  const district = await airbnbDB.getDistricts();

  console.log("got districts", district);

  // render the _index_ template with the districts attrib as the list of districts
  res.render("index", { districts: district});
});





/* GET districts details. */
router.get("/district/:districtId", async function (req, res) {
  console.log("Got districts details");

  const districtId = req.params.districtId;

  console.log("got districts ", districtId);

  const district = await airbnbDB.getdistrictByID(districtId);

  console.log("districts created");

  res.render("DistrictDetails", {district: district});
});

/* POST create districts. */
router.post("/district/create", async function (req, res) {
  console.log("Got post create/district");

  const district = req.body;

  console.log("got create district", district);

  await airbnbDB.createDistrict(district);

  console.log("districts created");

  res.redirect("/");
});

/* POST create districts. */
router.post("/district/delete", async function (req, res) {
  console.log("Got post delete district");

  const district = req.body;

  console.log("got delete district", district);

  await airbnbDB.deleteDistrict(district);

  console.log("district deleted");

  res.redirect("/");
});


/* POST update districts. */
router.post("/district/:districtId", async function (req, res) {
  console.log("Got post update district");

  const district = req.body;

  console.log("got update district", district);

  await airbnbDB.updateDistrict(district);

  console.log("district updated");

  res.redirect("/");
});


module.exports = router;
