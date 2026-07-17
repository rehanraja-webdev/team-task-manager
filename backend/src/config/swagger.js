import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "TeamTask API",
      version: "1.0.0",
      description: "Project Management API",
    },

    server: [
      {
        url: "http://localhost:/5000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
