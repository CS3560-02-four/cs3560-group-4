import express from "express";
import pg from "pg";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "inventory_rental",
    password: "udemy",
    port: 5432
});
await db.connect();

app.post("/", async (req, res) => {
    const query = req.body.query;
    const result = await db.query(query);
    res.send(result.rows);
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const dbResponse = await db.query("SELECT password, account_id FROM account WHERE username = $1", [username]);

    if (dbResponse.rows[0].password === password)
        res.json({
            accountId: dbResponse.rows[0].account_id
        })
    else
        res.json({
            error: "Failed to authenticate user."
        })
});

app.listen(8000, () => {
    console.log("Mock backend listening on port 8000.");
});