<<<<<<< HEAD
import express from "express"

import protect from "../utils/protect.js";
import { uploadPhoto } from "../controllers/photoController.js";


const photoRoute = express.Router();

photoRoute.post('/product/add/:id',protect, uploadPhoto)



=======
import express from "express"

import protect from "../utils/protect.js";
import { uploadPhoto } from "../controllers/photoController.js";




const photoRoute = express.Router();

photoRoute.post('/product/add/:id',protect, uploadPhoto)



>>>>>>> 9707eb1bfa53cf63d093753fc75f7fd4c2aca5a7
export default photoRoute