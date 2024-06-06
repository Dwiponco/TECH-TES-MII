const router = require('express').Router()
const { getEmployeeReport } = require('../controller/reportController')

router.get('/', getEmployeeReport);

module.exports = router