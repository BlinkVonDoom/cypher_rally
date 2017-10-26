const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const keys = require('./config/keys');
require('./models/Character');
require('./models/CharacterSkills');
require('./models/Esoteries');
require('./models/User');

const auth = require('./routes/auth');
const index = require('./routes/index');
const characters = require('./routes/characters');
const esoteries = require('./routes/esoteries');
const characterSkills = require('./routes/characterSkills');

mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI, {
    useMongoClient: true
  })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

require('./config/passport')(passport);
const {
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon
} = require('./helpers/hbs');
const app = express();
const io = require('socket.io');
app.set('view engine', 'handlebars');

app.engine(
  'handlebars',
  exphbs({
    helpers: {
      truncate,
      stripTags,
      formatDate,
      select,
      editIcon
    },
    defaultLayout: 'main'
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);
app.use('/characters', characters);
app.use('/esoteries', esoteries);
app.use('/characterSkills', characterSkills);

const port = process.env.PORT || 3000;
io.listen(process.env.PORT);
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
