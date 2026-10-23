````markdown
# QuickNotes System Architecture

## Requirements

- **Functional:** Users must be able to create, read, update, and delete text notes instantly.
- **Non-Functional:** The system must be highly available (99.9% uptime), secure, and capable of handling 1 million registered users with low latency.

## Load Estimates (1 Million Users)

_Assuming 10% daily active users (100k DAU). Each DAU writes 2 notes and reads 20 notes per day. Average note is 1KB._

- **Reads per second:** 100,000 \* 20 / 86,400 = ~23 reads/sec (Average).
- **Writes per second:** 100,000 \* 2 / 86,400 = ~2.3 writes/sec (Average).
- **Storage per year:** 100,000 _ 2 _ 1KB \* 365 = ~73 GB / year.

## Architecture Diagram

```text
      [ Client / Web Browser ]
               |
           [ DNS ]
               |
    +----------+----------+
    |                     |
[ CDN ]            [ Load Balancer ]
                          |
             +------------+------------+
             |                         |
     [ App Server 1 ]          [ App Server 2 ]
             |                         |
             +------------+------------+
                          |
        +-----------------+-----------------+
        |                 |                 |
    [ Cache ]       [ DB Primary ]    [ Message Queue ]
                          |                 |
                  [ DB Read Replica ]   [ Worker ]
```
````
