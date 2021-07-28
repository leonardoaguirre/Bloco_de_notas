import { validate } from "class-validator";
import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { User } from "../Models/User";
import { UserRepository } from "../Repositories/UserRepository";
import { Encrypt } from "../Services/encrypt";

class UserControl {
    async insert(request: Request, response: Response) {
        const userRepo = getCustomRepository(UserRepository);
        const { email, senha } = request.body;
        const encrypt = new Encrypt();
        const erros = new Array<AppError>();

        try {
            await userRepo.findOne({ email: email })
                .then(async res => {
                    if (res) {
                        erros.push(new AppError('Email já cadastrado!', 'email'));
                    }

                    const user = userRepo.create({
                        email,
                        senha
                    })
                    if(user.senha.length<5){
                        erros.push(new AppError('Senha deve conter 5 caracteres no minimo','senha'));
                    }
                        user.senha = await encrypt.execute(senha)

                        if(erros.length>0){throw erros}

                    await validate(user)
                        .then(async res => {
                            if (res.length > 0) { throw res };
                            await userRepo.save(user);
                        })

                    return response.status(200).json({ message: "Usuario cadastrado com sucesso" });
                    
                }).catch(err => { throw err })
        } catch (error) {
            return response.status(400).json(error);
        }
    }
    async login(request: Request, response: Response) {
        const userRepo = getCustomRepository(UserRepository);
        const { email, senha } = request.body;
        const encrypt = new Encrypt();

        try {
            const userExists = await userRepo.findOne({ email: email });

            if (userExists) {
                const res = await encrypt.validate(senha, userExists.senha);
                if (res) {
                    return response.status(200).json({
                        message: "Usuario logado com sucesso!",
                        user: {
                            id: userExists.id,
                            email: userExists.email
                        }
                    });

                } else {
                    throw new AppError("Email ou senha inválidos", "login");
                }
            } else {
                throw new AppError("Email ou senha inválidos", "login");
            }

        } catch (error) {
            return response.status(400).json(error);
        }
    }
}
export { UserControl };