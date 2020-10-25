const movies = require("../models/movies.json")
const fs = require("fs")

const getAllMovies = (req, res) => {
    console.log("Minha query string:")
    console.log(req.query)
    const genre = req.query.genre 
    if (genre) { 
        const moviesByGenre = movies.filter(movie => movie.genre.includes(genre)) 
        res.status(200).send(moviesByGenre) 
        res.status(200).send(movies)
    }
}

const createMovie = (req, res) => {
    const { id, name, genre, synopsis, watched } = req.body
    movies.push({ id, name, genre, synopsis, watched }) 
    fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Filme inserido com sucesso!")
            const movieFound = movies.find(movie => movie.id == id) 
            res.status(200).send(movieFound)
        }
    })
}

const getMovie = (req, res) => {
    const movieId = req.params.id
    const movieFound = movies.find(movie => movie.id == movieId)

    if (movieFound) {
        res.status(200).send(movieFound)
    } else {
        res.status(404).send({ message: "Filme não encontrado" })
    }
}

const updateMovie = (req, res) => {
    const movieId = req.params.id
    const movieToUpdate = req.body

    const movieFound = movies.find(movie => movie.id == movieId) 
    const movieIndex = movies.indexOf(movieFound) 

    if (movieIndex >= 0) { 
        movies.splice(movieIndex, 1, movieToUpdate) 
        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err }) 
            } else {
                console.log("Arquivo atualizado com sucesso!")
                const movieUpdated = movies.find(movie => movie.id == movieId)
                res.status(200).send(movieUpdated)
            }
        })
    } else {
        res.status(404).send({ message: "Filme não encontrado para atualização" })
    }
}

const updateWatchedStatus = (req, res) => {
    try {
        const movieId = req.params.id
        const newWatched = req.body.watched 

        const movieToUpdate = movies.find(movie => movie.id == movieId) 
        const movieIndex = movies.indexOf(movieToUpdate)

        if (movieIndex >= 0) {
            movieToUpdate.watched = newWatched 
            movies.splice(movieIndex, 1, movieToUpdate) 
            fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const movieUpdated = movies.find(movie => movie.id == movieId)
                    res.status(200).send(movieUpdated)
                }
            })
        } else {
            res.status(400).send({ message: "Filme não encontrado para atualização" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Erro na api")
    }

}

const deleteMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const moviesFound = movies.filter(movie => movie.id == movieId) 

        if (moviesFound && moviesFound.length > 0) {
            moviesFound.forEach(movie => { 
                const movieIndex = movies.indexOf(movie)
                movies.splice(movieIndex, 1)
            })

            fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Filme excluído com sucesso!")
                    res.sendStatus(204) 
                }
            })

        } else {
            res.status(400).send({ message: "Filme não encontrado" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Erro ao excluir o filme" })
    }
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovie,
    updateMovie,
    updateWatchedStatus,
    deleteMovie
}