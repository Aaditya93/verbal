import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";
import path from "path";
import { getAllFiles } from "./files";  
import { addQueue, uploadFile } from "./aws";
import { addEntry ,deployedCheck} from "./db";
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
    await addQueue(id);
    await addEntry(id, true, (err:any, result:any) => {
        if (err) {
          console.error('Error adding entry:', err);
        } else {
          console.log('Entry added successfully.');
        }
      });


    res.json({
        id: id
    })
});

app.get("/status", async (req, res) => {
  const id = req.query.id as string; // Assuming id is sent as a query parameter
  await deployedCheck(id ).then((result) =>{
    console.log(result);
    
      res.json({
        id: id,
        status: result
      });
    }


)});

app.listen(3000);