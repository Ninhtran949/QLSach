const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// POST: Thêm nhân viên
router.post('/', async (req, res) => {
    const employee = new Employee({
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        employeeDOB: req.body.employeeDOB,
        employeeAddress: req.body.employeeAddress,
        employeePhone: req.body.employeePhone,
        employeePosition: req.body.employeePosition,
        employeeGender: req.body.employeeGender,
        employeeImage: req.body.employeeImage  // Bạn có thể lưu URL ảnh ở đây nếu có
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);  // Trả về thông tin nhân viên mới đã thêm
    } catch (error) {
        res.status(400).json({ message: error.message });  // Xử lý lỗi
    }
});

// GET: Lấy danh sách nhân viên
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Xóa nhân viên theo ID
router.delete('/:employeeId', async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const result = await Employee.deleteOne({ employeeId: employeeId });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Xóa nhân viên thành công!' });
        } else {
            res.status(404).json({ message: 'Nhân viên không tồn tại!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
