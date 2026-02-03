import { Link } from "wouter";

const NotFound = () => {
	return (
		<main className="m-auto flex flex-col items-center text-center gap-2 text-text-primary animate-in fade-in-25 duration-500">
			<title>Not Found Page</title>
			<div className="tracking-widest">
				<h1 className="text-h1-responsive">404</h1>
				<span>Not Found Page</span>
			</div>

			<Link
				href="/"
				className="bg-btn-primary hover:bg-btn-primary-hover w-full text-text-primary rounded-xl p-1 m-2 transition-all duration-300 tracking-widest"
			>
				Go to Home
			</Link>
		</main>
	);
};

export default NotFound;

