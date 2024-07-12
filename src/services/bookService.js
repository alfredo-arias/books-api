import db from "../models/index.js";

const findBooks = async (filters, sortBy, page, limit) => {
  return await db.book
    .find(filters)
    .sort(sortBy)
    .skip(page * limit)
    .limit(limit);
};

const countBooks = async (filters) => {
  return await db.book.countDocuments(filters);
};

export { findBooks, countBooks };
