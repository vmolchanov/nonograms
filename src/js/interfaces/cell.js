import {NotImplementedMethod} from '../errors/not-implemented-method';
import Point from '../point';

class ICell {
    static WIDTH = 100;

    static HEIGHT = 100;

    static SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';

    init() {
        throw new NotImplementedMethod('init');
    }

    destroy() {
        throw new NotImplementedMethod('destroy');
    }

    render() {
        return this._node;
    }

    clear() {
        throw new NotImplementedMethod('clear');
    }

    createNode(x, y, width, height, text = null) {
        const cell = document.createElementNS(ICell.SVG_NAMESPACE_URI, 'g');
        cell.classList.add('crossword__cell');
        
        const rectangle = document.createElementNS(ICell.SVG_NAMESPACE_URI, 'rect');
        rectangle.setAttributeNS(null, 'x', x);
        rectangle.setAttributeNS(null, 'y', y);
        rectangle.setAttributeNS(null, 'width', width);
        rectangle.setAttributeNS(null, 'height', height);

        cell.appendChild(rectangle);
        if (text !== null) {
            cell.appendChild(this.#renderText(new Point(
                x + width / 2,
                y + height / 2,
            ), text))
        }    
        cell.appendChild(this.#renderCross(x + 15, y + 15));
        return cell;
    }

    #renderCross(x, y) {
        const svg = document.createElementNS(ICell.SVG_NAMESPACE_URI, 'svg');
        svg.classList.add('crossword__cross');
        svg.setAttributeNS(null, 'viewBox', '0 0 100 100');
        svg.setAttributeNS(null, 'x', x);
        svg.setAttributeNS(null, 'y', y);
        svg.setAttributeNS(null, 'width', 70);
        svg.setAttributeNS(null, 'height', 70);

        const line1 = document.createElementNS(ICell.SVG_NAMESPACE_URI, 'line');
        line1.setAttributeNS(null, 'x1', '10');
        line1.setAttributeNS(null, 'y1', '10');
        line1.setAttributeNS(null, 'x2', '100');
        line1.setAttributeNS(null, 'y2', '100');
        line1.setAttributeNS(null, 'stroke', 'black');
        line1.setAttributeNS(null, 'stroke-width', '10');

        const line2 = document.createElementNS(ICell.SVG_NAMESPACE_URI, 'line');
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

    #renderText({ x, y }, text) {
        const textNode = document.createElementNS(ICell.SVG_NAMESPACE_URI, 'text');
        textNode.classList.add('crossword__text');
        textNode.setAttributeNS(null, 'x', x);
        textNode.setAttributeNS(null, 'y', y);
        textNode.setAttributeNS(null, 'dominant-baseline', 'middle');
        textNode.setAttributeNS(null, 'text-anchor', 'middle');
        textNode.textContent = text;
        return textNode;
    }
}

export {ICell};
