const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
  const EmployeeFamily = sequelize.define('EmployeeFamily', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-Z\s]+$/,
          msg: 'Name must contain only alphabetic characters'
        },
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },    
    identifier: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [17, 17],
          msg: 'Identifier must be exactly 17 characters long'
        },
        isNumeric: {
          msg: 'Identifier must contain only numeric characters'
        }
      }
    },
    job: {
      type: DataTypes.STRING,
      allowNull: true
    },
    place_of_birth: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Place of birth is required'
        }
      }
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Date of birth is required'
        }
      }
    },
    religion: {
      type: DataTypes.ENUM('islam', 'katolik', 'buda', 'protestan', 'konghucu'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['islam', 'katolik', 'buda', 'protestan', 'konghucu']],
          msg: 'Invalid religion'
        }
      }
    },
    is_life: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    is_divorced: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    relation_status: {
      type: DataTypes.ENUM('Suami', 'Istri', 'Anak', 'Anak Sambung'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['Suami', 'Istri', 'Anak', 'Anak Sambung']],
          msg: 'Invalid relation status'
        }
      }
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'employee_family',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeUpdate: (family, options) => {
        family.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
      }
    },
  });

  EmployeeFamily.associate = (models) => {
    EmployeeFamily.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
      as: 'employee',
    });
  };

  return EmployeeFamily;
};
