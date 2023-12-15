import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
import { createServer } from "./server.js";
const { should, expect } = chai;
import { Repository } from "./repositories.js";
import { z } from "zod";

const userSchema = z.object({
  user_id: z.number(),
  username: z.union([z.literal("Jack"), z.literal("Coby"), z.literal("Gerald")]),
})

// creates database in memory (empty)
const repos = new Repository(":memory:");
repos.migrate();
const app = createServer(repos);

app.listen(3000, () => {})

describe('GET /', () => {
  it('should return a JSON of message and string', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.deep.equal({message: "Hello, world"});
        done();
      });
  });
});

describe('GET /users', () => {
  it('should return a JSON array of all users', done => {
    chai
      .request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(z.array(userSchema).safeParse(res.body).success).equal(true)
        done();
      });
  });
});

describe('GET /todos for Jack', () => {
  it('should return a JSON array of Jacks todos', done => {
    chai
      .request(app)
      .get('/todos/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.deep.equal([
          { content: "Buy groceries", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
          { content: "Read a book", user_id: 1, status_id: 2, date_updated: currentDate.toISOString() },
          { content: "Write code", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
          { content: "Plan weekend activities", user_id: 1, status_id: 2, date_updated: currentDate.toISOString() },
          { content: "Learn a new skill", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
          { content: "Buy birthday gift", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
          { content: "Attend yoga class", user_id: 1, status_id: 2, date_updated: currentDate.toISOString() },
          { content: "Write blog post", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
          { content: "Explore a new hiking trail", user_id: 1, status_id: 2, date_updated: currentDate.toISOString() },
          { content: "Start a fitness challenge", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
        ]);
        done();
      });
  });
});
