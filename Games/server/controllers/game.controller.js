const mongoose = require('mongoose')
const GameInfo = require('../models/game.model.js')

const getGames = async (req, res) => {
    try {
        const gamesInfo = await (await GameInfo.find()).reverse()
        res.status(200).json(gamesInfo)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getGame = async (req, res) => {
    const { id } = req.params
    try {
        const gamesInfo = await (await GameInfo.find(id))
        res.status(200).json(gamesInfo)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createGame = async (req, res) => {
    const { title, developer, publisher, tags, year } = req.body
    const newGame = new GameInfo({ title, developer, publisher, tags, year })

    try {
        await newGame.save()
        res.status(201).json(newGame)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const updateGame = async (req, res) => {
    const { id } = req.params
    const { title, developer, publisher, tags, year } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No game with ID: ${id}`)
    const updatedGame = { title, developer, publisher, tags, year, _id: id }

    await GameInfo.findByIdAndUpdate(id, updatedGame, { new: true })
    res.json(updatedGame)
}

const deleteGame = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No game with ID: ${id}`)
    await GameInfo.findByIdAndRemove(id)
    return res.json({ message: 'Game deleted succesfully!' })
}

module.exports = { getGames, getGame, createGame, updateGame, deleteGame }