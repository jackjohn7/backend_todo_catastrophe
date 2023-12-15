import sqlite3 from "sqlite3";
import { readFileSync } from "fs";

export class Repository {
  db;
  constructor(connectionString) {
    // connnect to connection string and store connection
    this.db = new sqlite3.Database(connectionString);
  }

  // write your database queries as METHODS here (delete deleteMe)

  async getUsers() {
    // these functions are meant to retrieve data for the routes!
    //  A promise is used in an asynchronous operation
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // if no error, resolve the promise with rows of users
          resolve(rows);
        }
      });
    })

  }

  // database migration (delete maindb.sqlite to reset)
  async migrate() {
    // if not alrady populated, populate tables with dummy data
    const SQL_TO_GET_ALL_TABLES = `SELECT
    name
FROM
    sqlite_schema
WHERE
    type ='table' AND
    name NOT LIKE 'sqlite_%';`;
    let runMigration = false;
    let _ = await this.db.all(SQL_TO_GET_ALL_TABLES, [], (err, rows) => {
      if (err) {
        process.exit(1);
      }
      if (rows.length != 3) {
        let schemaSql = readFileSync("migrations/create_tables.sql", "utf8")
        this.db.exec(schemaSql, err => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Schema created successfully');
                // create dummy data as well
                const userQuery = "INSERT INTO users (username) VALUES(?);"
                for (let user of dummyUsers) {
                this.db.run(userQuery, [...Object.values(user)], err => {
                  if (err) {
                    console.log(err);
                  }
                  });
                }
                const statusQuery = "INSERT INTO todo_statuses (status_name) VALUES(?);"
                for (let status of dummyTodoStatuses) {
                this.db.run(statusQuery, [...Object.values(status)], err => {
                  if (err) {
                    console.log(err);
                  }
                  });
                }
                const todoQuery = "INSERT INTO todos (content, user_id, status_id, date_updated) VALUES(?, ?, ?, ?);"
                for (let todo of dummyTodos) {
                this.db.run(todoQuery, [...Object.values(todo)], err => {
                  if (err) {
                    console.log(err);
                  }
                  });
                }
            }
        });

      }
    })
    if (runMigration) {
      console.log("MIGRATING")

    }
  }
}


// DUMMY DATA (IGNORE)
const dummyUsers = [
  {username: "Jack"},
  {username: "Coby"},
  {username: "Gerald"},
];

const dummyTodoStatuses = [
  { status_name: "Incomplete" },
  { status_name: "Complete" },
];

let currentDate = new Date();

const dummyTodos = [
  { content: "Buy groceries", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Clean the house", user_id: 2, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Read a book", user_id: 1, status_id: 2, date_updated: currentDate.toISOString() },
  { content: "Go for a run", user_id: 2, status_id: 2, date_updated: currentDate.toISOString() },
  { content: "Write code", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Call a friend", user_id: 2, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Plan weekend activities", user_id: 1, status_id: 2, date_updated: currentDate.toISOString() },
  { content: "Watch a movie", user_id: 2, status_id: 2, date_updated: currentDate.toISOString() },
  { content: "Learn a new skill", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Organize desk", user_id: 2, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Buy birthday gift", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Complete work project", user_id: 2, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Attend yoga class", user_id: 1, status_id: 2, date_updated: currentDate.toISOString() },
  { content: "Cook a new recipe", user_id: 2, status_id: 2, date_updated: currentDate.toISOString() },
  { content: "Write blog post", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Practice a musical instrument", user_id: 2, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Explore a new hiking trail", user_id: 1, status_id: 2, date_updated: currentDate.toISOString() },
  { content: "Attend a meetup event", user_id: 2, status_id: 2, date_updated: currentDate.toISOString() },
  { content: "Start a fitness challenge", user_id: 1, status_id: 1, date_updated: currentDate.toISOString() },
  { content: "Create a budget plan", user_id: 2, status_id: 1, date_updated: currentDate.toISOString() },
];
