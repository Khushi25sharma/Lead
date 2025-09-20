const Lead = require('../models/Lead');
const asyncHandler = require('../middleware/async');
const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse');


exports.getLead = asyncHandler(async (req, res, next) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return next(new ErrorResponse(`Lead not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: lead
  });
});

exports.getAllLeads = asyncHandler(async (req, res, next) => {
  const { search, status, startDate, endDate, page = 1, limit = 10 } = req.query;

  let query = {};

  // 🔎 Search by name/email/phone
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } }
    ];
  }

  // 🟢 Filter by status
  if (status) {
    query.status = status;
  }

  // 📅 Filter by date range
  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  // 🔢 Pagination setup
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const skip = (pageNum - 1) * limitNum;

  // 🗂️ Fetch data
  const [leads, total] = await Promise.all([
    Lead.find(query)
      .select('name email phone status source assignedTo createdAt updatedAt')
      .sort("-createdAt")
      .skip(skip)
      .limit(limitNum),
    Lead.countDocuments(query)
  ]);

  res.status(200).json({
    success: true,
    count: leads.length,
    total,                     // total leads matching filter
    page: pageNum,             // current page
    pages: Math.ceil(total / limitNum), // total pages
    data: leads
  });
});

// exports.getAllLeads = asyncHandler(async (req, res, next) => {
//   const leads = await Lead.find().sort('-createdAt');
//   res.status(200).json({ success: true, count: leads.length, data: leads });
// });


exports.createLead = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const existingLead = await Lead.findOne({ email: req.body.email.toLowerCase() });
  if (existingLead) {
    return next(new ErrorResponse('Lead with this email already exists', 409));
  }

  const lead = await Lead.create(req.body);
  res.status(201).json({ success: true, data: lead });
});


exports.updateLead = asyncHandler(async (req, res, next) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!lead) {
    return next(new ErrorResponse(`Lead not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: lead });
});


exports.deleteLead = asyncHandler(async (req, res, next) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    return next(new ErrorResponse(`Lead not found with id ${req.params.id}`, 404));
  }

  await Lead.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, data: {} });
});

