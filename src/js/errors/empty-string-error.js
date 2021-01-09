class EmptyStringError extends Error {
    name = 'EmptyStringError';

    constructor(name) {
        super(`Переменная ${name} должна быть непустой строкой.`);
    }
}

export default EmptyStringError;