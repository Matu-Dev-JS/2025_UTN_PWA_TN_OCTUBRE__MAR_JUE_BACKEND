import express from 'express'
import WorkspacesRepository from '../repositories/workspace.repository.js'
import { validarId } from '../utils/validations.utils.js'
import { ServerError } from '../utils/customError.utils.js'
import WorkspaceController from '../controllers/workspace.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

//Manejar consultas referidas a workspace

const workspace_router = express.Router()


workspace_router.get('/', authMiddleware, WorkspaceController.getAll )


workspace_router.get('/:workspace_id', authMiddleware, WorkspaceController.getById )

//Crear el WorkspaceController con los metodos .post, .getById, getAll

//Este es el endpoint para crear workspaces
workspace_router.post('/', authMiddleware, WorkspaceController.post)




export default workspace_router