import {ICell} from './interfaces/cell';

class HintCell extends ICell {
    #node = null;

    #cross = null;

    constructor(x, y, text = null, width = ICell.WIDTH, height = ICell.HEIGHT) {
        super();
        this.#node = this.createNode(x, y, width, height, text);
        this.#cross = this.#node.querySelector('.crossword__cross');
    }

    /** @override */
    init(onClick) {
        this.#node.addEventListener('click', onClick);
    }

    /** @override */
    destroy() {}

    showCross() {
        this.#cross.classList.add('crossword__cross--show');
    }

    hideCross() {
        this.#cross.classList.remove('crossword__cross--show');
    }

    check() {
        if (!this.isChecked()) {
            this.showCross();
        } else {
            this.hideCross();
        }
    }

    isChecked() {
        return this.#cross.classList.contains('crossword__cross--show');
    }

    /** @override */
    render() {
        return this.#node;
    }

    /** @override */
    clear() {}
}

export default HintCell;
