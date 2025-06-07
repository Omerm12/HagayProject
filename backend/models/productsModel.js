import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js'; // קובץ ההגדרה של Sequelize instance

const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: DataTypes.TEXT,
  price_per_unit: DataTypes.FLOAT,
  unit_type: DataTypes.STRING,
  quantity_in_pack: DataTypes.INTEGER,
  category: DataTypes.STRING,
  is_on_sale: DataTypes.BOOLEAN,
  sale_description: DataTypes.TEXT,
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'products',
  timestamps: false
});

export async function getAllProducts() {
  return await Product.findAll();
}

export async function getProductById(id) {
  return await Product.findByPk(id);
}

export async function createProduct(data) {
  return await Product.create(data);
}

export async function updateProduct(id, data) {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return await product.update(data);
}

export async function deleteProduct(id) {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return product;
}



export default Product;
