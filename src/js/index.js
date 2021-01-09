import Crossword from './crossword';
import {decodeImage} from './decode-image';
import images from './images';
import {runComponent} from './run-component';
import {renderCatalogItem} from './templates/catalog-item';

runComponent(document.querySelector('.crossword'), (element) => {
    const crossword = new Crossword(element);
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));
    crossword.render(decodeImage(images.find((image) => image.id === id).image));
});

runComponent(document.querySelector('.catalog'), (element) => {
    const fragment = document.createDocumentFragment();
    images.forEach((image) => {
        const catalogItem = renderCatalogItem({
            source: image.source,
            title: image.title,
            href: `/crossword.html?id=${image.id}`,
            infos: [
                {
                    key: 'Размер:',
                    value: image.size
                },
                {
                    key: 'Сложность:',
                    value: image.level
                }
            ]
        });
        fragment.appendChild(catalogItem);
    });
    element.appendChild(fragment);
});
