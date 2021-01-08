import Crossword from './crossword';
import {decodeImage} from './decode-image';
import {duck, koala} from './images';

const crossword = new Crossword(document.querySelector('.crossword'));
crossword.render(decodeImage(koala));