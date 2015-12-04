import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  created_at: Date,
  id: Number,
  bill_id: String,
  bill_title: String,
  bill_desc: String,
  chamber: String,
  pre_text: String,
  impact_text: String,
  vote_favor: String,
  vote_focus: String,
  voted_for: String,
  voted_against: String
});

export default mongoose.model('Settings', settingsSchema);
