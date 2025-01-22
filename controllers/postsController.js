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

//Show - get
const show = (req, res) => {
    const id = req.params.id 
    const sql = "SELECT * FROM `posts` WHERE id = ? "
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
            return res.status(200).json({
                status: "success",
                data: posts[0],
            });
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