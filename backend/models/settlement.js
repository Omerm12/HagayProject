import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Settlement = sequelize.define('Settlement', {
  name: DataTypes.STRING,
  district: DataTypes.STRING,
  municipality_name: DataTypes.STRING,
  is_deliverable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: false,
  tableName: 'settlements',

});

export default Settlement;