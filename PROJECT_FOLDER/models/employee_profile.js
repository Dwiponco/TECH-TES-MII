const dayjs = require("dayjs");

// models/employee_profile.js
module.exports = (sequelize, DataTypes) => {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const EmployeeProfile = sequelize.define('EmployeeProfile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id'
      }
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
    gender: {
      type: DataTypes.ENUM('laki-laki', 'perempuan'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['laki-laki', 'perempuan']],
          msg: 'Invalid gender'
        }
      }
    },
    
    is_married: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    prof_pict: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Created by is required'
        }
      }
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Updated by is required'
        }
      }
    },    
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'employee_profile',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeUpdate: (profile, options) => {
        profile.updated_at = now;
      }
    },
  });

  EmployeeProfile.associate = (models) => {
    EmployeeProfile.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
      as: 'employee',
    });
  };

  return EmployeeProfile;
};
