
// const http = require ('http');

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const app = express();

const redis = require('redis');
const rateLimit = require('express-rate-limit');


// const server = http.createServer((req, res) => {
// })
const pool = mysql.createConnection({
    multipleStatements: true,
    database: 'tp2_securite',
    host : 'mysql-9cbad24-aicogz-c918.aivencloud.com',
    user : 'avnadmin',
    password : 'AVNS_l9BFY9aKOuA57CqTls3',
    port : '22400'
})
app.use(express.json());

app.use(
    cors({
        origin:["http://localhost:3000"],
        method: ["GET", "POST", "DELETE"],
        credentials: true,    
    })
)
app.use(cookieParser());

app.use(
    session({
        key: "utilisateurId",
        resave : false,
        secret: "user",
        saveUninitialized: false,
        cookie : {
            // expires: 60 * 60 * 12
        },
    })
);


let server = app.listen(3069, () => {
    console.log("i am running?" + server.address().port)
})

app.get("/login", (req, res) =>{

    if(req.session.user){
        res.send({ loggedIn : true, utilisateur : req.session.user});
    }else {
        res.send({loggedIn: false});
    }
})

app.post('/login', (req, res) => {
    const courriel = req.body.courriel;
    const motDePasse = req.body.motDePasse;

    pool.connect(function(err){
        if(err){ 
            throw err;
        }
        console.log('je suis bel et bien dans login')

        let sql = 'SELECT * FROM utilisateur WHERE courriel =?' 
        pool.query(sql, [courriel], function(error, resultat) {
            if(error){
                throw error;
            }

            console.log(resultat)
        
            if(resultat.length > 0) {
                bcrypt.compare(motDePasse, resultat[0].motDePasse, (error, response) => {
                    if(response){
                        req.session.user = resultat;
                        console.log(req.session.user);
                        res.send(resultat);
                    }else {
                        res.send({message : "mauvais courriel ou mot de passe!"})
                    }
                });
            }else {
                res.send({message : "l'utilisateur n'existe pas, aller vous inscrire! :o)"})
            }
        })

    });
});



/**
 * handle duplicate error, try ctahc.. do if theres time left.
 */
app.post('/inscription', (req, res) => {

    const courriel = req.body.courriel;
    const prenom = req.body.prenom;
    const motDePasse = req.body.motDePasse;
    const nom = req.body.nom;

    bcrypt.hash(motDePasse, saltRounds, (err, hashedPwd) => {
        if(err){

            console.log(err);
        }
    
        let sql = "INSERT INTO utilisateur (courriel, prenom, motDePasse, nom) VALUES ?";

        let utilisateur = [
            [courriel, prenom, hashedPwd, nom]
        ];
        pool.query(sql, [utilisateur], (err, resultat) => {
            if(err) {
                if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
                    console.log("oh oh");
                    res.send({error: "Attention, un utilisateur utilise deja "})
                } else{
                throw err;
                }
            } else {
                console.log("it is a sucess " + resultat.affectedRows)
                res.send({message: "success"});
            }
        });
    });
});

app.get('/deconnection', (req, res) => {
    if(req.session.user){
        console.log("deconnection reussi");
        req.session.user = null;
        res.send({loggedIn: false, utilisateur: null});
    }
});

app.post('/enregistrementEvent', (req, res) => {
    const nom = req.body.nom;
    const date = req.body.date;
    const idUtilisateur = req.session.user[0].id;
    
    let sql = "INSERT INTO evenement (title, start, utilisateurId) VALUES ?";
    let evenement = [
        [nom, date, idUtilisateur]
    ];
    pool.query(sql, [evenement], (err, resultat) => {
        if(err) {
            throw err;
        } else {
            console.log("evenement inséré! " + resultat.affectedRows)
        }
    })
})

app.delete('/supprimerEvent', (req, res) => {
    const nom = req.body.nom;
    const date = req.body.date;
    const idUtilisateur = req.session.user[0].id;

    let sql="DELETE FROM evenement WHERE title= ? AND start = ? AND utilisateurId = ?"
    pool.query(sql, [nom, date, idUtilisateur], (err, resultat) => {
        if(err) {
            throw err;
        } else {
            console.log("evenement desinséré! " + resultat.affectedRows)
            res.send({message: "Suppression!"})
        }
    })
});

app.get('/getEvents', (req, res) => {
    const idUtilisateur = req.session.user[0].id;
    
    let sql = "SELECT * FROM evenement WHERE utilisateurId = ?";
    
    pool.query(sql, idUtilisateur, (err, resultat) => {
        if(err) {
            throw err;
        } else {
            res.send(resultat);
        }
    })
})


