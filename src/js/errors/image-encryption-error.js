class ImageEncryptionError extends Error {
    name = 'ImageEncryptionError';

    constructor(property, image, rowIndex, columnIndex) {
        super(
            `Ошибка в рисунке ${image}: строка ${rowIndex}, столбец ${columnIndex}. ` +
            `Переменная ${property} должна быть представлена в виде value/count, где ` +
            `element – значение ячейки, а count – количество таких ячеек подряд.`
        );
    }
}

export default ImageEncryptionError;