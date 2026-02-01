export const AuthForm = ({ method, title, buttonText, children }) => {
    return (
        <form
            className="flex flex-col items-center w-container-modal-responsive p-4 gap-4 bg-card max-w-125 mx-auto rounded-md shadow-white/30 shadow-xs"
            onSubmit={method}
        >
            <h2 className="text-h2-responsive text-text-primary">{title}</h2>
            <label className="flex flex-col gap-1 text-text-secondary w-full">
                Username
                <input
                    className="border border-black bg-white p-1 rounded-xl outline-2 border-none valid:outline-secondary invalid:outline-secondary"
                    type="text"
                    name="username"
                    minLength={4}
                    required
                />
            </label>
            <label className="flex flex-col gap-1 text-text-secondary w-full">
                Password
                <input
                    className="border border-black bg-white p-1 rounded-xl"
                    type="password"
                    name="password"
                    minLength={6}
                    required
                />
            </label>

            <button className="bg-gray-400 w-full rounded-xl p-1 m-2" type="submit">
                {buttonText}
            </button>
            {children}
        </form>
    );
};
