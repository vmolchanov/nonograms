import Crossword from './crossword';
import {decodeImage} from './decode-image';
import images, {example} from './images';
import {runComponent} from './run-component';
import {renderCatalog} from './catalog';

runComponent(document.querySelector('.j-crossword'), (element) => {
    const crossword = new Crossword(element);
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));
    crossword.render(decodeImage(images.find((image) => image.id === id).image));
});

runComponent(document.querySelector('.j-catalog'), (element) => {
    const catalog = renderCatalog();
    element.appendChild(catalog);
});

runComponent(document.querySelectorAll('.j-crossword-example'), (elements) => {
    elements.forEach((element) => {
        const step = Number(element.dataset.step);
        const crossword = new Crossword(element);
        crossword.render(decodeImage(example));
        switch (step) {
            case 5:
                crossword.fill(1, 5);
                crossword.fill(1, 6);
                crossword.fill(1, 7);
                crossword.fill(0, 7);
            case 4:
                crossword.fill(2, 1);
                crossword.fill(2, 2);
            case 3:
                crossword.fill(3, 0);
                crossword.fill(4, 0);
                crossword.fill(2, 4);
                crossword.fill(3, 4);
                crossword.fill(4, 4);
            case 2:
                crossword.fill(1, 3);
                crossword.fill(1, 4);
            case 1:
                crossword.fill(5, 0);
                crossword.fill(5, 1);
                crossword.fill(5, 2);
                crossword.fill(5, 3);
                crossword.fill(5, 4);
                crossword.fill(5, 5);
                crossword.fill(5, 6);
                crossword.fill(5, 7);
                break;
            default:
                break;
        }
    });
});
