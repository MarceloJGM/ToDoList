import { AuthForm } from "@components/index.ts";
import axios from "axios";
import { Link, useLocation } from "wouter";

const Register = () => {
	const handleRegister = (event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		const username = formData.get("username");
		const pwd = formData.get("password");

		const url = new URL("/api/users/register", location.origin);
		axios
			.post(url.href, { username, pwd })
			.then((req) => req)
			.then((data) => console.log(data.data))
			.catch((err) => console.log(err.response.data.message));
	};

	return (
		<main className="flex flex-1 p-4">
			<AuthForm method={handleRegister} title="Register" buttonText="Register">
				<section className="flex gap-2">
					Do you already have an account?
					<Link
						className="text-text-primary border-b-2 border-border"
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
