const express = require("express");
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require("../Middleware/authMiddleware");

router.post('/create-user', UserController.createUser)
router.post('/register-user', UserController.registerUser)
router.put('/update-user/:id', UserController.updateUser)
router.delete('/delete-user/:id', UserController.deleteUser)
router.get('/get-detail-user/:id', UserController.getDetailUser)
router.get('/get-all-user', UserController.getAllUser)
router.post('/sign-in', UserController.loginUser)
router.post('/refresh-token',  UserController.refreshToken)
router.post('/logout',  UserController.logoutUser)
router.post('/verify-email',  UserController.verifyEmail)
router.post('/update-password',  UserController.updatePassword)



module.exports = router