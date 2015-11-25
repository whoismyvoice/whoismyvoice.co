import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  id: Number,
  bill_id: String,
  bill_title: String,
  bill_desc: String,
  chamber: String,
  vote_favor: String,
  created_at: Date,
  impact_text: String,
  pre_text: String,
  voted_for: String,
  voted_against: String
});

export default mongoose.model('Settings', settingsSchema);
