const { Employee, EmployeeProfile, Education, EmployeeFamily } = require('../models');
const dayjs = require('dayjs');

// Helper function to calculate age
const calculateAge = (birthDate) => {
  return dayjs().diff(birthDate, 'year');
};

// Helper function to format family data
const formatFamilyData = (families) => {
  const familyCount = families.reduce((acc, family) => {
    const relation = family.relation_status.toLowerCase();
    if (relation in acc) {
      acc[relation]++;
    } else {
      acc[relation] = 1;
    }
    return acc;
  }, {});

  const formattedFamilyData = Object.entries(familyCount)
    .map(([relation, count]) => `${count} ${relation.charAt(0).toUpperCase() + relation.slice(1)}`)
    .join(' & ');

  return formattedFamilyData;
};

const getEmployeeReport = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        { model: EmployeeProfile, as: 'profile' },
        { model: Education, as: 'educations' },
        { model: EmployeeFamily, as: 'families' }
      ]
    });

    const report = employees.map(employee => {
      const profile = employee.profile;
      const educations = employee.educations;
      const families = employee.families;

      const schoolName = educations.length > 0 ? educations[0].name : null;
      const level = educations.length > 0 ? educations[0].level : null;

      return {
        employee_id: employee.id,
        nik: employee.nik,
        name: employee.name,
        is_active: employee.is_active,
        gender: profile.gender,
        age: `${calculateAge(profile.date_of_birth)} Years Old`,
        school_name: schoolName,
        level: level,
        family_data: formatFamilyData(families)
      };
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployeeReport
}