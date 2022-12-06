const express = require('express')
// multer
const multer  = require('multer')

// destino donde se guardan los archivos en caso de almacenarlos en el servidor
const upload = multer({ dest: 'uploads/' })
// opcion para en lugar de almacenarlo en el servidor lo colocamos en memoria.
const uploadMem = multer({ storage: multer.memoryStorage() })

// agregamos este modulo interno de nodejs para tratamiento de archivos utilizando la opcion del almacenado del archivo en memoria
const fs = require('fs')



const app = express()
const port = 3000

// middelware generales
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// entre medio de la ruta y el callback se agrega el middelware de multer para el tratamiento del archivo
// single para un archivo, con upload.array('photos', 12) utilizamos para varios archivos
app.post('/image', upload.single('image'), (req, res) => {

  console.log(req.body);
  console.log(req.file);

  res.send('Got a POST request')
})

// entre medio de la ruta y el callback se agrega el middelware de multer para el tratamiento del archivo
// en este caso tomamos la imagen almacenada en memoria y con fs generamos un archivo que almacenamos como uploads/fileIn.jpg
app.post('/imageMem', uploadMem.single('image'), (req, res) => {

  console.log(req.file.buffer);

  // colocamos en la carpeta upload el archivo fileIn.jpg con el contenido en memoria
  fs.writeFileSync('uploads/fileIn.jpg', req.file.buffer)


  res.send('Got a POST request desde imageMem')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
