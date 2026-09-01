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
        url: "https://team-task-api-tu6j.onrender.com",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/routes/v1/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
