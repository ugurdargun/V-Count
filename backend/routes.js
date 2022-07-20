const express = require("express");
const router = express.Router();
const { getCountries, getSalesRep, getOptimal } = require("./controller");

router.get("/countries", getCountries);
router.get("/salesrep", getSalesRep);
router.get("/optimal", getOptimal);

module.exports = router;
