'use strict';

/**
 * Ocean Professional Backend - Products Service
 * Encapsulates data operations and validation.
 * In-memory store for demonstration. Replace with DB integration as needed.
 */

class ProductsService {
  constructor() {
    /** @type {Array<{id:string,name:string,price:number,quantity:number}>} */
    this.products = [];
  }

  // PUBLIC_INTERFACE
  /**
   * Validate a product payload.
   * @param {{id?: any, name?: any, price?: any, quantity?: any}} payload
   * @param {{requireId: boolean}} options
   * @returns {{valid: boolean, message?: string}}
   */
  validate(payload, options = { requireId: true }) {
    const { id, name, price, quantity } = payload;

    if (options.requireId) {
      if (id === undefined || id === null || String(id).trim().length === 0) {
        return { valid: false, message: 'id is required and must be a non-empty string' };
      }
    }

    if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
      return { valid: false, message: 'name must be a non-empty string' };
    }
    if (price !== undefined && (typeof price !== 'number' || Number.isNaN(price) || price < 0)) {
      return { valid: false, message: 'price must be a non-negative number' };
    }
    if (quantity !== undefined && (!Number.isInteger(quantity) || quantity < 0)) {
      return { valid: false, message: 'quantity must be a non-negative integer' };
    }
    return { valid: true };
  }

  // PUBLIC_INTERFACE
  /**
   * Get all products.
   * @returns {Promise<Array>}
   */
  async getAll() {
    return [...this.products];
  }

  // PUBLIC_INTERFACE
  /**
   * Get product by ID.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getById(id) {
    const item = this.products.find(p => p.id === String(id));
    return item || null;
  }

  // PUBLIC_INTERFACE
  /**
   * Create a product.
   * @param {{id:string,name:string,price:number,quantity:number}} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const product = {
      id: String(data.id),
      name: String(data.name).trim(),
      price: Number(data.price),
      quantity: Number(data.quantity),
    };
    this.products.push(product);
    return product;
  }

  // PUBLIC_INTERFACE
  /**
   * Update a product by ID.
   * @param {string} id
   * @param {{name?: string, price?: number, quantity?: number}} data
   * @returns {Promise<Object|null>}
   */
  async update(id, data) {
    const idx = this.products.findIndex(p => p.id === String(id));
    if (idx === -1) return null;

    const current = this.products[idx];
    const updated = {
      ...current,
      ...(data.name !== undefined ? { name: String(data.name).trim() } : {}),
      ...(data.price !== undefined ? { price: Number(data.price) } : {}),
      ...(data.quantity !== undefined ? { quantity: Number(data.quantity) } : {}),
    };
    this.products[idx] = updated;
    return updated;
  }

  // PUBLIC_INTERFACE
  /**
   * Remove a product by ID.
   * @param {string} id
   * @returns {Promise<boolean>} true if removed
   */
  async remove(id) {
    const initialLen = this.products.length;
    this.products = this.products.filter(p => p.id !== String(id));
    return this.products.length < initialLen;
  }
}

module.exports = new ProductsService();
