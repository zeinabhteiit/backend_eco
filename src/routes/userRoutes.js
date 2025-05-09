import express from 'express';
import {
    getUsers,
    deleteUser,
    updateUser,
    addUser
} from '../controllers/userController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only super admins can access these admin-related routes
// router.get('/', verifyToken, checkRole(['super_admin','admin' ]), getUsers);
// router.post('/', verifyToken, checkRole(['super_admin']), addUser);
// router.put('/:id', verifyToken, checkRole(['super_admin']), updateUser);
// router.delete('/:id', verifyToken, checkRole(['super_admin']), deleteUser);

router.get('/', verifyToken, checkRole(['super_admin', 'admin', 'user']), getUsers);
router.post('/', verifyToken, checkRole(['super_admin', 'admin', 'user']), addUser);
router.put('/:id', verifyToken, checkRole(['super_admin', 'admin', 'user']), updateUser);
router.delete('/:id', verifyToken, checkRole(['super_admin', 'admin', 'user']), deleteUser);

export default router;



