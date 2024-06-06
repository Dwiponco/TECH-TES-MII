const { Employee, EmployeeProfile, EmployeeFamily, Education, sequelize } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Get All Employees
const getAllEmployees = catchAsync(async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: [
                { model: EmployeeProfile, as: 'profile' },
                { model: EmployeeFamily, as: 'families' },
                { model: Education, as: 'educations' }
            ]
        });
        res.json(employees);
    } catch (error) {
        throw new AppError(error.message, 500);
    }
})

// Get One Employee with Relations
const getOneEmployee = catchAsync(async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findByPk(id, {
            include: [
                { model: EmployeeProfile, as: 'profile' },
                { model: EmployeeFamily, as: 'families' },
                { model: Education, as: 'educations' }
            ]
        });
        if (!employee) {
            throw new AppError("Employee not found", 400);
        }
        res.json(employee);
    } catch (error) {
        throw new AppError(error.message, 500);
    }
})

// Create Employee and its profile, family, & education
const createEmployee = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { profile, families, educations, ...employeeData } = req.body;

        const employee = await Employee.create(employeeData, { transaction: t });

        if (profile) {
            profile.employee_id = employee.id;
            await EmployeeProfile.create(profile, { transaction: t });
        }

        if (families && families.length > 0) {
            for (const family of families) {
                family.employee_id = employee.id;
                await EmployeeFamily.create(family, { transaction: t });
            }
        }

        if (educations && educations.length > 0) {
            for (const education of educations) {
                education.employee_id = employee.id;
                await Education.create(education, { transaction: t });
            }
        }

        await t.commit();
        res.status(201).json(employee);
    } catch (error) {
        await t.rollback();
        res.status(400).json({ message: error.message });
    }
};

// Update Employee and its profile, family, & education
const updateEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        const { profile, families, educations, ...employeeData } = req.body;

        // Set updated_at to the current time
        employeeData.updated_at = new Date();

        // Remove created_at if present to prevent its update
        delete employeeData.created_at;

        const [updated] = await Employee.update(employeeData, {
            where: { id: id }
        });

        if (!updated) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (profile) {
            await EmployeeProfile.update(profile, {
                where: { employee_id: id }
            });
        }

        if (families && families.length > 0) {
            const existingFamilies = await EmployeeFamily.findAll({ where: { employee_id: id } });

            // Create a map of existing families
            const existingFamiliesMap = new Map(existingFamilies.map(f => [f.id, f]));

            // Update existing families and create new ones
            for (const family of families) {
                if (family.id && existingFamiliesMap.has(family.id)) {
                    await EmployeeFamily.update(family, { where: { id: family.id } });
                    existingFamiliesMap.delete(family.id);
                } else {
                    family.employee_id = id;
                    await EmployeeFamily.create(family);
                }
            }

            // Delete families that are no longer present in the request
            for (const family of existingFamiliesMap.values()) {
                await EmployeeFamily.destroy({ where: { id: family.id } });
            }
        }

        if (educations && educations.length > 0) {
            const existingEducations = await Education.findAll({ where: { employee_id: id } });

            // Create a map of existing educations
            const existingEducationsMap = new Map(existingEducations.map(e => [e.id, e]));

            // Update existing educations and create new ones
            for (const education of educations) {
                if (education.id && existingEducationsMap.has(education.id)) {
                    await Education.update(education, { where: { id: education.id } });
                    existingEducationsMap.delete(education.id);
                } else {
                    education.employee_id = id;
                    await Education.create(education);
                }
            }

            // Delete educations that are no longer present in the request
            for (const education of existingEducationsMap.values()) {
                await Education.destroy({ where: { id: education.id } });
            }
        }

        const result = await Employee.findByPk(id, {
            include: [
                { model: EmployeeProfile, as: 'profile' },
                { model: EmployeeFamily, as: 'families' },
                { model: Education, as: 'educations' }
            ]
        });

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Employee
const deleteEmployee = catchAsync(async (req, res) => {
    const id = req.params.id;
    try {
        await EmployeeProfile.destroy({ where: { employee_id: id } });
        await EmployeeFamily.destroy({ where: { employee_id: id } });
        await Education.destroy({ where: { employee_id: id } });

        const deleted = await Employee.destroy({
            where: { id: id }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        throw new AppError(error.message, 500);
    }
})

// Delete an entry from EmployeeFamily
const deleteEmployeeFamily = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await EmployeeFamily.destroy({ where: { id } });

        if (result) {
            res.status(200).json({ message: 'Employee family entry deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee family entry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEducation = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Education.destroy({ where: { id } });

        if (result) {
            res.status(200).json({ message: 'Education entry deleted successfully' });
        } else {
            res.status(404).json({ message: 'Education entry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getAllEmployees,
    getOneEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    deleteEmployeeFamily,
    deleteEducation
}