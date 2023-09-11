const express = require("express");
const router = express.Router()
const ReportController = require("../controllers/ReportController")

router.get("/get-all-report", ReportController.getAllReport)

module.exports = router