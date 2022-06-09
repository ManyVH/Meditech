const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var cors = require('cors')
const PORT = process.env.PORT || 3050;


const app = express();

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medico'
});


connection.connect(err =>{
    if (err) throw err;
    console.log('Database server Running');
})

app.listen(PORT, ()=>{
    console.log('Server running');
})


app.post('/nuevouser', (req, res)=>{
    const sql = 'insert into usuarios set ?'
    const usuario ={
        nombre: req.body.nombre,
        sexo: req.body.sexo,
        usuario: req.body.usuario,
        contraseña: req.body.contraseña,
        correo: req.body.correo,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        tipo: req.body.tipo
    }

    connection.query(sql, usuario, err =>{
        if(err) throw err;
        res.send('Usuario insertado')
    })
})

app.post('/nuevopaciente', (req, res)=>{
    const sql = 'insert into paciente set ?'
    const paciente ={
        idDoctor: req.body.idDoctor,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        nss: req.body.nss,
        sexo: req.body.sexo,
        edad: req.body.edad,
        fechaRegistro: req.body.fechaRegistro,
        fechaNacimiento: req.body.fechaNacimiento,
        nacionalidad: req.body.nacionalidad,
        religion: req.body.religion,
        telefono: req.body.telefono,
        domicilio: req.body.domicilio,
        correo: req.body.correo,
        contactoEmergencia: req.body.contactoEmergencia
    }

    connection.query(sql, paciente, err =>{
        if(err) throw err;
        res.send('Paciente insertado')
    })
})

app.get('/usuarios/:usuario' , (req, res)=>{
    const { usuario } = req.params;
    const sql = `select * from usuarios where usuario ='${usuario}'`
    connection.query(sql, (err, resultados)=>{
        if(err) throw err;
        if (resultados.length>0) {
            res.json(resultados)
            
        }else{
            res.send('No hay resultados')
        }
    })
})