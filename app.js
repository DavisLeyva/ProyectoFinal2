/* jshint esversion:6 */
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const port = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json()); //Recibir JSON
app.use(express.urlencoded({ extended: true })); //Formularios


mongoose.connect('mongodb+srv://grupo_hailpy:1a2b3c4d5e@proyectox.todpx.mongodb.net/Productos?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


////////////MODELOS/////////////////////
const contactoSchema = new mongoose.Schema({
      nombre: String,
      email: String,
  });
  const Contacto = mongoose.model('Contacto', contactoSchema);
///////////////////GLOBAL VARIABLES/////////


///////////////////ROUTES////////////////////

app.get('/', (req, res)=>{
  Contacto.find((err, contactos) =>{
    if (err) {
      console.log(err);
    } else {
      res.render('index', {contacs: contactos});
    }
  });

  
});

app.get('/contactanos', (req, res)=>{
  res.render('contactanos');
});

app.get('/catalogo', (req, res)=>{
  res.render('catalogo');
});

app.post('/contactanos', (req, res)=>{
  const nuevoContacto = new Contacto({
    nombre: req.body.nombre,
    email: req.body.email
  });
  nuevoContacto.save();

  res.redirect('/');
});

//////////////////API REST//////////////////////

app.get('/api/contactos', (req, res) => {
  Contacto.find((err, contactos) => {
    if (err) {
      console.log(err);
    } else {
      res.send(contactos);
    }
  });
});

app.get('/api/contactos/:contacto', (req, res) => {
  Contacto.findOne({nombre:req.params.contacto},(err, contacto) => {
    if (err) {
      console.log(err);
    } else {
      res.send(contacto);
    }
  });
});


app.post('/api/contactos', (req, res) => {

  const nuevoContacto = new Contacto({
    nombre: req.body.nombre,
    email: req.body.email
  });
  nuevoContacto.save();

  res.send('Contacto guardado');
});




////////////////SERVIDOR/////////////////////
app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});
