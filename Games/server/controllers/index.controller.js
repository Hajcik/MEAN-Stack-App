const getLoginPage = async (req, res) => {
    try {
        res.render('login', {title: 'Login'})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getRegisterPage = async (req, res) => {
    try {
        res.render('register', { title: 'Register' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getIndex = async (req, res) => {
    try {
        res.render('index', { title: 'Server Homepage'})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getCurrentTime = async (req, res) => {
    try {
        const today = new Date()
        let h = today.getHours()
        let m = today.getMinutes()
        let s = today.getSeconds()

        m = checkTime(m)
        s = checkTime(s)

        document.getElementById('clock').innerHTML = `${h}:${m}:${s}`
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

function checkTime(i) {
    if (i < 10) { i = "0" + i}
    return i;
}

module.exports = { getIndex, getCurrentTime, checkTime, getLoginPage, getRegisterPage }