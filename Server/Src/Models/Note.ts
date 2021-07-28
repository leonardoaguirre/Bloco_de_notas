import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Length} from "class-validator";
import { User } from "./User";

@Entity("note")
class Note {

    @PrimaryGeneratedColumn('increment')
    id: string;

    @Length(0,255,{message:"Titulo ultrapassa o permitido"})
    @Column({ nullable: false, })
    title: string;

    @Length(0, 65000, { message: "A nota superou o limite estabelecido", })
    @Column({ nullable: false, type: 'text' })
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at : Date;

    @ManyToOne(()=>User , user => user.notes, {cascade : true})
    user : User

}


export { Note };