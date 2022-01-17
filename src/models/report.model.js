const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const reportSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
      reportContent:  { 
        type : Array,
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