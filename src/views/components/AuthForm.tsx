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
			className="flex flex-col items-center w-container-modal-responsive p-4 gap-4 bg-background max-w-125 mx-auto rounded-md shadow-white/30 shadow-xs"
			onSubmit={method}
		>
			<h2 className="text-h2-responsive text-text-primary">{title}</h2>
			<label className="flex flex-col gap-1 text-text-secondary w-full">
				Username
				<input
					className="border border-black bg-white p-1 rounded-xl outline outline-black/90 border-none"
					type="text"
					name="username"
					minLength={4}
					required
				/>
			</label>
			<label className="flex flex-col gap-1 text-text-secondary w-full">
				Password
				<input
					className="border border-black bg-white p-1 rounded-xl outline outline-black/90 border-none"
					type="password"
					name="password"
					minLength={6}
					required
				/>
			</label>

			<Button
				className="bg-primary w-full text-text-primary rounded-xl p-1 m-2"
				type="submit"
				text={buttonText}
			/>
			{children}
		</form>
	);
};
