
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/users");

app.use("/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});