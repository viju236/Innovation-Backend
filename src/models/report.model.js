const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
//const User = require('./user.model');

const reportSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
      reportContent:  { 
        type : String,
        required : true  
      },
      weekDate: {
        type: Date
      }
    },
    {
      timestamps: true,
    }
  );

  const Report = mongoose.model('Report', reportSchema);

module.exports = Report;