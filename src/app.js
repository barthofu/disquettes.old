const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


//Main routes

const indexRoute = require('./routes/index')
const apiRoute   = require('./routes/api')
const webRoute   = require('./routes/web')
const adminRoute = require('./routes/admin')

app.use('/admin', adminRoute)
app.use('/', indexRoute)
app.use('/api', apiRoute)
app.use('/web', webRoute)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    console.log(0)
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;