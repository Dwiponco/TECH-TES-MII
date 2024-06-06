const router = require('express').Router()
const {
    getAllEmployees,
    getOneEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee, 
    deleteEmployeeFamily,
    deleteEducation} = require('../controller/employeeController');

router.get('/', getAllEmployees)
router.get('/:id', getOneEmployee);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

router.delete('/employee-family/:id', deleteEmployeeFamily);
router.delete('/education/:id', deleteEducation);

module.exports = router