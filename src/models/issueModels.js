const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: { type: mongoose.Schema.Types.String, ref: 'Book', required: true },
  employeeId: { type: mongoose.Schema.Types.Number, ref: 'Employee', required: true },
  issueDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Issued', 'Returned'], default: 'Issued' },
  flagged: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Issue', issueSchema);
