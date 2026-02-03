import { Button } from "@components/index.ts";
import type { ReactNode } from "react";

interface AuthFormProps {
    method: (event: React.FormEvent) => void;
    title: string;
    buttonText: string;
    children: ReactNode;
}

export const AuthForm = ({
    method,
    title,
    buttonText,
    children,
}: AuthFormProps) => {
    return (
        <form
            className="flex min-w-65 w-85 flex-col items-center w-container-modal-responsive p-4 gap-4 bg-surface border-2 border-border max-w-125 mx-auto rounded-2xl m-auto"
            onSubmit={method}
        >
            <h2 className="text-h2-responsive text-text-primary">{title}</h2>
            <section className="flex flex-col content-between justify-center gap-4 w-full">
                <label className="flex flex-col gap-1 text-text-secondary w-full">
                    <span className="text-text-primary">Username</span>
                    <input
                        className="p-2 rounded-xl outline-2 outline-border focus:outline-2 focus:outline-border-focus text-text-primary transition-all duration-300 bg-body-alt hover:outline-border-focus"
                        type="text"
                        name="username"
                        minLength={4}
                        required
                    />
                </label>
                <label className="flex flex-col gap-1 text-text-secondary w-full">
                    <span className="text-text-primary">Password</span>
                    <input
                        className="p-2 rounded-xl outline-2 outline-border focus:outline-2 focus:outline-border-focus text-text-primary transition-colors duration-300 bg-body-alt hover:outline-border-focus"
                        type="password"
                        name="password"
                        minLength={6}
                        required
                    />
                </label>
            </section>
            <Button
                className="bg-btn-primary hover:bg-btn-primary-hover w-full text-text-primary rounded-xl p-1 m-2 transition-all duration-300"
                type="submit"
                text={buttonText}
            />
            {children}
        </form>
    );
};
