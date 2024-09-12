import perstorp from "./dist/index.js";

const port = 3000;

const app = perstorp();

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
