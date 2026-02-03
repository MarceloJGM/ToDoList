import { AuthForm } from "@components/index.ts";
import {
    GenericUserCreationError,
    UserAlreadyExistsError,
    ValidationError,
} from "@errors/index.ts";
import { handleRegisterAuthForm } from "@handlers/index.ts";
import { useAuthStore } from "@stores/index.ts";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

const Register = () => {
    const [registerMessage, setRegisterMessage] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [_, navigate] = useLocation();

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const isLoading = useAuthStore((state) => state.isLoading);

    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            navigate("/", { replace: true });
        }
    }, [isLoggedIn, isLoading, navigate]);

    const handleRegister = async (event: React.FormEvent) => {
        try {
            await handleRegisterAuthForm(event);
            setRegisterError("");
            setRegisterMessage("User created!");
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            if (error instanceof ValidationError) {
                setRegisterError(error.message);
                return;
            }

            if (error instanceof UserAlreadyExistsError) {
                setRegisterError(error.message);
                return;
            }

            setRegisterError(new GenericUserCreationError().message);
        }
    };

    return (
        <main className="flex flex-1 p-4">
            <AuthForm method={handleRegister} title="Register" buttonText="Register">
                {registerError && <p className="text-error">{registerError}</p>}
                {registerMessage && <p className="text-success">{registerMessage}</p>}
                <section className="flex flex-wrap justify-center gap-2 text-text-secondary text-center">
                    Do you already have an account?
                    <Link
                        className="text-text-primary border-b-2 border-b-border-light hover:animate-pulse"
                        href="/login"
                    >
                        Login!
                    </Link>
                </section>
            </AuthForm>
        </main>
    );
};

export default Register;
