import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  basePath: "/api",
  info: {
    title: "Documentation",
    version: "1.0.0",
    description: "Auto-generated API documentation for components",
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Browser API",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
