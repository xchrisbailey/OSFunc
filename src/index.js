const express = require("express");
const getRanks = require("./lib/ranking");
const app = express();

app.set("port", process.env.PORT || 4000);

app.get("/rank", async (_req, res) => {
  try {
    const ranks = await getRanks();
    res.send(ranks);
  } catch (error) {
    res.send(error);
  }
});

app.server = app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
