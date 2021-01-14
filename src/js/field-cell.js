import {ICell} from './interfaces/cell';

class FieldCell extends ICell {
    #node = null;

    #cross = null;

    #onClick = null;

    #onContextMenu = null;

    constructor(x, y, width = ICell.WIDTH, height = ICell.HEIGHT) {
        super();
        this.#node = this.createNode(x, y, width, height);
        this.#cross = this.#node.querySelector('.crossword__cross');
    }

    get value() {
        if (this.#node.classList.contains('crossword__cell--black')) {
            return 1;
        } else {
            return 0;
        }
    }

    /** @override */
    init(onClick, onContextMenu) {
        this.#node.addEventListener('click', onClick);
        this.#node.addEventListener('contextmenu', onContextMenu);

        this.#onClick = onClick;
        this.#onContextMenu = onContextMenu;
    }

    /** @override */
    destroy() {
        this.#node.removeEventListener('click', this.#onClick);
        this.#node.removeEventListener('contextmenu', this.#onContextMenu);
    }

    /** @override */
    render() {
        return this.#node;
    }

    fill() {
        if (!this.isCrossShown()) {
            this.#node.classList.add('crossword__cell--black');
        }
    }

    showCross() {
        if (!this.isFilled()) {
            this.#cross.classList.add('crossword__cross--show');
        }
    }

    /** @override */
    clear() {
        this.#node.classList.remove('crossword__cell--black');
        this.#cross.classList.remove('crossword__cross--show');
    }

    isFilled() {
        return this.#node.classList.contains('crossword__cell--black');
    }

    isCrossShown() {
        return this.#cross.classList.contains('crossword__cross--show');
    }
}

export default FieldCell;
