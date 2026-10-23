````markdown
# QuickNotes Data Model

## Entities and Relationships

- **users:** Stores user accounts (`id` PK, `email`, `password_hash`).
- **notes:** Stores the actual notes (`id` PK, `user_id` FK, `title`, `body`).
- **tags:** Stores categorization tags (`id` PK, `name`).
- **note_tags:** A join table connecting notes and tags (`note_id` FK, `tag_id` FK).

**Relationships:**

- **One-to-Many:** One `user` can have many `notes`. (The `notes` table has a `user_id` foreign key).
- **Many-to-Many:** One `note` can have many `tags`, and one `tag` can be applied to many `notes`. Relational databases require a join table (`note_tags`) to map this relationship cleanly.

## CREATE TABLE Statements

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```
````
