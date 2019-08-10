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
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  Joi.validate(req.body, schema);

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
    res.status(404).send("The service you are looking for was not found");
  res.send(service);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
