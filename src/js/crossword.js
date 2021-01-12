import Size from './size';
import Point from './point';
import Cell from './cell';

class Crossword {
    #PHYSICAL_CELL_WIDTH = 30;
    
    #PHYSICAL_CELL_HEIGHT = 30;

    #SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';

    #SMALL_INDENT = 1;

    #BIG_INDENT = 5;

    static ECell = {
        EMPTY: 0,
        BLACK: 1
    };
    
    #container;

    #currentAction = 'filling';

    #cells = [];

    #image = null;

    constructor(node) {
        this.#container = node;

        // Баг с приветными полями
        document.addEventListener('actionchange', ({detail}) => {
            this.#currentAction = detail;
        });
    }

    init() {
        const startTimerEvent = new Event('starttimer');
        const pauseTimerEvent = new Event('pausetimer');
        for (let i = 0, cells = this.#cells; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                cells[i][j].init(
                    () => {
                        document.dispatchEvent(startTimerEvent);
                        switch (this.#currentAction) {
                            case 'filling':
                                cells[i][j].fill();
                                if (this.isSolved()) {
                                    document.dispatchEvent(pauseTimerEvent);
                                    alert('Поздравляем! Вы решили кроссворд!');
                                    this.destroy();
                                    this.#cells.forEach((row) => {
                                        row.forEach((cell) => {
                                            if (cell.isCrossShown()) {
                                                cell.clear();
                                            }
                                        });
                                    });
                                }
                                break;
                            case 'emptying':
                                cells[i][j].showCross();
                                break;
                            case 'clearing':
                                cells[i][j].clear();
                                break;
                            case 'movement':
                                break;
                            default:
                                break;
                        }
                    },
                    (e) => {
                        e.preventDefault();
                        document.dispatchEvent(startTimerEvent);
                        cells[i][j].showCross();
                    }
                );
            }
        }
    }

    destroy() {
        for (let i = 0, cells = this.#cells; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                cells[i][j].destroy();
            }
        }
    }

    /**
     * @param {Array<Boolean>} image - массив с рисунком. Значения определены в перечислении ECell.
     */
    render(image) {
        this.#image = image;

        const n = image.length;
        const m = image[0].length;
        
        const hint = this.#getHint(image);
        const maxHintLength = {
            left: hint.left.reduce((max, row) => row.length > max ? row.length : max, 0),
            top: hint.top.reduce((max, row) => row.length > max ? row.length : max, 0)
        };
        const topHintHeight = maxHintLength.top * Cell.HEIGHT;
        const leftHintWidth = maxHintLength.left * Cell.WIDTH;

        const leftHint = this.#renderHint(hint.left, new Point(0, topHintHeight), maxHintLength.left);
        const topHint = this.#renderHint(hint.top, new Point(leftHintWidth, 0), maxHintLength.top, false);

        const fieldSize = new Size(
            Cell.WIDTH * m + m + 5,
            Cell.HEIGHT * n + n + 5
        );
        const field = this.#renderField(image, new Point(leftHintWidth, topHintHeight), fieldSize);
        
        const physicalSize = new Size(
            this.#PHYSICAL_CELL_WIDTH * (m + maxHintLength.left),
            this.#PHYSICAL_CELL_HEIGHT * (n + maxHintLength.top)
        );

        this.#setViewBox(new Size(0, 0), new Point(fieldSize.width + leftHintWidth, fieldSize.height + topHintHeight));
        this.#setPhysicalSize(physicalSize);

        this.#container.appendChild(leftHint);
        this.#container.appendChild(topHint);
        this.#container.appendChild(field);
    }


    fill(x, y, color = Crossword.ECell.BLACK) {
        switch (color) {
            case Crossword.ECell.BLACK:
                this.#cells[y][x].fill();
        }
    }

    isSolved() {
        for (let i = 0; i < this.#cells.length; i++) {
            for (let j = 0; j < this.#cells[i].length; j++) {
                if (this.#image[i][j] !== this.#cells[i][j].value) {
                    return false;
                }
            }
        }
        return true;
    }

    #setViewBox({width, height}, {x, y}) {
        this.#container.setAttribute('viewBox', `${width} ${height} ${x} ${y}`);
    }

    #setPhysicalSize({width, height}) {
        this.#container.setAttribute('width', width);
        this.#container.setAttribute('height', height);
    }

    #getHint(image) {
        const hint = {
            left: [],
            top: []
        };

        // Заполняем левые подсказки
        for (let i = 0; i < image.length; i++) {
            let count = 0;
            hint.left.push([]);
            for (let j = 0; j < image[i].length; j++) {
                if (image[i][j] === Crossword.ECell.EMPTY && count !== 0) {
                    hint.left[i].push(count);
                    count = 0;
                } else if (image[i][j] === Crossword.ECell.BLACK) {
                    count++;
                }
            }
            if (count !== 0) {
                hint.left[i].push(count);
            }
        }

        // Заполняем верхние подсказки
        for (let j = 0; j < image[0].length; j++) {
            let count = 0;
            hint.top.push([]);
            for (let i = 0; i < image.length; i++) {
                if (image[i][j] === Crossword.ECell.EMPTY && count !== 0) {
                    hint.top[j].push(count);
                    count = 0;
                } else if (image[i][j] === Crossword.ECell.BLACK) {
                    count++;
                }
            }
            if (count !== 0) {
                hint.top[j].push(count);
            }
        }

        return hint;
    }

    #renderField(image, coord, size) {
        const field = document.createElementNS(this.#SVG_NAMESPACE_URI, 'svg');
        const background = this.#renderBackground(size);
        field.classList.add('crossword__field');
        field.setAttributeNS(null, 'x', coord.x);
        field.setAttributeNS(null, 'y', coord.y);
        field.appendChild(background);

        let y = 1;
        for (
            let i = 0;
            i < image.length;
            i++, y += Cell.HEIGHT + (i % 5 === 0 ? this.#BIG_INDENT : this.#SMALL_INDENT)
        ) {
            const cellsRow = [];
            const group = this.#renderRow();
            let x = 1;

            for (
                let j = 0;
                j < image[0].length;
                j++, x += Cell.WIDTH + (j % 5 === 0 ? this.#BIG_INDENT : this.#SMALL_INDENT)
            ) {
                const cell = new Cell(x, y);
                group.appendChild(cell.render());

                cellsRow.push(cell);
            }
            field.appendChild(group);
            this.#cells.push(cellsRow);
        }

        return field;
    }

    #renderBackground({width, height}) {
        const background = document.createElementNS(this.#SVG_NAMESPACE_URI, 'rect');
        background.classList.add('crossword__background');
        background.setAttributeNS(null, 'x', 0);
        background.setAttributeNS(null, 'y', 0);
        background.setAttributeNS(null, 'width', width);
        background.setAttributeNS(null, 'height', height);
        return background;
    }

    #renderCell({x, y}) {
        const cell = document.createElementNS(this.#SVG_NAMESPACE_URI, 'rect');
        cell.classList.add('crossword__cell');
        cell.setAttributeNS(null, 'x', x);
        cell.setAttributeNS(null, 'y', y);
        cell.setAttributeNS(null, 'width', Cell.WIDTH);
        cell.setAttributeNS(null, 'height', Cell.HEIGHT);

        return cell;
    }

    #renderRow() {
        const group = document.createElementNS(this.#SVG_NAMESPACE_URI, 'g');
        group.classList.add('crossword__row');
        return group;
    }

    #renderText({x, y}, text) {
        const textNode = document.createElementNS(this.#SVG_NAMESPACE_URI, 'text');
        textNode.classList.add('crossword__text');
        textNode.setAttributeNS(null, 'x', x);
        textNode.setAttributeNS(null, 'y', y);
        textNode.setAttributeNS(null, 'dominant-baseline', 'middle');
        textNode.setAttributeNS(null, 'text-anchor', 'middle');
        textNode.textContent = text;
        return textNode;
    }

    #renderHint(hint, coord, length, isLeft = true) {
        const hintsNode = document.createElementNS(this.#SVG_NAMESPACE_URI, 'svg');
        hintsNode.classList.add('crossword__hint');
        hintsNode.setAttributeNS(null, 'x', coord.x);
        hintsNode.setAttributeNS(null, 'y', coord.y);

        const background = this.#renderBackground(new Size(
            isLeft ? length * Cell.WIDTH + length + 1 : hint.length * Cell.WIDTH + hint.length + 5,
            isLeft ? hint.length * Cell.HEIGHT + hint.length + 1 : length * Cell.HEIGHT + length + 1
        ));

        hintsNode.appendChild(background);

        let x = 1;
        let y = 1;

        hint.forEach((hints, index) => {
            const row = this.#renderRow();

            if (isLeft) {
                x = this.#SMALL_INDENT;
            } else {
                y = this.#SMALL_INDENT;
            }

            let i;
            for (i = 0; i < length - hints.length; i++) {
                const hintCell = this.#renderHintCell(new Point(x, y));
                row.appendChild(hintCell);
                if (isLeft) {
                    x += Cell.WIDTH + this.#SMALL_INDENT;
                } else {
                    y += Cell.HEIGHT + this.#SMALL_INDENT;
                }
            }

            for (let j = i, hintsIndex = j - i; j - i < hints.length; j++, hintsIndex = j - i) {
                const hintCell = this.#renderHintCell(new Point(x, y), hints[hintsIndex]);
                row.appendChild(hintCell);
                if (isLeft) {
                    x += Cell.WIDTH + this.#SMALL_INDENT;
                } else {
                    y += Cell.HEIGHT + this.#SMALL_INDENT;
                }
            }

            if (isLeft) {
                y += Cell.HEIGHT + ((index + 1) % 5 === 0 ? this.#BIG_INDENT : this.#SMALL_INDENT);
            } else {
                x += Cell.WIDTH + ((index + 1) % 5 === 0 ? this.#BIG_INDENT : this.#SMALL_INDENT);
            }

            hintsNode.appendChild(row);
        });

        return hintsNode;
    }

    #renderHintCell(coord, text = null) {
        const wrapper = document.createElementNS(this.#SVG_NAMESPACE_URI, 'svg');
        const cell = this.#renderCell(coord);
        wrapper.appendChild(cell);
        if (text !== null) {
            wrapper.appendChild(this.#renderText(new Point(
                coord.x + Cell.WIDTH / 2,
                coord.y + Cell.HEIGHT / 2,
            ), text));
        }
        return wrapper;
    }
}

export default Crossword;