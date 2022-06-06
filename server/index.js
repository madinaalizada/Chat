console.clear();
const PORT = 3200;

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const userService = require("./userService");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("Dont have any users");
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = req.body;
    const id = await userService.addUser(user);
    res.send(id.toString());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/:userName/:partnerName", async (req, res) => {
  try {
    const message = {userName: req.params.userName, partnerName: req.params.partnerName};
    console.log('message', message);
    const messages = await userService.getMessages(message);
    console.log(messages);
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/message", async (req, res) => {
  try {
    const message = req.body;
    const response = await userService.addMessage(message);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const server = app.listen(PORT, () =>
  console.log(`Your app listen on http://localhost:${PORT}`)
);


