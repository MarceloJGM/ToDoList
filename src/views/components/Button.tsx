import type { ReactNode } from "react";

interface ButtonProps {
	type: "submit" | "button" | "reset";
	className?: string;
	text?: string;
	icon?: ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
	type,
	className,
	text,
	icon,
	onClick,
}: ButtonProps) => {
	return (
		<button type={type} className={className} onClick={onClick}>
			{text}
			{icon}
		</button>
	);
};
