class InvalidFormat extends Error {
    name = 'InvalidFormat';

    constructor(property, format) {
        super(`Переменная ${property} имеет неправильный формат. Она должна быть представлена в виде ${format}`);
    }
}

export {InvalidFormat};
