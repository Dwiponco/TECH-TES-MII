const dayjs = require("dayjs");

// models/education.js
module.exports = (sequelize, DataTypes) => {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const Education = sequelize.define('Education', {
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
        // is: {
        //   args: /^[a-zA-Z]+$/,
        //   msg: 'Name must contain only alphabetic characters'
        // },
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },       
    level: {
      type: DataTypes.ENUM('tk', 'sd', 'smp', 'sma', 'strata 1', 'strata 2', 'doctor', 'profesor'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['tk', 'sd', 'smp', 'sma', 'strata 1', 'strata 2', 'doctor', 'profesor']],
          msg: 'Invalid level'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 255],
          msg: 'Description must be less than or equal to 255 characters long'
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
    tableName: 'education',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeUpdate: (education, options) => {
        education.updated_at = now;
      }
    },
  });

  Education.associate = (models) => {
    Education.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
      as: 'employee',
    });
  };

  return Education;
};