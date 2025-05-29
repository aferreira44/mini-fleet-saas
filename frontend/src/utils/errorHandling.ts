export const handleError = (error: unknown, message: string) => {
    if (error instanceof Error) {
        throw new Error(error.message);
    } else {
        throw new Error(message);
    }
}