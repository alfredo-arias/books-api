import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Metadata info about or API
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Gutenberg's Books Index API",
      version: "1.0.0",
    },
  },
  apis: ["src/routes/v1/bookRoutes.js", "src/models/bookModel.js"],
};

// Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeadter("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Version 1 Docs are available at http://localhost:${PORT}/api/v1/docs`
  );
};

export { swaggerDocs };
