import mongoose from 'mongoose';

let settingsSchema = new mongoose.Schema({
  id: Number,
  bill_id: String,
  bill_title: String,
  bill_desc: String,
  vote_favor: String,
  chamber: String,
  created_at: Date,
  senate: {
    impact_text: String,
    no_cosponsor_title: String,
    no_cosponsor_desc: String,
    cosponsor_post_text: String,
    represent: String
  },
  house: {
    impact_text: String,
    single_voted_for: String,
    single_voted_against: String,
  }
});

export default mongoose.model('Settings', settingsSchema);
