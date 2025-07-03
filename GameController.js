function randInt(min, max) { 
    max--;  
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const transpose = matrix => matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

export class GameController {
    constructor(n, m) {
        this.n = n;
        this.m = m;
        this.reset();
    }

    reset() {
        this.grid = Array.from({ length: this.n }, () =>
            Array.from({ length: this.m }, () => 0)
        );
        this.score = 0;
        this.add_cell();
    }

    add_cell() {

        const free_cells = []
        for(let i = 0;i < this.n;i++) {
            for(let j = 0;j < this.m;j++) {
                if(this.grid[i][j] == 0) {
                    free_cells.push([i, j]);
                }
            }
        }

        const cell = free_cells[randInt(0, free_cells.length)];

        this.grid[cell[0]][cell[1]] = 2;
        if(randInt(0, 10) == 0) {
            this.grid[cell[0]][cell[1]] = 4;
        }

    }

    grid_moved_down(grid) {
        const n = grid.length;
        const m = grid[0].length;
        let score = 0;
        for(let row = n - 1;row >= 0;row--) {
            for(let column = 0; column < m;column++) {
                let r = row;
                while(r + 1 < n) {
                    if(grid[r + 1][column] == 0) {
                        grid[r + 1][column] = grid[r][column];
                        grid[r][column] = 0;
                    }
                    else if(grid[r + 1][column] == grid[r][column]) {
                        grid[r + 1][column] *= 2;
                        score += grid[r + 1][column];
                        grid[r][column] = 0;
                    }
                    else {
                        break;
                    }
                    r++;
                }
            }
        }
        return [grid, score];
    }

    grid_moved_right(grid) {
        grid = transpose(grid);
        const [grid1, score] = this.grid_moved_down(grid);
        grid = transpose(grid1);
        return [grid, score];
    }

    grid_moved_up(grid) {
        grid.reverse();
        const [grid1, score] = this.grid_moved_down(grid);
        grid1.reverse();
        return [grid1, score];
    }

    grid_moved_left(grid) {
        grid.map((row) => {row.reverse()});
        const [grid1, score] = this.grid_moved_right(grid);
        grid1.map((row) => {row.reverse()});
        return [grid1, score];
    }

    move_down() {
        const [grid, score] = this.grid_moved_down(this.grid);
        this.score += score;
        this.grid = grid;
    }

    move_up() {
        const [grid, score] = this.grid_moved_up(this.grid);
        this.score += score;
        this.grid = grid;
    }

    move_left() {
        const [grid, score] = this.grid_moved_left(this.grid);
        this.score += score;
        this.grid = grid;
    }

    move_right() {
        const [grid, score] = this.grid_moved_right(this.grid);
        this.score += score;
        this.grid = grid;
    }

    get_score() {
        return this.score;
    }

    get_grid() {
        return this.grid;
    }

}