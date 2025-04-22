import express from 'express';
import { userAuthenticate } from '../middleware/auth.middleware.js';
import { findPokemon } from '../controllers/gemini.controller.js';

const geminiRouter = express.Router();

geminiRouter.post('/find-pokemon',userAuthenticate ,findPokemon); 


export default geminiRouter;














