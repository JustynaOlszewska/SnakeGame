import React, { useRef, useEffect, useCallback } from 'react';

const Canvas = ({ setPoints, points, easy, score }) => {

    let myRef = useRef();
    let myGameArea = useRef()

    let myGamePiece = useRef()
    let myGameApple = useRef()
    let myGameBarrier = useRef()

    myGameArea = {
        changeTime: function () {
            this.interval = requestAnimationFrame(updateGameArea)
        },
        start: function () {

            this.ctx = myRef.current
            this.canvas = this.ctx.getContext('2d')
            this.canvas.width = 300;
            this.canvas.height = 300;

        },
        clear: function () {

            this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);

        },

    };
    let countPoints = useCallback((elementsSnake) => {
        if (easy === "easy") {
            setPoints(++points)

        } else if (easy === "harder") {
            setPoints(points + (elementsSnake * 2))
        }
        else if (easy === "hard") {
            setPoints(points + (elementsSnake * 3))
        }

        return points

    }, [easy, setPoints, points])

    useEffect(() => {
        myGameArea.changeTime()
        return () => cancelAnimationFrame(myGameArea.interval);

    }, []);

    useEffect(() => {

        myGameArea.start()

    }, [myGameArea]);

    useEffect(() => {
        function Barrier() {
            this.x = [];
            this.y = [];

            if (easy === "easy") {
                setPoints(0)
                this.x = [0];
                this.y = [0];
                this.width = 0;
                this.height = 0;


            }
            else if (easy === "harder") {
                myGamePiece.current.snakeReturnHome(myGamePiece.current.snakeX, myGamePiece.current.snakeY, myGamePiece.current.newHead)

                this.x = [60];
                this.y = [160];
                this.width = 160;
                this.height = 20;


            }
            else if (easy === "hard") {

                myGamePiece.current.snakeReturnHome(myGamePiece.current.snakeX, myGamePiece.current.snakeY, myGamePiece.current.newHead)

                this.x = [40, 80, 120, 20]
                this.y = [40, 100, 160, 200];
                this.width = 160;
                this.height = 20;
            }
            this.drawBarrier = () => {

                myGameArea.canvas.fillStyle = "red";
                if (easy === "hard") {
                    for (let i = 0; i < this.x.length; i++) {
                        myGameArea.canvas.fillRect(this.x[i], this.y[i], this.width, this.height);
                    }
                }
                myGameArea.canvas.fillRect(this.x, this.y, this.width, this.height);
            }
        }
        myGameBarrier.current = new Barrier()

    }, [easy, myGamePiece, setPoints]);

    useEffect(() => {

        function Apple(x, y, color, sizeX, sizeY) {

            this.x = (Math.floor(Math.random() * (300 - 0)) + 0);
            this.y = (Math.floor(Math.random() * (300 - 0)) + 0);
            this.x = this.x - this.x % 20;
            this.y = this.y - this.y % 20;
            this.width = sizeX;
            this.height = sizeY;


            this.randomPlaceApple = (x, y) => {
                x = (Math.floor(Math.random() * (300 - 0)) + 0);
                y = (Math.floor(Math.random() * (300 - 0)) + 0);
                x = x - x % 20;
                y = y - y % 20;
                return (
                    x,
                    y
                )
            }
            this.changePlaceApple = () => {

                for (let i = 0; i < myGameBarrier.current.x.length; i++) {
                    if (myGameBarrier.current.x[i] + myGameBarrier.current.width > this.x && this.x >= myGameBarrier.current.x[i] && myGameBarrier.current.y[i] + myGameBarrier.current.height > this.y && this.y >= myGameBarrier.current.y[i]) {

                        this.randomPlaceApple(this.x, this.y)
                    }

                    else if ((myGamePiece.current.x === this.x && myGamePiece.current.y === this.y) || (myGamePiece.current.x === this.x && myGamePiece.current.y + 1 === this.y)) {

                        myGamePiece.current.partBodySnakeCounter++;

                        myGamePiece.current.partBodySnake.push({
                            x: this.scale,
                            y: this.scale
                        })

                        countPoints(myGamePiece.current.partBodySnakeCounter);

                        this.randomPlaceApple(this.x, this.y)
                    }

                    myGameArea.canvas.fillStyle = color;

                    myGameArea.canvas.fillRect(this.x, this.y, sizeX, sizeY);

                }
            }

        };

        myGameApple.current = new Apple(40, 40, 'black', 20, 20);

    });

    useEffect(() => {

        function SnakeDraw(color = "white", sizeX = 20) {
            this.scale = sizeX;
            this.snakeX = 20;
            this.snakeY = 20;
            this.scoreArray = [];
            this.speedX = this.scale * 1;
            if (this.speedX === this.scale * 1) this.direction = "right";
            this.speedY = 0;
            this.colorTail = "black";
            this.partBodySnake = [];
            this.partBodySnakeCounter = 0;

            this.partBodySnake[0] = {
                x: this.scale,
                y: this.scale
            }
            this.move = (direction) => {


                this.direction = direction

                switch (this.direction) {
                    case "left":
                        myGamePiece.current.speedX = -myGamePiece.current.scale;
                        myGamePiece.current.speedY = 0

                        break;
                    case "right":
                        myGamePiece.current.speedX = +myGamePiece.current.scale;
                        myGamePiece.current.speedY = 0

                        break;
                    case "up":

                        myGamePiece.current.speedX = 0
                        myGamePiece.current.speedY = -myGamePiece.current.scale

                        break;
                    case "down":

                        myGamePiece.current.speedX = 0
                        myGamePiece.current.speedY = +myGamePiece.current.scale

                        break;
                    default:
                        throw new Error("the direction does not exist")
                }

            }
            this.update = function () {

                this.snakeTurns()

                this.x = this.snakeX;
                this.y = this.snakeY;

                const squareSnake = (partBody, i) => {
                    return (
                        myGameArea.canvas.strokeStyle = (i === 0) ? color : this.colorTail,
                        myGameArea.canvas.strokeRect(partBody.x, partBody.y, this.scale, this.scale)
                    )
                }
                this.partBodySnake.map(squareSnake)

            }
            this.snakeTurns = function () {

                this.snakeX = myGamePiece.current.partBodySnake[0].x;
                this.snakeY = myGamePiece.current.partBodySnake[0].y;
                myGamePiece.current.partBodySnake.pop()


                if (this.direction === "right") {

                    if (this.x >= myGameArea.canvas.width - 20) this.x = -20;
                }
                else if (this.direction === "down") {
                    if (this.y >= myGameArea.canvas.width - 20) this.y = -20;

                }

                else if (this.direction === "left") {

                    if (this.x <= 0) this.x = myGameArea.canvas.width;
                }
                else if (this.direction === "up") {
                    if (this.y <= 0) this.y = myGameArea.canvas.width;
                }


                if (this.direction === "left") this.snakeX -= this.scale;
                if (this.direction === "up") this.snakeY -= this.scale;
                if (this.direction === "right") this.snakeX += this.scale;
                if (this.direction === "down") this.snakeY += this.scale;


                if (this.direction === "right") {

                    if (this.snakeX >= myGameArea.canvas.width) this.snakeX = 0;

                }
                else if (this.direction === "down") {

                    if (this.snakeY >= myGameArea.canvas.width) this.snakeY = 0;

                }
                else if (this.direction === "left") {

                    if (this.snakeX <= -20) this.snakeX = myGameArea.canvas.width - 20;

                }
                else if (this.direction === "up") {
                    if (this.snakeY <= -20) this.snakeY = myGameArea.canvas.width - 20;

                }

                this.x += this.speedX;
                this.y += this.speedY;

                let newHead = {
                    x: this.snakeX,
                    y: this.snakeY
                }

                this.partBodySnake.unshift(newHead)

                this.snakeCollision(this.snakeX, this.snakeY, newHead)




            }
            this.snakeCollision = (snakeX, snakeY, newHead) => {

                for (let i = 1; i < myGamePiece.current.partBodySnake.length; i++) {

                    if ((snakeX === myGamePiece.current.partBodySnake[i].x && snakeY === myGamePiece.current.partBodySnake[i].y)) {
                        this.snakeReturnHome(snakeX, snakeY, newHead)


                    }

                }
                for (let i = 0; i < myGameBarrier.current.x.length; i++) {

                    if ((myGameBarrier.current.x[i] + myGameBarrier.current.width > snakeX && snakeX >= myGameBarrier.current.x[i] && myGameBarrier.current.y[i] + myGameBarrier.current.height > snakeY && snakeY >= myGameBarrier.current.y[i])) {
                        this.snakeReturnHome(snakeX, snakeY, newHead)

                    }

                }
            }
            this.snakeReturnHome = (snakeX, snakeY, newHead) => {
                setPoints(0)

                myGamePiece.current.partBodySnake[0].x = 20;
                myGamePiece.current.partBodySnake[0].y = 20;

                snakeX = myGamePiece.current.partBodySnake[0].x
                snakeY = myGamePiece.current.partBodySnake[0].y




                newHead = {
                    x: snakeX,
                    y: snakeY
                }

                myGamePiece.current.partBodySnake.splice(0, myGamePiece.current.partBodySnake.length, newHead)
            }
        }

        myGamePiece.current = new SnakeDraw();


    }, [score, setPoints]);


    const updateGameArea = () => {

        myGameArea.clear();

        myGameBarrier.current.drawBarrier()

        myGamePiece.current.update();

        myGameApple.current.changePlaceApple();
        setTimeout(function () {
            myGameArea.interval = requestAnimationFrame(updateGameArea)
        }, 300)
    }

    return (
        <>
            <canvas className='canvas' ref={myRef} style={{ backgroundColor: 'green' }} width={300} height={300} />
            <div className='listButtons'>
                <button onClick={() => myGamePiece.current.move('up')}>up</button>
                <button onClick={() => myGamePiece.current.move('down')}>down</button>
                <button onClick={() => myGamePiece.current.move('left')}>left</button>
                <button onClick={() => myGamePiece.current.move('right')}>right</button>
            </div>
        </>
    );

}

export default Canvas