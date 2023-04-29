const express = require('express')
const employeeController = require('../controller/employeeController')
const router = express.Router()

router.get('/', employeeController.getAllEmployee)
router.get('/:id', employeeController.getEmployee)
router.delete('/:id', employeeController.deleteEmployee)
router.post('/', employeeController.addEmployee)
router.put('/:id', employeeController.updateEmployee)


module.exports = router