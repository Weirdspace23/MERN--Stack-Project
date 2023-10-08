import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";
import { Board } from "./Board";

export class Bishop extends Piece {
  image: string;
  type: PieceType;

  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.BISHOP;
    this.image = `assets/images/bishop_${color}.png`;
  }

  isValidMove(destination: Position, board: Board): boolean {
    if (this.color !== board.playerTurn) return false;
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
    if (this.color !== board.playerTurn) return;
    const directions = [
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
    return new Bishop(this.position, this.color);
  }
}
