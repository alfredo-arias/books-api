// In src/routes/v1/bookRoutes.js
import apicache from "apicache";
import { Router } from "express";
import * as BookController from "../../controllers/bookController.js";

const cache = apicache.middleware;

const router = Router();

/**
 * @openapi
 * /v1/books:
 *  get:
 *    tags:
 *      - Books
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  type: array
 *                  items:
 *                      $ref: "#/components/schemas/Book"
 */
router.get("/v1/books", BookController.getAllBooks);

router.get("/v1/books/:id", cache("2 minutes"), (req, res) => {
  return res.status(HttpStatusCode.NotImplemented).json({
    statusCode: HttpStatusCode.NotImplemented,
    message: "Not Implemented",
  });
});

router.patch("/v1/books/:id", (req, res) => {
  return res.status(HttpStatusCode.NotImplemented).json({
    statusCode: HttpStatusCode.NotImplemented,
    message: "Not Implemented",
  });
});

export default router;
