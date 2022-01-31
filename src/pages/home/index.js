import React, { useState } from 'react';
import useSound from 'use-sound';
import clickSound from '../../audios/click.mp3';
import winnerSound from '../../audios/winner.mp3';
import drawSound from '../../audios/draw.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [turn, setTurn] = useState('O');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();
    const [freez, setFreez] = useState(false);
    const [mute, setMute] = useState(false);
    const [play] = useSound(clickSound);
    const [playWinner] = useSound(winnerSound);
    const [playDraw] = useSound(drawSound);

    const resetGame = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
        setTurn('O');
        setFreez(false);
    };

    const checkForWinner = (squares) => {
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagnol: [
                [0, 4, 8],
                [2, 4, 6],
            ],
        };

        for (let combo in combos) {
            combos[combo].forEach((pattern) => {
                if (squares[pattern[0]] === '' || squares[pattern[1]] === '' || squares[pattern[2]] === '') {
                    //Do Nothing
                } else if (squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]) {
                    let winnerData = `Game Over: '${squares[pattern[0]]}' is the winner!`;
                    setWinner(winnerData);
                    setFreez(true);
                    if (!mute) {
                        playWinner();
                    }
                    return squares[pattern[0]];
                }
            });
        }

        let emptyCount = squares.filter((item) => item === '').length;
        if (emptyCount === 0) {
            setWinner('Game Draw!');
            playDraw();
        }
    };

    const onCellClick = (num) => {
        if (cells[num] === '' && !freez) {
            if (!mute) {
                play();
            }
            let squares = [...cells];
            if (turn === 'O') {
                squares[num] = 'O';
                setTurn('X');
            } else {
                squares[num] = 'X';
                setTurn('O');
            }
            setCells(squares);
            checkForWinner(squares);
        }
    };

    const Cell = ({ num }) => {
        return <td onClick={() => onCellClick(num)}>{cells[num]}</td>;
    };

    return (
        <>
            <div className="container-main">
                <div className="text-3xl font-bold mb-3 title">Tic-tac-toe!</div>
                <div className="board">
                    <table>
                        <tr>
                            <Cell num={0} />
                            <Cell num={1} />
                            <Cell num={2} />
                        </tr>
                        <tr>
                            <Cell num={3} />
                            <Cell num={4} />
                            <Cell num={5} />
                        </tr>
                        <tr>
                            <Cell num={6} />
                            <Cell num={7} />
                            <Cell num={8} />
                        </tr>
                    </table>
                    <div className="actions" onClick={() => setMute(!mute)}>
                        <FontAwesomeIcon
                            icon={mute ? faMicrophoneSlash : faMicrophone}
                            style={{ fontSize: '12px', marginRight: '5px', color: 'rgb(14, 138, 101)' }}
                        />{' '}
                        {mute ? 'Unmute' : 'Mute'}
                    </div>
                </div>
                <div className="reset-game" onClick={() => resetGame()}>
                    Play Again
                </div>
                {winner ? (
                    <>
                        <div className="winner">{winner}</div>
                        <img className="sparklegif" src="https://media1.giphy.com/media/3ohhwzIw3bISRhQWME/200.gif" alt="" />
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default Home;
