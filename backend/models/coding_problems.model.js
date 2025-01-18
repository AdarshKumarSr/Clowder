// This is models for the type 2 (Coding Problems)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodingProblemSchema = new Schema({
  problem_no: { type: Number, required: true },
  problem_statement: { type: String, required: true },
  boiler_code: {type: String, required: true},
  output: { type: Schema.Types.Mixed, required: true }, // Using Mixed type for flexibility
  difficulty_level: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
  related_to: { type: String, required: true } // Reference to the related lesson
});

const TestCaseSchema = new Schema({
  problem_no: { type: Number, required: true },
  input: { type: String, required: true }, 
  expected_output: { type: Schema.Types.Mixed, required: true }
});

module.exports = { CodingProblem: mongoose.model('CodingProblem', CodingProblemSchema), 
  TestCase: mongoose.model('TestCase', TestCaseSchema) };