import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Length, IsEmail } from "class-validator";
import { Note } from "./Note";

@Entity("user")
class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Length(10, 100, { message: "O email deve ter entre 10 e 100 caracteres" })
  @IsEmail({}, { message: "Email invalido!" })
  @Column({ nullable: false, length: 100, unique: true })
  email: string;

  @Length(60, 60, { message: "Hash de senha não está do tamanho correto" })
  @Column({ nullable: false })
  senha: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(()=>Note ,note => note.user)
  notes : Note[];

}


export { User };