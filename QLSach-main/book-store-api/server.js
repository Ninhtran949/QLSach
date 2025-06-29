const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const http = require('http');
const socketIo = require('socket.io');

// Khởi tạo Express và HTTP server
const app = express();
const server = http.createServer(app);

// Khởi tạo Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*", // Cho phép tất cả các nguồn gốc (origin) truy cập
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] // Thêm các phương thức khác nếu cần
  }
});

// Kết nối MongoDB Atlas
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);
const employeesRouter = require('./routes/employees');
app.use('/employees', employeesRouter);
const billsRouter = require('./routes/bills')(io); // Truyền io vào billsRouter
app.use('/bills', billsRouter);
const partnersRouter = require('./routes/partners');
app.use('/partners', partnersRouter);
const productTopRouter = require('./routes/productTop');
app.use('/productTop', productTopRouter);
const userRouter = require('./routes/user'); 
app.use('/user', userRouter); 
const cartRouter = require('./routes/cart')(io); // Truyền io vào router
app.use('/cart', cartRouter);


// Import và thiết lập WebSocket chat
const setupWebSocket = require('./chat');
setupWebSocket(server);

// Khi có kết nối từ client
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Lắng nghe sự kiện từ client
  socket.on('message', (msg) => {
    console.log('Received message:', msg);

    // Phát sự kiện đến tất cả client
    io.emit('message', msg);
  });

  // Khi client ngắt kết nối
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Khởi chạy server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://192.168.0.11:${PORT}`);
});

// Xuất io để sử dụng trong các router nếu cần
module.exports = io;