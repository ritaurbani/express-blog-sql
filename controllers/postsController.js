const connection = require("../data/db")
const checkPostExists = require("../middleware/checkPostExists")

//Index - get - 
const index = (req, res) => {
    const sql = "SELECT * FROM `posts`";

    connection.query(sql, (err, posts) => {  //qui sono i results
        if (err) {
            return res.status(500).json({
                message: "Errore interno del server"
            })
        } else {
            return res.status(200).json({
                status: "success",
                data: posts,
            })
        }
    })
}
//Far sì che la SHOW restituisca il post comprensivo di tag, recuperandoli grazie alla relazione tra post e tags, esistente sul database

//Show - get
const show = (req, res) => {
    const id = req.params.id 
    const sql = "SELECT * FROM `posts` WHERE id = ? "
    const tagSql = `
    SELECT tags.*
    FROM tags
    JOIN posts
    ON tags.id = posts.id
    WHERE posts.id = 1`
    connection.query(sql, [id], (err, posts) => {
        if(err) {
            return res.status(500).json({
                message: "errore interno del server"
            })
        } else if(posts.length === 0 ) {
          return res.status(404).json({
            message: "Post non trovato"
          })  
        } else {
            //quando mi arriva risultato faccio seconda query
            connection.query(tagSql, [id], (err, tags) => {
                if(err) {
                    return res.status(500).json({
                    message: "Errore interno al server"
                    })
                } 
                //voglio ritornare sia tags che posts
                const postsTags = {
                    ...posts[0],
                    tags: tags,
                }
                
                return res.status(200).json({
                status: "success",
                data: postsTags,
            });
            })
           
        }
    });
};

// const create = (req, res) => {
   
// }

// const update = (req, res) => {
    
// }

// const modify = (req, res) => {
    
// }

//Destroy - delete
const destroy = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM `posts` WHERE id = ?" ;

    connection.query(sql, [id], (err) => {
        if(err) {
            return res.status(500).json({
                message: "errore interno al server"
            })
        } else {
            return res.sendStatus(204);
        }
    }) 
};

module.exports = {
    index,
    show,
    destroy,
}