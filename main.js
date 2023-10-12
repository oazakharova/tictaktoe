'use strict';

let ticTakToe = {
    gameTableElement: document.getElementById('game'),

    /**
     * инициализация игры
     */
    init() {
        // вывод всех ячеек
        this.renderMap();
        // инициализация обработчиков событий
        // this.initEventHandlers();
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
    }
}

// запуск игры после полной загрузки страницы
window.addEventListener('load', ticTakToe.init);