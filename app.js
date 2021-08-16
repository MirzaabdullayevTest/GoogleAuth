const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const connectDB = require('./config/db')

const indexRouter = require('./routes/index')

dotenv.config({ path: './config/config.env' })

// Connecting with mongodb
connectDB()

const app = express()

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.urlencoded({ extended: true }))

// Handlebars
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
        //  path to your partials
        path.join(__dirname, 'views/partials'),
    ],
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', indexRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))