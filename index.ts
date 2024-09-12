import perstorp from "./dist";

const server = perstorp();

server.listen(3000, () => {
	console.log("Server running on port 3000");
});
