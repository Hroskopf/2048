import { GameController } from "./GameController.js";

export class View {

    constructor(game_controller, n, m) {
        this.n = n;
        this.m = m;
        this.createGridTable(n, m);
        this.game_controller = game_controller;
        this.game_controller.reset();
        this.updateView();
        document.getElementById('start-button').addEventListener('click', () => {
            this.game_controller.reset();
            this.updateView();
        });

        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.game_controller.move_up();
                    this.updateView();
                    break;
                case 'ArrowDown':
                    this.game_controller.move_down();
                    this.updateView();
                    break;
                case 'ArrowLeft':
                    this.game_controller.move_left();
                    this.updateView();
                    break;
                case 'ArrowRight':
                    this.game_controller.move_right();
                    this.updateView();
                    break;
            }
        });
    }

    updateView() {
        this.game_controller.add_cell();
        this.updateScore(this.game_controller.get_score());
        this.drawGridTable(this.game_controller.get_grid());
    }

    createGridTable(n, m) {
        const table = document.getElementById("grid-table");
        for(let i = 0;i < n;i++) {
            const row = document.createElement("tr");
            for(let j = 0;j < m;j++) {
                const cell = document.createElement("td");
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }

    drawGridTable(grid) {
        const table = document.getElementById("grid-table")
        for(let i = 0;i < grid.length;i++) {
            for(let j = 0;j < grid[0].length;j++) {
                const cell = table.rows[i].cells[j];
                if(grid[i][j] != 0)
                    cell.textContent = grid[i][j];
                else {
                    cell.textContent = "";
                }
            }
        }
    }

    updateScore(new_score) {
        const score_element = document.getElementById("score");
        score_element.textContent = new_score;
    }

}