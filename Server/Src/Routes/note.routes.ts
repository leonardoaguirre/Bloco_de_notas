import { Router } from "express";
import { NoteControl } from "../Controllers/NoteControl";

const noteRoutes = Router();
const noteControl = new NoteControl();

noteRoutes.post('/Insert',noteControl.insert);
noteRoutes.patch('/Update',noteControl.update);
noteRoutes.delete('/Delete',noteControl.delete);
noteRoutes.get('/ListById/:idUser',noteControl.findById);



export {noteRoutes};