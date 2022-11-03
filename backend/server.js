const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')

app.use(express.json())
app.use(fileUpload())

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})

app.use("/public", express.static(`${__dirname}/../frontend/public`))

app.post("/upload", (req, res) => {
	console.log(req.body);
	fs.writeFile(`${__dirname}/data/userdata.json`, JSON.stringify(req.body, null, 4), (error) => {
		if(error){
			console.log(error);
			return res.status(500).send(error);
		}else{
			res.status(200).send("OK");

		}
	})
})
app.post("/upload-image", (req, res) => {
	if(!req.files){
		return res.status(400).send("No files were uploaded")
	}
	const picture = req.files.file
	const picName = req.body.fileName

	picture.mv(`${__dirname}/data/${picName}.jpeg`, (error) => {
		if(error){
			console.log(error);
			return res.status(500).send(error)
		}else{
			res.status(200).send("Image OK")
		}
	})
})

/* app.get('/style.css', (req, res) => {
	res.sendFile(path.join(`${__dirname}/../frontend/style.css`))
  })

  app.get('/script.js', (req, res) => {
	res.sendFile(path.join(`${__dirname}/../frontend/script.js`))
  }) */

app.listen(port, () => {
  console.log(`Server is runing at: http://127.0.0.1:${port}`)
});