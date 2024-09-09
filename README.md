A Typescript compatible file based router for [Node.js](https://nodejs.org/).

Made for sending json and getting json.

## Insallation

```console
$ npm i perstorp
```

## Setup

#### Config

Make sure to create a file named **perstorp.config.json** in the root of your project.

It should look something like this:

```json
{
	"cors": {
		"origin": "*",
		"methods": "GET,POST,PUT,DELETE",
		"headers": "Content-Type,Authorization"
	},
	"routesPath": "/api/v1/routes",
	"logger": true,
	"timeout": 1000,
	"typescript": true
}
```

- cors: You can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
- routesPath: Is the path to the directory where you store your routes
- logger (optional): Defaults to false. Creates pretty logs from the activity on the server.
- timeout (optional): Time limit for a request
- typescript (optional): Needs to be set to true if you're using typescript.

#### Creating a server

```ts
import perstorp from "perstorp";

const PORT = 3000;

const app = perstorp();

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
```

## Routes

In order to create a route you just create a new directory in the directory that you specified in the **perstorp.config.json**.
Create a file called **index.ts** in the new directory.

### Example

/api/v1/routes/hello/index.ts

> #### Get function
>
> The function has to have the name **get**
>
> ```ts
> import type {ReqHandler} from "perstorp";
>
> export const get: ReqHandler({res}) => {
>    res.json({message: "World"})
> }
> ```

> #### Data
>
> To get the data that is sent with the request just use the data parameter in your request handler.
>
> ```ts
> import type {ReqHandler} from "perstorp";
>
> export const post: ReqHandler({res, data}) => {
>   console.log(data) // Outputs json recieved in the request
>   res.json({message: "World"})
> }
> ```

> #### Search parameters
>
> To get the search params for the request just use the params parameter in your request handler
>
> ```ts
> import type {ReqHandler} from "perstorp"
>
> export const post: ReqHandler({res, params}) => {
>   console.log(params) // Outputs search params
>   res.json({message: "World"})
> }
> ```
