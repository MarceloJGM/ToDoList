import { Button } from "@components/index.ts";
import { fetchLogout } from "@services/index.ts";
import { useAuthStore } from "@stores/index.ts";
import { IconClipboard, IconLogout } from "@tabler/icons-react";

export const Header = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const checkAuth = useAuthStore((state) => state.checkAuth);

    const handleLogout = async () => {
        try {
            await fetchLogout();
            checkAuth();
        } catch (_error) {
            console.log(_error);
        }
    };
    return (
        <header className="flex justify-between p-2 bg-header-border">
            <section className="flex items-center gap-2 text-text-primary select-none">
                <IconClipboard size={28} color="#94a3b8" />
                <h2 className="text-h2-responsive">To-Do List App</h2>
            </section>
            {isLoggedIn && (
                <Button
                    onClick={handleLogout}
                    className="cursor-pointer p-2 rounded-full"
                    type="button"
                    icon={<IconLogout size={32} color="#f59e0b" />}
                />
            )}
        </header>
    );
};
