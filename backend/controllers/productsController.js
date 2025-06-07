import * as model from '../models/productsModel.js';

export async function getAll(req, res) {
  const products = await model.getAllProducts();
  res.json(products);
}

export async function getById(req, res) {
  const product = await model.getProductById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ error: 'Product not found' });
}

export async function create(req, res) {
  const newProduct = await model.createProduct(req.body);
  res.status(201).json(newProduct);
}

export async function update(req, res) {
  const updatedProduct = await model.updateProduct(req.params.id, req.body);
  res.json(updatedProduct);
}

export async function remove(req, res) {
  const deleted = await model.deleteProduct(req.params.id);
  res.json(deleted);
}
