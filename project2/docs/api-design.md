# QuickNotes API Design

## REST Endpoints

| Method   | Path         | Description                                              | Success Status |
| :------- | :----------- | :------------------------------------------------------- | :------------- |
| `GET`    | `/notes`     | Retrieve a list of all notes for the authenticated user. | 200 OK         |
| `POST`   | `/notes`     | Create a new note.                                       | 201 Created    |
| `GET`    | `/notes/:id` | Retrieve a specific note by its ID.                      | 200 OK         |
| `PUT`    | `/notes/:id` | Update an existing note's title or body.                 | 200 OK         |
| `DELETE` | `/notes/:id` | Delete a specific note.                                  | 204 No Content |
| `GET`    | `/tags`      | Retrieve all tags created by the user.                   | 200 OK         |

## JSON Examples

**1. Creating a Note (POST /notes)**
_Request Body:_

```json
{
  "title": "Grocery List",
  "body": "Milk, Eggs, Bread"
}
```
