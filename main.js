'use strict';

let ticTakToe = {
    gameTableElement: document.getElementById('game'),
    status: 'playing',
    mapValues: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    phase: 'X',

    /**
     * инициализация игры
     */
    init() {
        // вывод всех ячеек
        this.renderMap();
        // инициализация обработчиков событий
        this.initEventHandlers();
    },

    // отрисовка игрового поля 3х3
    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                let td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    },

    /**
     * инициализация обработчиков событий
     */
    initEventHandlers() {
        this.gameTableElement.addEventListener('click', event => this.cellClickHandler(event));
    },

    /**
     * обработчик события клика
     * @param {MouseEvent} event 
     */
    cellClickHandler(event) {
        if (!this.isCorrectClick(event)) {
            return;
        }
    },

    /**
     * проверка, был ли корректный клик в событии
     * @param {Event} event 
     * @returns {boolean}
     */
    isCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCell(event) && this.isCellEmpty(event);
    },

    /**
     * проверка, что игра не закончена
     * @returns {boolean}
     */
    isStatusPlaying() {
        return this.status === 'playing';
    },

    /**
     * проверка, что клик был совершен по ячейке
     * @param {Event} event 
     * @returns {boolean}
     */
    isClickByCell(event) {
        return event.target.tagName === 'TD'
    },

    /**
     * проверка возможности заполнения ячейи
     * @param {Event} event 
     * @returns {boolean}
     */
    isCellEmpty(event) {
        //получение строки и колонки клика
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.mapValues[row][col] === '';
    }

}

// запуск игры после полной загрузки страницы
window.addEventListener('load', ticTakToe.init());