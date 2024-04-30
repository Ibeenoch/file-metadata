import express from 'express'
import cors from 'cors';
import path from 'path';
import multer from 'multer';


const __dirname = path.resolve()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const upload = multer();

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  })

})

const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
