const express = require("express");
//const session = require('express-session');
const pool = require("../../database");
var router = express.Router();


function generarCodigo() {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let Cod = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        Cod += characters.charAt(Math.floor(Math.random() * charactersLength));

    }

    return Cod;

}
async function comprobarCodigo(codigo) {
    let respuesta;
    let consultacod = await pool.query("SELECT cod_grp FROM mgrupo WHERE cod_grp=?", [codigo]);
    if (consultacod.length == 0) {
        respuesta = true;
    } else {
        respuesta = false;

    }
    return respuesta;
}
router.get("/misgrupos", (req, res) => {
    res.render("consultarGrupos");
    
});
router.get("/nuevogrupo", (req, res) => {


    res.render("ingresar-crearGrupo",{error:""});
});
router.post("/ingresargrupo", async (req, res) => {
//en id_usuario se debe de igualar al id que se pasara mediante las sesiones
try {
    const id_usuario=1;
    const { codigo } = req.body;
    const id_grupo = await pool.query(
        "SELECT id_grp FROM mgrupo WHERE cod_grp = ?", [codigo]
    );
    const grupo=id_grupo[0].id_grp;
    await pool.query("INSERT INTO egrupo (id_usu, id_grp, id_priv) VALUES (?,?,?)",[id_usuario,grupo,2]);
    //"INSERT INTO egrupo (id_usu, id_grp, id_priv) VALUES (?,?,?)"
    res.redirect("/misgrupos");
} catch (error) {
    res.render("ingresar-crearGrupo",{error:"No se encontro el codigo de grupo"});
}
    
});

router.post("/nuevogrupo", async (req, res) => {
    do {
        const { nombreGrupo } = req.body;


        let codigo = generarCodigo();

        if (await comprobarCodigo(codigo) == true) {
            var confirmacion = true;
            let Arraycodigo = [
                nombreGrupo,
                codigo
            ];
            try {
                console.log(codigo);
                await pool.query("INSERT INTO mgrupo (nom_grp ,cod_grp) VALUES (?,?)", Arraycodigo);

                res.redirect("/misgrupos");
            } catch (err) {
                console.log(err);
                res.redirect("/error");
            }
            confirmacion == true;
        } else {
            res.redirect("/error");
            console.log("ya existe ese codigo o no se genero el codigo de manera correcta")
        }
    } while (confirmacion == false) {
console.log("Se asigno codigo de manera correcta")
    }


});
module.exports = router;