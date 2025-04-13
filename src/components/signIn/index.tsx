import { Link } from "react-router-dom"
import styled from "styled-components"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const signInUserFormSchema = z.object({
    email: z.string().email("Email Inválido").nonempty("Email é obrigatório"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").nonempty("Senha é obrigatória")
})

type signInUserFormData = z.infer<typeof signInUserFormSchema>;

export const SignIn = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(signInUserFormSchema),
        mode: 'onBlur'
    })

    const { signIn } = useContext(AuthContext)

    const onSubmit: SubmitHandler<signInUserFormData> = async (data) => {
        try {
            await signIn(data);
        } catch (error: any) {
            setError("email", {
                type: "manual",
                message: "Invalid email or password",
            });
            setError("password", {
                type: "manual",
                message: "Invalid email or password",
            });
        }
    };

    return (
        <SignInComponent>
            <div className="flexContainer">
                <h1 className="title"><span className="secondary"></span>Login</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="seu@email.com"
                        {...register("email")}
                    />
                    {errors?.email && (
                        <ErrorFormMessage>{errors?.email?.message}</ErrorFormMessage>
                    )}

                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="******"
                        {...register("password")}
                    />
                    {errors?.password && (
                        <ErrorFormMessage>{errors?.password?.message}</ErrorFormMessage>
                    )}
                    <button type="submit" disabled={isSubmitting}><span className="material-symbols-outlined icon">login</span>Entrar</button>
                </form>
                <p className="divisor">ou</p>
                <p className="bottomText">Não tem uma conta? <Link to="/register">Criar conta</Link></p>
            </div>

        </SignInComponent>
    )
}

const SignInComponent = styled.main`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    .flexContainer{
        display: flex;
        max-width: 500px;
        margin: 20px;
        width: 100%;
        flex-direction: column;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
        background: transparent;
        padding: 30px;
        color: black;
        text-align: center;
        border-radius: 10px;
        border-top: 10px solid var(--secondary);
    }
    .flexContainer .title{
        margin: 20px 0;
        display: flex;
        justify-content: center;
        width: 100%;
        font-size: 30px;
    }
    form{
        display: flex;
        flex-direction: column;
    }
    form label{
        margin-top: 15px;
        width: 100%;
        text-align: start;
    }
    form input{
        padding: 10px;
        margin: 5px 0;
        border: 1px solid #ccc;
        outline: none;
        background: transparent;
        color: black;
        border-radius: 5px;
    }
    form button{
        margin: 30px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        border: none;
        gap: 5px;
        font-weight: 700;
        background: var(--secondary);
        border-radius: 5px;
        cursor: pointer;
    }
    .flexContainer .divisor{
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 30px;
    }
    .flexContainer .divisor::before, .flexContainer .divisor::after{
        content: "";
        height: 0;
        width: 50%;
        border: 1px solid #ccc;
    }
    .flexContainer .bottomText{
        font-size: 14px;
    }
    .flexContainer .bottomText a{
        color: var(--secondary);
        font-weight: 700;
    }
`

const ErrorFormMessage = styled.p`
    color: red;
    text-align: start;
    font-size: 12px;
`