import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const start = () => {
	const root = document.getElementById("root");
	root && createRoot(root).render(<App />);
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", start);
} else {
	start();
}
