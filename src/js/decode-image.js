export const decodeImage = (encodedImage) => {
    return encodedImage.map((row) => {
        return row
            .map((item) => {
                const [value, count] = item.split('/');
                return value
                    .repeat(Number(count))
                    .split('')
                    .map((character) => Number(character));
            })
            .flat(1);
    });
};
