/**  */
class NotImplementedMethod extends Error {
    name = 'NotImplementedMethod';

    constructor(name) {
        super(`Необходимо определить метод ${name}.`);
    }
}

export {NotImplementedMethod};
