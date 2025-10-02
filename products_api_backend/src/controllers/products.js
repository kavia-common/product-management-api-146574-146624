'use strict';

/**
 * Ocean Professional Backend - Products Controller
 * Clean, minimal, and well-documented handlers for Products CRUD.
 */

const productsService = require('../services/products');

class ProductsController {
  // PUBLIC_INTERFACE
  /**
   * Get list of all products.
   * Returns an array of product objects.
   */
  async list(req, res, next) {
    try {
      const items = await productsService.getAll();
      return res.status(200).json({ status: 'ok', data: items });
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get a product by ID.
   * Path param: id
   */
  async getById(req, res, next) {
    try {
      const id = req.params.id.trim();
      const item = await productsService.getById(id);
      if (!item) {
        return res.status(404).json({ status: 'error', message: 'Product not found' });
      }
      return res.status(200).json({ status: 'ok', data: item });
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new product.
   * Body: { id, name, price, quantity }
   */
  async create(req, res, next) {
    try {
      const { id, name, price, quantity } = req.body;

      const validation = productsService.validate({ id, name, price, quantity }, { requireId: true });
      if (!validation.valid) {
        return res.status(400).json({ status: 'error', message: validation.message });
      }

      const exists = await productsService.getById(String(id));
      if (exists) {
        return res.status(409).json({ status: 'error', message: 'Product with given id already exists' });
      }

      const created = await productsService.create({ id: String(id), name: String(name).trim(), price: Number(price), quantity: Number(quantity) });
      return res.status(201).json({ status: 'ok', data: created });
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Update an existing product by ID.
   * Path param: id
   * Body allows updating name, price, quantity (id path is the identifier).
   */
  async update(req, res, next) {
    try {
      const id = req.params.id.trim();
      const { name, price, quantity } = req.body;

      const validation = productsService.validate({ id, name, price, quantity }, { requireId: false });
      if (!validation.valid) {
        return res.status(400).json({ status: 'error', message: validation.message });
      }

      const updated = await productsService.update(id, { name, price, quantity });
      if (!updated) {
        return res.status(404).json({ status: 'error', message: 'Product not found' });
      }
      return res.status(200).json({ status: 'ok', data: updated });
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a product by ID.
   * Path param: id
   */
  async remove(req, res, next) {
    try {
      const id = req.params.id.trim();
      const removed = await productsService.remove(id);
      if (!removed) {
        return res.status(404).json({ status: 'error', message: 'Product not found' });
      }
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new ProductsController();
