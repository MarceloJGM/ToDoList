import { IconLoader } from "@tabler/icons-react";

export const Loader = () => (
	<div className="flex items-center m-auto text-text-primary">
		<IconLoader className="animate-spin" size={32} />
		<h2 className="text-h2-responsive">Loading...</h2>
	</div>
);
