import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";
import path from "path";
import { getAllFiles } from "./files";  
import { addQueue, uploadFile } from "./aws";
const app = express();
app.use(cors())
app.use(express.json());

// POSTMAN
app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate(); // asd12
    await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`));
    const  files = getAllFiles(path.join(__dirname,`output/${id}`)); 
    files.forEach(async file => {
        await uploadFile(file.slice(__dirname.length + 1), file);
    })
    addQueue(id);

    res.json({
        id: id
    })
});

app.listen(3000);