import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

import Product from './productsModel.js';
import Order from './ordersModel.js';

const OrderItem = sequelize.define('order_items', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_id: { type: DataTypes.INTEGER },
  product_id: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER },
  price: { type: DataTypes.NUMERIC }
}, {
  tableName: 'order_items',
  timestamps: false,
});

OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

export default OrderItem;
