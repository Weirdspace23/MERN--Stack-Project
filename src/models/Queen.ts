import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";
import { Board } from "./Board";

export class Queen extends Piece {
  image: string;
  type: PieceType;

  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.QUEEN;
    this.image = `assets/images/queen_${color}.png`;
  }

  isValidMove(destination: Position, board: Board): boolean {
    this.updatePossibleMoves(board);
    for (const move of this.possibleMoves) {
      if (move.x === destination.x && move.y === destination.y) {
        return true;
      }
    }
    return false;
  }

  updatePossibleMoves(board: Board): void {
    this.possibleMoves = [];
    const directions = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
    ];
    for (const direction of directions) {
      let nextPosition = {
        x: this.position.x + direction.x,
        y: this.position.y + direction.y,
      };
      while (board.isTileValid(nextPosition)) {
        if (board.isTileOccupied(nextPosition)) {
          if (board.getPieceAt(nextPosition)?.color !== this.color) {
            this.possibleMoves.push(nextPosition);
          }
          break;
        }
        this.possibleMoves.push(nextPosition);
        nextPosition = {
          x: nextPosition.x + direction.x,
          y: nextPosition.y + direction.y,
        };
      }
    }
  }

  clone(): Piece {
    return new Queen(this.position, this.color);
  }
}
