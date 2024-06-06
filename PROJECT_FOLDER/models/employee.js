const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 5],
          msg: 'NIK must be exactly 5 characters long'
        },
        is: {
          args: /^[0-9]{5}$/,
          msg: "NIK must be 5 digits"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   is: {
      //     args: /^[a-zA-Z]+$/,
      //     msg: 'Name must contain only alphabetic characters'
      //   },
      //   notEmpty: {
      //     msg: 'Name is required'
      //   }
      // }
    },    
    is_active: {
      type: DataTypes.BOOLEAN
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'employee',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeUpdate: (employee, options) => {
        employee.updated_at = now;
      }
    },
  });

  Employee.associate = (models) => {
    Employee.hasOne(models.EmployeeProfile, {
      foreignKey: 'employee_id',
      as: 'profile',
    });
    Employee.hasMany(models.EmployeeFamily, {
      foreignKey: 'employee_id',
      as: 'families',
    });
    Employee.hasMany(models.Education, {
      foreignKey: 'employee_id',
      as: 'educations',
    });
  };

  
  return Employee;
};