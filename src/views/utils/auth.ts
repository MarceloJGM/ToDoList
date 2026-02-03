export const getFormData = ({ event }: { event: React.FormEvent }) => {
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const username = formData.get("username") as string;
    const pwd = formData.get("password") as string;

    return { username, pwd };
};
