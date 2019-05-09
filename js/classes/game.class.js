export class Game {        
    constructor(container, image, size, gutter) {        
        this.container = container;
        this.image = image;
        this.size = size;
        this.gutter = gutter || 15;
        this.imageBase = this.image.baseTexture;
        this.imageBaseWidth = this.imageBase.width;
        this.imageBaseHeight = this.imageBase.height;
        this.puzzleWidth = this.imageBaseWidth / size;
        this.puzzleHeight = this.imageBaseHeight / size;
        this.puzzleCount = 0;
        this.puzzleInOrder = [];
        this.shufflePuzzle = [];
    }

    initStage() {
        this.initObject();
        this.createShuffleArray();
        this.printPuzzles();
    }

    initObject() {
        for( let i = 0; i < this.size; i++ ) {
            for( let j = 0; j < this.size; j++ ) {
                let rectangle = new PIXI.Rectangle( 
                    j * this.puzzleWidth,
                    i * this.puzzleHeight,
                    this.puzzleWidth,
                    this.puzzleHeight
                );

                let puzzleSprite = this.createPuzzleSprite(this.image, rectangle);
                this.puzzleInOrder.push(puzzleSprite);
            }        
        }
    }

    createShuffleArray() {        
        this.shufflePuzzle = this.puzzleInOrder;
        this.shufflePuzzle.pop();
        this.shufflePuzzle.sort(function() {
            return 0.5 - Math.random()
        });

        let puzzle = { value: 0 };
        this.shufflePuzzle.push(puzzle);
    }    

    printPuzzles() {
        for( let i = 0; i < this.shufflePuzzle.length; i++ ) {            
            let row = Math.floor( i / this.size );
            let col = i % this.size;
            let elem = this.shufflePuzzle[i];
    
            if( elem.value != 0 ) {
                elem.position.x = col * this.puzzleWidth + col * this.gutter;
                elem.position.y = row * this.puzzleHeight + row * this.gutter;
        
                this.container.addChild(elem);
            }
        }
    }

    createPuzzleSprite(image, frame) {
        let puzzleTexture = new PIXI.Texture(image, frame);
        let puzzle = new PIXI.Sprite(puzzleTexture);

        this.puzzleCount++;

        puzzle.value = this.puzzleCount;
        puzzle.interactive = true;
        puzzle.buttonMode = true;
        
        puzzle.on('pointerdown', this.movePuzzle.bind(this, puzzle));

        return puzzle;
    }

    movePuzzle(puzzle) {
        let emptySlotIndex = this.shufflePuzzle.findIndex(x => x.value === 0);
        let thisIndex = this.shufflePuzzle.findIndex(x => x.value === puzzle.value);
        let horizontalMove = this.puzzleWidth + this.gutter;
        let verticalMove = this.puzzleHeight + this.gutter;        
        let moveVal;
        let isMoved = false;

        switch( thisIndex - emptySlotIndex ) {
            case -1:
                moveVal = puzzle.x + horizontalMove;
                TweenMax.to( puzzle, .5, { x: moveVal } );
                isMoved = true;
                break;
            case 1:
                moveVal = puzzle.x - horizontalMove;
                TweenMax.to( puzzle, .5, { x: moveVal } );
                isMoved = true;
                break;
            case -this.size:
                moveVal = puzzle.y + verticalMove;
                TweenMax.to( puzzle, .5, { y: moveVal } );
                isMoved = true;
                break;
            case this.size:
                moveVal = puzzle.y - verticalMove;
                TweenMax.to( puzzle, .5, { y: moveVal } );
                isMoved = true;
                break;            
        }

        if( isMoved ) {
            let swapVal = this.shufflePuzzle[emptySlotIndex];
            this.shufflePuzzle[emptySlotIndex] = this.shufflePuzzle[thisIndex];
            this.shufflePuzzle[thisIndex] = swapVal;
        }
    }

}