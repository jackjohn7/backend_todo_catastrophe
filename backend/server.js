import express from "express";

export function createServer(db) {
  // app is instance of Express class
  let app = express();

  // Here, I defined a GET route that returns some JSON
  //  First argument defines the route.
  //  Second argument defines the function that is ran
  //   This function is written using arrow syntax, but
  //   don't let it confuse you. It is equivalent to the
  //   code commented out below it.
  app.get("/", (req, res) => {
    // JSON is the data interchange format that we use most often
    res.json({message: "Hello, world"});
  });

  /*
  app.get("/", function(req, res) {
    res.json({message: "Hello, world"});
  })
  */

  // ADD YOUR ROUTES HERE:

  app.get("/users", async (req, res) => {
    const users = await db.getUsers()
    res.json(users);
  });

  return app;
}
