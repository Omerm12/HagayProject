import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const ContactMessage = sequelize.define("ContactMessage", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'contact_messages', 
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default ContactMessage;
