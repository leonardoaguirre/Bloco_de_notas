import { validate } from "class-validator";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { NoteRepository } from "../Repositories/NoteRepository";

class NoteControl {
    async insert(request: Request, response: Response) {
        const noteRepo = getCustomRepository(NoteRepository);
        const { title, description, idUser } = request.body;

        try {
            const note = noteRepo.create({ title : "Nota vazia", description, user: { id: idUser } });

            await validate(note)
                .then(async err => {
                    if (err.length > 0) { throw err };
                    await noteRepo.save(note).then(res=>{
                        return response.status(200).json({idNote : res.id})
                    });
                    
                })

            
        } catch (error) {
            return response.status(400).json(error)
        }

    }
    async update(request: Request, response: Response) {
        const noteRepo = getCustomRepository(NoteRepository);
        const { idNote, title, description } = request.body;

        try {
            const note = await noteRepo.findOne(idNote);
            if (!note) {
                throw new AppError('Id de nota nao existe', 'id')
            }

            await validate(note)
                .then(async err => {
                    if (err.length > 0) { throw err };
                    await noteRepo.save(note);
                })

            noteRepo.merge(note, { title, description });
            noteRepo.save(note);

            return response.sendStatus(200)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
    async delete(request: Request, response: Response) {
        const noteRepo = getCustomRepository(NoteRepository);
        const { idNote } = request.body

        try {
            await noteRepo.findOne(idNote).then(async res => {
                if (!res) {
                    throw new AppError('Nota nao existe', 'note')
                }
                await noteRepo.delete(res.id);
                return response.sendStatus(200);

            }).catch(err => { throw err })

        } catch (error) {
            return response.status(400).json(error)
        }
    }
    async findById(request: Request, response: Response) {
        const noteRepo = getCustomRepository(NoteRepository);
        const { idUser } = request.params

        try {
            await noteRepo.find({user:{id : idUser}}).then(res=>{
                if(!res){
                    throw new AppError('Notas nao encontradas','notes')
                }
                return response.status(200).json(res);
            })
        } catch (error) {
            
        }
    }
}
export { NoteControl };