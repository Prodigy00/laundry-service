const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const services = [
  { id: 1, name: "Wash" },
  { id: 2, name: "clean" },
  { id: 3, name: "iron" },
  { id: 4, name: "dry clean" }
];

app.get("/", (req, res) => {
  res.send("Welcome to my Laundry Service!");
});

app.get("/api/services", (req, res) => {
  res.send(services);
});

app.post("/api/services", (req, res) => {
  //input validator
  const { error } = validateService(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const service = {
    id: services.length + 1,
    name: req.body.name
  };

  services.push(service);
  res.send(service);
});

app.get("/api/services/:id", (req, res) => {
  const service = services.find(
    service => service.id === parseInt(req.params.id)
  );

  if (!service)
    return res
      .status(404)
      .send("The service you are looking for was not found");
  res.send(service);
});

app.put("/api/services/:id", (req, res) => {
  //Look up the service
  //If not existing, return 404
  const service = services.find(
    service => service.id === parseInt(req.params.id)
  );

  if (!service)
    return res
      .status(404)
      .send("The service you are looking for was not found");

  //Validate
  //If invalid, return 400 - Bad Request

  const { error } = validateService(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //Update service
  service.name = req.body.name;
  //Return the updated service
  res.send(service);
});

app.delete("/api/services/:id", (req, res) => {
  //Look up the service
  //Not existing, return 404
  const service = services.find(
    service => service.id === parseInt(req.params.id)
  );

  if (!service)
    return res
      .status(404)
      .send("The service you are looking for was not found");

  //Delete
  const index = services.indexOf(service);
  services.splice(index, 1);

  //Return the same course
  res.send(service);
});

const validateService = service => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(service, schema);
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
