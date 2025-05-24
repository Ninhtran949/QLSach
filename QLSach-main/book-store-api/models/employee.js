const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true
    },
    employeeDOB: {
        type: Date,
        required: true
    },
    employeeAddress: {
        type: String,
        required: true
    },
    employeePhone: {
        type: String,
        required: true
    },
    employeePosition: {
        type: String,
        required: true
    },
    employeeGender: {
        type: String,
        required: true
    },
    employeeImage: {
        type: String  // Đây có thể là URL của ảnh nếu lưu trên dịch vụ lưu trữ như Cloudinary
    }
});

module.exports = mongoose.model('employee', employeeSchema);
