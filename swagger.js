
const swaggerAutogen = require("swagger-autogen")

const doc = {
  info: {
    title: "Todo API",
    description: "Social Media Api",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swaggerdoc.json";
const endpointsFiles = ["./Routes/*.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});