const getIndex = async (req, res) => {
    try {
        res.render('index', { title: 'Server Homepage'})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getIndex }