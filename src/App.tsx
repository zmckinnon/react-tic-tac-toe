import './App.css'
import {useEffect, useState} from "react";

function App() {
    const defaultGameBoard: ('X' | 'O' | null)[][] = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
    const [gameBoard, setGameBoard] = useState(defaultGameBoard);
    const [nextLetter, setNextLetter] = useState<'X' | 'O'>('X');
    const [gameResult, setGameResult] = useState<'X' | 'O' | 'TIE' | null>(null);

    const checkForWinner = () => {
        for (let i = 0; i < 3; i++) {
            const horizontalValue = gameBoard[i][0];
            let horizontalMismatched = false;
            for (let j = 1; j < 3; j++) {
                if (horizontalValue !== gameBoard[i][j]) {
                    horizontalMismatched = true;
                }
            }
            if (!horizontalMismatched) {
                return horizontalValue;
            }
        }

        for (let i = 0; i < 3; i++) {
            const verticalValue = gameBoard[0][i];
            let verticalMismatched = false;
            for (let j = 1; j < 3; j++) {
                if (verticalValue !== gameBoard[j][i]) {
                    verticalMismatched = true;
                }
            }
            if (!verticalMismatched) {
                return verticalValue;
            }
        }

        const diagonalValue1 = gameBoard[0][0];
        let mismatched = false;
        for (let i = 1; i < 3; i++) {
            if (diagonalValue1 !== gameBoard[i][i]) {
                mismatched = true;
            }
        }
        if (!mismatched) {
            return diagonalValue1;
        }

        const diagonalValue2 = gameBoard[0][2];
        let mismatched2 = false;
        for (let i = 1; i < 3; i++) {
            if (diagonalValue2 !== gameBoard[i][2-i]) {
                mismatched2 = true;
            }
        }
        if (!mismatched2) {
            return diagonalValue2;
        }

        // TODO: Check to see if board is full, return 'TIE'
        if (gameBoard.every(x => x.every(y => Boolean(y)))) {
            return 'TIE';
        }

        return null;
    }

    const handleLocationClick = (x: number, y: number) => {
        setGameBoard(prevState => {
            prevState[x][y] = nextLetter;
            return prevState;
        });
        setNextLetter(nextLetter === 'X' ? 'O' : 'X');
    }

    useEffect(() => {
        // Check for winner
        const winner = checkForWinner();
        if (winner) {
            setGameResult(winner);
        }
    }, [checkForWinner, gameBoard]);

  return (
    <>
        {gameResult && <div>Result: {gameResult}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' }}>
            <div onClick={() => handleLocationClick(0, 0)}>{gameBoard[0][0] ?? '-'}</div>
            <div onClick={() => handleLocationClick(0, 1)}>{gameBoard[0][1] ?? '-'}</div>
            <div onClick={() => handleLocationClick(0, 2)}>{gameBoard[0][2] ?? '-'}</div>
            <div onClick={() => handleLocationClick(1, 0)}>{gameBoard[1][0] ?? '-'}</div>
            <div onClick={() => handleLocationClick(1, 1)}>{gameBoard[1][1] ?? '-'}</div>
            <div onClick={() => handleLocationClick(1, 2)}>{gameBoard[1][2] ?? '-'}</div>
            <div onClick={() => handleLocationClick(2, 0)}>{gameBoard[2][0] ?? '-'}</div>
            <div onClick={() => handleLocationClick(2, 1)}>{gameBoard[2][1] ?? '-'}</div>
            <div onClick={() => handleLocationClick(2, 2)}>{gameBoard[2][2] ?? '-'}</div>
        </div>
    </>
  )
}

export default App
