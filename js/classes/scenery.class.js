export class Scenery {
    constructor(app) {
        this.outerContainer = new PIXI.Container();
        this.container = new PIXI.particles.ParticleContainer();
        this.app = app;
        this.width = this.app.renderer.width;
        this.height = this.app.renderer.height;
        this.elemsArray = [];
    }

    initScenery() {
        this.app.stage.addChild(this.outerContainer);
        
        let fBlur = new PIXI.filters.BlurFilter();
        fBlur.blur = 18;
        this.outerContainer.filters = [fBlur];
        this.outerContainer.filterArea = new PIXI.Rectangle(0, 0, this.width, this.height);
        this.outerContainer.addChild(this.container);        
        this.generateSnowflakes();
    }

    generateSnowflakes() {
        let count = 1000;

        for (let i = 0; i < count; i++) {
            let elem = new PIXI.Sprite.fromImage('../../img/snowflake.png');
            elem.position.x = this.randomPosition(0, this.width);
            elem.position.y = this.randomPosition(0, this.height);
            elem.scale.set( 0.2 + Math.random() );
            elem.tint = Math.random() * 0xffffff;
            elem.speed = 1 + Math.random() * 3;
            elem.velocity = -1 + Math.random() * 2
            this.elemsArray.push(elem);
            
            this.container.addChild(elem);                
        }
        this.app.ticker.add(this.animateSnow.bind(this));
    }

    animateSnow() {
        for( let i = 0; i < this.elemsArray.length; i++ ) {
            let elem = this.elemsArray[i];
            elem.position.y += elem.speed;

            if( elem.position.y > this.height ) {
                elem.position.y = -30;
            }

            if( Math.random() > 0.99 ) {
                elem.velocity = -elem.velocity;
            }

            elem.position.x += elem.velocity;

            if( elem.position.x > this.width ) {
                elem.position.x = -5;
            }
            if( elem.position.x < -5 ) {
                elem.position.x = this.width;
            }
        }
    }

    generateSnow() {         
        let colorsArray = ['0xFFFFFF', '0x7a1111', '0x447ebf', '0x9D4478', '0x45af59', '0xc8ae48'];
        let count = 10000;

        for (let i = 0; i < count; i++) {
            let elem = new PIXI.Graphics();
            elem.beginFill( this.randomColor(colorsArray) );
            elem.drawCircle(
                this.randomPosition(0, this.width), 
                this.randomPosition(0, this.height),
                this.randomPosition(1, 6)
            );
            elem.endFill();
            this.elemsArray.push(elem);            
            this.container.addChild(elem);            
        }
    }

    randomColor(palette) {
        let length = palette.length;
        let colorNo = Math.floor( Math.random() * length );

        return palette[colorNo];
    }

    randomPosition(min, max) {
        return min + Math.random() * max;
    }
}