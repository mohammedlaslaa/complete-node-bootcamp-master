const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// 1) Middleware

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.json());
// access to the static file
app.use(express.static(`${__dirname}/public`))

////

app.use((req, res, next) => {
  console.log('Hello from my own middleware');
  next();
});

app.use((req, res, next) => {
  req.requesTime = new Date().toLocaleDateString();
  next();
});

// 2) Route handler

// const getAllTours = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requesTime,
//     results: tours.length,
//     data: {
//       tours: tours // If they have the same name, you just can write tours once like this {tours}
//     }
//   });
// };

// const getTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find(el => el.id === id);

//   // if(id > tours.length-1){
//   if (!tour) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invalid ID'
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour
//     }
//   });
// };

// const createTour = (req, res) => {
//   //   console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     err => {
//       if (err) {
//         res.status(404);
//         console.log('Error !');
//       }
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tours: newTour
//         }
//       });
//     }
//   );
// };

// const updateTour = (req, res) => {
//   if (req.params.id * 1 > tours.length - 1) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invalid ID'
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<updated tour here...>'
//     }
//   });
// };

// const deleteTour = (req, res) => {
//   if (req.params.id * 1 > tours.length - 1) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invalid ID'
//     });
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// };

// const getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined'
//   });
// };
// const getUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined'
//   });
// };
// const createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined'
//   });
// };
// const updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined'
//   });
// };

// const deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined'
//   });
// };

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// const tourRouter = express.Router();
// const userRouter = express.Router();

// tourRouter
//   .route('/')
//   .get(getAllTours)
//   .post(createTour);
// tourRouter
//   .route('/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

// userRouter
//   .route('/')
//   .get(getAllUsers)
//   .post(createUser);

// userRouter
//   .route('/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);



// 4) START SERVER
// const port = 3000;

// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });


module.exports = app;