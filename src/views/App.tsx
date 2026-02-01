import { Header, Loader, ProtectedRoute } from "@components/index.ts";
import { useAuthStore } from "@stores/index.ts";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "wouter";

const App = () => {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const DashboardPage = lazy(() => import("@pages/Dashboard.tsx"));
    const LoginPage = lazy(() => import("@pages/Login.tsx"));
    const RegisterPage = lazy(() => import("@pages/Register.tsx"));

    return (
        <>
            <Header />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path="/">
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    </Route>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                </Switch>
            </Suspense>
        </>
    );
};

export default App;
