import { IconClipboard } from "@tabler/icons-react";

export const Header = () => {
	return (
		<header className="p-2 bg-background">
			<section className="flex items-center gap-2 text-text-primary select-none">
				<IconClipboard size={28} color="#94a3b8" />
				<h2 className="text-h2-responsive">To-Do List App</h2>
			</section>
		</header>
	);
};
