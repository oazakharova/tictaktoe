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
        //выход из функции, если не нужно обрабатывать клик
        if (!this.isCorrectClick(event)) {
            return;
        }

        // заполнение ячейки
        this.fillCell(event);

        // проверка, произошел ли выигрыш
        if (this.hasWon()) {
            this.setStatusStopped();
            this.sayWonPhase();
        }

        // изменение фигуры при отсутствии выигрыша
        this.togglePhase();
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
    },

    /**
     * заполнение ячейки, на которую кликнул пользователь в событии
     * @param {Event} event 
     */
    fillCell(event) {
        // получение координат ячейки, на которую кликнул пользователь
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        // заполнение ячейки и проставление значения в массиве
        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
    },

    /**
     * проверка, есть ли выигрышная ситуация на карте
     * @returns {boolean}
     */
    hasWon() {
        return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
            this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

            this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
            this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
            this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

            this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 })
    },

    /**
     * проверкуа выигрышной ситуации на линии
     * @param {x: int, y: int} a 1-я ячейка
     * @param {x: int, y: int} b 2-я ячейка
     * @param {x: int, y: int} c 3-я ячейка
     * @returns {boolean}
     */
    isLineWon(a, b, c) {
        let value = this.mapValues[a.y][a.x]
            + this.mapValues[b.y][b.x]
            + this.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    },

    // изменение статуса игры на 'остановлена'
    setStatusStopped() {
        this.status = 'stopped';
    },

    /**
     * сообщение о победе
     */
    sayWonPhase() {
        let figure = this.phase === 'X'
            ? 'Крестики'
            : 'Нолики';
        alert(`${figure} выиграли !`)
    },

    togglePhase() {
        this.phase = this.phase === 'X'
            ? '0'
            : 'X';
    },
}

// запуск игры после полной загрузки страницы
window.addEventListener('load', ticTakToe.init());