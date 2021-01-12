class Timer {
    #INTERVAL_MS = 1000;

    #container = null;

    #node = null;

    #time = 0;

    #interval = null;
    
    constructor(element) {
        this.#node = element.querySelector('.timer__value');
    }

    get time() {
        return this.#time;
    }

    init() {
        document.addEventListener('starttimer', () => {
            if (!this.#interval) {
                this.start();
            }
        });

        document.addEventListener('pausetimer', () => {
            this.pause();
        });
    }

    start() {
        this.#interval = setInterval(() => {
            this.#time++;
            this.#render();
        }, this.#INTERVAL_MS);
    }

    stop() {
        clearInterval(this.#interval);
        this.#time = 0;
    }

    pause() {
        clearInterval(this.#interval);
    }

    #render() {
        this.#node.textContent = this.#time;
    }
}

export default Timer;
