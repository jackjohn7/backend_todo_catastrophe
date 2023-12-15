
import { createServer } from "./server.js";
import { Repository } from "./repositories.js";

const repos = new Repository("maindb.sqlite");
repos.migrate()
let app = createServer(repos);

app.listen(3000, () => console.log("listening on port 3000"));
