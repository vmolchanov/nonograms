/**  */
class Cell {
    #SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';

    static WIDTH = 100;

    static HEIGHT = 100;

    #node = null;

    #cross = null;

    #onClick = null;

    #onContextMenu = null;

    constructor(x, y, width = Cell.WIDTH, height = Cell.HEIGHT) {
        this.#node = this.#createNode(x, y, width, height);
        this.#cross = this.#node.querySelector('.crossword__cross');
    }

    get value() {
        if (this.#node.classList.contains('crossword__cell--black')) {
            return 1;
        } else {
            return 0;
        }
    }

    init(onClick, onContextMenu) {
        this.#node.addEventListener('click', onClick);
        this.#node.addEventListener('contextmenu', onContextMenu);

        this.#onClick = onClick;
        this.#onContextMenu = onContextMenu;
    }

    destroy() {
        this.#node.removeEventListener('click', this.#onClick);
        this.#node.removeEventListener('contextmenu', this.#onContextMenu);
    }

    render() {
        return this.#node;
    }

    fill() {
        this.#node.classList.add('crossword__cell--black');
    }

    showCross() {
        this.#cross.classList.add('crossword__cross--show');
    }

    clear() {
        this.#node.classList.remove('crossword__cell--black');
        this.#cross.classList.remove('crossword__cross--show');
    }

    isCrossShown() {
        return this.#cross.classList.contains('crossword__cross--show');
    }

    #createNode(x, y, width, height) {
        const cell = document.createElementNS(this.#SVG_NAMESPACE_URI, 'g');
        cell.classList.add('crossword__cell');
        
        const rectangle = document.createElementNS(this.#SVG_NAMESPACE_URI, 'rect');
        rectangle.setAttributeNS(null, 'x', x);
        rectangle.setAttributeNS(null, 'y', y);
        rectangle.setAttributeNS(null, 'width', width);
        rectangle.setAttributeNS(null, 'height', height);

        cell.appendChild(rectangle);
        cell.appendChild(this.#renderCross(x + 15, y + 15));

        return cell;
    }

    #renderCross(x, y) {
        const svg = document.createElementNS(this.#SVG_NAMESPACE_URI, 'svg');
        svg.classList.add('crossword__cross');
        svg.setAttributeNS(null, 'viewBox', '0 0 100 100');
        svg.setAttributeNS(null, 'x', x);
        svg.setAttributeNS(null, 'y', y);
        svg.setAttributeNS(null, 'width', 70);
        svg.setAttributeNS(null, 'height', 70);

        const line1 = document.createElementNS(this.#SVG_NAMESPACE_URI, 'line');
        line1.setAttributeNS(null, 'x1', '10');
        line1.setAttributeNS(null, 'y1', '10');
        line1.setAttributeNS(null, 'x2', '100');
        line1.setAttributeNS(null, 'y2', '100');
        line1.setAttributeNS(null, 'stroke', 'black');
        line1.setAttributeNS(null, 'stroke-width', '10');

        const line2 = document.createElementNS(this.#SVG_NAMESPACE_URI, 'line');
        line2.setAttributeNS(null, 'x1', '100');
        line2.setAttributeNS(null, 'y1', '10');
        line2.setAttributeNS(null, 'x2', '10');
        line2.setAttributeNS(null, 'y2', '100');
        line2.setAttributeNS(null, 'stroke', 'black');
        line2.setAttributeNS(null, 'stroke-width', '10');

        svg.appendChild(line1);
        svg.appendChild(line2);

        return svg;
    }
}

export default Cell;
