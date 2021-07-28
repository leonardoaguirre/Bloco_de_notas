import { EntityRepository, Repository } from "typeorm";
import { Note } from "../Models/Note";

@EntityRepository(Note)
class NoteRepository extends Repository<Note>{

}
export { NoteRepository };