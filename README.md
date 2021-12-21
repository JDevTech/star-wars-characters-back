
# Star Wars API

This is a Node JS REST API project which has been built using Express JS. This API is a integration with the original service https://swapi.py4e.com.

To run this project, you should run the following commands first.

```
  $ npm install
  $ npm run dev
```

## API Reference

#### Get all characters

```
  GET /api/characters
  GET /api/characters?page=1
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `string` | **Optional**. Page number from pagination handler |

#### Get character

```
  GET /api/characters/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of character to fetch |

#### Get specie

```
  GET /api/species/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of specie to fetch |
