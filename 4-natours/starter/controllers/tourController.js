const Tour = require('./../models/tourModels');

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    //BUILD QUERY

    // 1) filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    // 2) Advanced filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr  = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    const query = Tour.find(JSON.parse(queryStr));

    // EXECUTE QUERY
    const tours = await query;

    // const query = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    // SEND QUERY
    res.status(200).json({
      status: 'success',
      requestedAt: req.requesTime,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail !',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findById ====>> Tour.findOne({_id: req.parms.id})
    res.status(200).json({
      status: 'success',
      requestedAt: req.requesTime,
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail !',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save(); it's fine but there is a better way to do this

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail !',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail !',
      message: err
    });
  }
};
