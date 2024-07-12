import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**
 * @openapi
 * components:
 *  schemas:
 *    Book:
 *      type: object
 *      properties:
 *        gutenbertId:
 *          type: integer
 *          example: 147
 *        title:
 *          type: string
 *          example: Common Sense
 */
const bookSchema = new Schema(
  {
    gutenbergId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    authors: [
      {
        name: { type: String, required: true },
        birthYear: { type: Number },
        deathYear: { type: Number },
      },
    ],
    translators: [
      {
        name: { type: String, required: true },
        birthYear: { type: Number },
        deathYear: { type: Number },
      },
    ],
    type: { type: String, required: true },
    subjects: [{ type: String }],
    languages: [{ type: String }],
    formats: [
      {
        contentType: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    downloads: { type: Number },
    bookShelves: [{ type: String }],
    copyright: { type: Boolean },
  },
  { collection: "books" }
);

const Book = model("Book", bookSchema);

export default Book;
