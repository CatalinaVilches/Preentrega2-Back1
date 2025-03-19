import express from 'express';
import { engine } from 'express-handlebars';
import initSocket from './dao/socket.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRoutes.js';
import realTimeProducts from './routes/realTimeProducts.js';
import home from './routes/home.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/realtimeproducts', realTimeProducts);
app.use('/', home);

app.get('/', (req, res) => {
  res.send('Todo ok');
});

const server = app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});


initSocket(server);