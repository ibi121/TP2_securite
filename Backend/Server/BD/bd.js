/**
 * admin user :
 * totoriono
 * mdp : abc1234
 */

/**
 * Permet d'enregistrer des elements dans une BD
 * 
 * (A faire, rajouter contrainte UNIQUE pour email et lancer erreur si email existe deja pour eviter doublons :o))
 * 
 * @param {*} courriel 
 * @param {*} prenom 
 * @param {*} motDePasse 
 * @param {*} nom 
 */
 function insererElementBD(courriel, prenom, motDePasse, nom){
    pool.connect(function(err) {
        if(err & err!='ER_DUP_ENTRY'){
            throw err;
        }else if (err = 'ER_DUP_ENTRY'){
            console.log("desole ce courriel exitse deja, svp en choisi run autre :o)")
        }
    
        console.log('Je suis dans insertion de data');
    
    let sql = "INSERT INTO utilisateur (courriel, prenom, motDePasse, nom) VALUES ?";
    let utilisateur = [
        [courriel, prenom, motDePasse, nom]
    ];

    pool.query(sql, [utilisateur], function(err, resultat) {
        if(err) {
            throw err;
        } else {
            console.log("it is a sucess " + resultat.affectedRows)
        }
    })
})
}


 function login(courriel, motDePasse){
    pool.connect(function(err){
        if(err){
            throw err;
        }
        console.log('je suis bel et bien dans login')

        let sql = 'SELECT * FROM utilisateur WHERE courriel =? and motDePasse = ?' 
        pool.query(sql, [courriel, motDePasse], function(err, res) {
            if(err){
                throw err;
            }else {
                console.log(res); 
            }
        })

    })
}


module.exports = login;










    








// var conn = mysql.createConnection({
//     database: 'tp2DB',
//     host : 'mysql-tp2db-hamib00a-94d7.aivencloud.com',
//     user : 'avnadmin',
//     password : 'AVNS__oOZQzohcfT6dWK2lhe',
//     port : '13279'
// });

