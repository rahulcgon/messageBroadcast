# Message Broadcaster

A Node.js application to populate a MongoDB database with JSON and CSV data.

## Endpoints

### `/populate [GET]`

- **Fetches**:
  - JSON from `https://jsonplaceholder.typicode.com/comments`
  - CSV from `http://cfte.mbwebportal.com/deepak/csvdata.csv`
  - (Optional) Large CSV from `http://cfte.mbwebportal.com/deepak/bigcsvdata.csv`

**Request**:

```http
GET http://localhost:3000/populate
```

## `/search [POST]`

**Description**: Searches the database based on parameters such as `name`, `email`, and `body`. Supports `limit` and `sort` parameters.

**Request URL**:

```http
POST http://localhost:3000/search
```
## Postman Collection

To test the API endpoints, use the provided Postman collection. It includes pre-configured requests for easy interaction with the API.

**Import the Postman Collection**:

1. **Download** the Postman collection from:
   [Postman Collection](https://documenter.getpostman.com/view/24595384/2sAXqndiqX)

2. **Open Postman** and click on the "Import" button.

3. **Upload** the downloaded collection file or paste the link in the "Import" dialog.

4. **Use** the collection to explore and test the API endpoints.

## Notes

- **Duplicate Data**: The `/populate` endpoint does not check for duplicate entries.
- **Error Handling**: Ensure MongoDB is running. Check the server logs for any errors during data operations.

