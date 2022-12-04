const express   =   require('express');
const app       =   express();
const cors      =   require('cors');
require('dotenv').config();
const multer = require("multer");



const upload = multer({ dest: 'uploads/' })


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});



app.post('/api/upload',upload.array("upfile"),(req,res)=>{
    let file    =   req.files[0];
    let result  =   {
        name    :   file.originalname,
        type    :   file.originalname.split('.')[1],
        size    :   file.size
    }
    res.json(result);
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});