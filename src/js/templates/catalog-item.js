const template = document.querySelector('#catalog-item')?.content;

export const renderCatalogItem = ({source, title, href, infos}) => {
    const catalogItem = template.querySelector('.catalog__item').cloneNode(true);
    const image = catalogItem.querySelector('.catalog__item-image img');
    const infoList = catalogItem.querySelector('.catalog__info-list');
    const name = catalogItem.querySelector('.catalog__item-name a');
    image.src = source;
    image.alt = title;
    name.textContent = title;
    name.href = href;
    infoList.innerHTML = '';
    infos.forEach((info) => {
        const infoItem = template.querySelector('.catalog__info-item').cloneNode(true);
        const spans = infoItem.querySelectorAll('span');
        spans[0].textContent = info.key;
        spans[1].textContent = info.value;
        infoList.appendChild(infoItem);
    });
    return catalogItem;
};
