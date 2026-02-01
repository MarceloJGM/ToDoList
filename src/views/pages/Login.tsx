import { AuthForm } from "@components/index.ts";
import { GenericLoginError, InvalidCredentialsError } from "@errors/index.ts";
import { handleLoginAuthForm } from "@handlers/index.ts";
import { useAuthStore } from "@stores/index.ts";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

const Login = () => {
    const [loginError, setLoginError] = useState("");
    const [_, navigate] = useLocation();

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const isLoading = useAuthStore((state) => state.isLoading);
    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            navigate("/", { replace: true });
        }
    }, [isLoggedIn, isLoading, navigate]);

    const handleLogin = async (event: React.FormEvent) => {
        try {
            await handleLoginAuthForm(event);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                setLoginError(error.message);
                return;
            }

            setLoginError(new GenericLoginError().message);
        } finally {
            await checkAuth();
        }
    };

    return (
        <main className="flex flex-1 p-4">
            <AuthForm method={handleLogin} title="Login" buttonText="Login">
                {loginError && <p className="text-error">{loginError}</p>}
                <section className="flex gap-2">
                    Don't have an account?
                    <Link
                        className="text-text-primary border-b-2 border-border"
                        href="/register"
                    >
                        Create One!
                    </Link>
                </section>
            </AuthForm>
        </main>
    );
};

export default Login;
