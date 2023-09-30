
# Student's-Information-Mangement-System
## (REST API made with the help of Expressjs & Appwrite Database)

## Prerequisite
- Appwrite Account

## API Reference

#### Get all student's information

```http
  GET /getallstudentsinfo
```
Returns the information of all students.


#### Get student's information from roll no

```http
  GET /getstudentinfobyrollno?roll_no
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `roll_no`      | `string` | **Required**. Roll No of student.|

#### Get student's information from name

```http
  GET /getstudentinfobyname?name
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of student.|

#### Get student's information from class
```http
  GET /getstudentinfobyclass?class
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `class`      | `string` | **Required**. Class of student.|

#### Save student's information
```http
  POST /savestudentinfo
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `roll_no`      | `string` | **Required**. Roll No of student.|
| `name`| `string` | **Required**. Name of student.|
| `class`| `string` | **Required**. Class of student.|

#### Update student's information by roll no
```http
  PATCH /updatestudntinfo?roll_no
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `roll_no`      | `string` | **Required**. Roll No of student.|
| `name`| `string` | **Required**. Name of student.|
| `class`| `string` | **Required**. Class of student.|

#### Delete student info by roll no
```http
  DELETE /deletestudntinfo?roll_no
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `roll_no`      | `string` | **Required**. Roll No of student.|

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PROJECT_ID`

`DATABASE_ID`

`COLLECTION_ID`

`ENDPOINT`


## Feedback

If you have any feedback, please reach out to us at vikramsamak02@gmail.com


## Authors

- [@vikramsamak](https://www.github.com/vikramsamak)

