import EmptyStringError from './errors/empty-string-error';
import ImageEncryptionError from './errors/image-encryption-error';

const validateId = (id) => {
    if (typeof id !== 'number') {
        throw new TypeError('Поле id должно быть числом.');
    }
};

const validateLevel = (level) => {
    if (typeof level !== 'number') {
        throw new TypeError('Переменная level должна быть числом.');
    }

    if (level < 1 || level > 5) {
        throw new RangeError('Переменная level должна быть в диапазоне от 1 до 5.');
    }
};

const validateTitle = (title) => {
    if (typeof title !== 'string') {
        throw new TypeError('Поле title должно быть строкой.');
    }

    if (title.length === 0) {
        throw new EmptyStringError('title');
    }
};

const validateImage = (image, title) => {
    if (!Array.isArray(image) || !image.every((row) => Array.isArray(row))) {
        throw new TypeError('Переменная image должна быть двумерным массивом.');
    }

    let rowIndex;
    let columnIndex;

    // if (!image.every((row) => Array.isArray(row))) {
    //     throw new TypeError('Не массив');
    // }

    if (!image.every((row, i) => {
            return row.every((value) => {
                const isValid = /^\d+\/\d+$/.test(value);
                if (!isValid) {
                    rowIndex = i;
                    columnIndex = j;
                }
                return isValid;
            })
    })) {
        console.log(rowIndex, columnIndex);
        throw new ImageEncryptionError('image', title, rowIndex, columnIndex);
    }
};

const validateSize = (size) => {
    
};

const imageSchema = ({id, image, level, title, size, source}) => {
    validateId(id);
    validateLevel(level);
    validateTitle(title);
    validateImage(image, title);
    return {
        id,
        image,
        level,
        title,
        size,
        source
    };
};

export default imageSchema;