import db from "../models/index.js";

const distinctLanguages = async () => {
  return await db.book.distinct("languages");
};

export { distinctLanguages };
