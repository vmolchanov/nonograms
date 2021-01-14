import images from './images';
import {renderCatalogItem} from './templates/catalog-item';

export const renderCatalog = () => {
    const fragment = document.createDocumentFragment();
    images.forEach((image) => {
        const catalogItem = renderCatalogItem({
            source: image.source,
            title: image.title,
            href: `crossword.html?id=${image.id}`,
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
    return fragment;
};