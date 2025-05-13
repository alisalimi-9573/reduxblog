import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonServer = require("json-server");
import generateData from "./mock-api/db.js";

const server = jsonServer.create();
const router = jsonServer.router(generateData());
const middlewares = jsonServer.defaults();
const PORT = 5000;
server.use(middlewares);

server.use(jsonServer.bodyParser);

server.post("/posts/:id/reaction/:type", (req, res) => {
  const { id, type } = req.params;
  const post = router.db.get("posts").find({ id }).value();

  post.reactions[type] += 1;
  res.jsonp({
    success: true,
  });
});
server.post("/posts", (req, res, next) => {
  req.body = {
    ...req.body,
    date: Date.now(),
    reactions: {
      eyes: 0,
      heart: 0,
      hooray: 0,
      rocket: 0,
      thumbsUp: 0,
    },
  };

  next();
});

server.use((req, res, next) => {
  setTimeout(next, 1000);
});
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
