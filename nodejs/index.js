const express = require("express");

const db = [
  { id: 1, name: "devSamurai", site: "http://devsamurai.com" },
  { id: 2, name: "google", site: "http://google.com" },
  { id: 3, name: "uol", site: "http://uol.com" },
];

const app = express();
app.use(express.json());

app.get("/user", (request, response) => {
  return response.status(200).json({ msg: db });
});

app.post("/user", (request, response) => {
  const { id, name, site } = request.body;
  console.log(db);

  db.push({
    id,
    name,
    site,
  });
  return response.status(201).json({ msg: "criando", db });
});

app.get("/user/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const indexId = db.find((item) => item.id === id);
  if (indexId) {
    response.status(200).json({ msg: "buscando", indexId });
  } else {
    response.status(404).json({ msg: "usuario não encontrado" });
  }
});

app.put("/user/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const { name, site } = request.body;

  const indexId = db.findIndex((item) => item.id === id); // Finding the index of the user with the given id in your 'db' array

  if (indexId >= 0) {
    db[indexId].name = name;
    db[indexId].site = site;
  } else {
    response.status(404).json({ msg: "usuario não encontrado" });
  }

  response.status(200).json({ msg: "atualizando com sucesso" }); // Sending response
});

app.delete("/user/:id", (request, response) => {
  const userId = parseInt(request.params.id);

  const indexId = db.findIndex((item) => item.id === userId);

  db.splice(indexId, 1);

  return response.status(200).json({ msg: "excluido com sucesso " });
});

app.listen(3000, () => console.log("servidor rodando"));
