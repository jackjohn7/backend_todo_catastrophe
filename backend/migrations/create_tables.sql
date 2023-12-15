-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL
);

-- Create the 'todo_statuses' table
CREATE TABLE IF NOT EXISTS todo_statuses (
    status_id INTEGER PRIMARY KEY AUTOINCREMENT,
    status_name TEXT NOT NULL
);

-- Create the 'todos' table with foreign key references
CREATE TABLE IF NOT EXISTS todos (
    todo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    user_id INTEGER,
    status_id INTEGER,
    date_updated TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (status_id) REFERENCES todo_statuses(status_id)
);
