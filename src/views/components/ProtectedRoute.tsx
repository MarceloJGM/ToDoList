import { Loader } from "@components/index.ts";
import { useAuthStore } from "@stores/index.ts";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export const ProtectedRoute = ({
    children,
    redirectTo = "/login",
}: {
    children: ReactNode;
    redirectTo?: string;
}) => {
    const [_, navigate] = useLocation();
    const { isLoggedIn, isLoading } = useAuthStore();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            navigate(redirectTo, { replace: true });
        }
    }, [isLoggedIn, isLoading, navigate, redirectTo]);

    if (isLoading) {
        return <Loader />;
    }

    if (!isLoggedIn) {
        navigate(redirectTo);
        return;
    }

    return children;
};
