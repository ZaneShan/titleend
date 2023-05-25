class intro extends Phaser.Scene {
    constructor() {
      super('intro');
    }

    preload() {
        this.load.image("rolypoly", "roly poly.png")
    }
  
    create() {
        this.cameras.main.setBackgroundColor('#32bf22');
    
        const title = this.add.text(0, 0, 'Roly Poly: To the End', {
            font: 'bold 50px Arial Black',
            fill: '#102f9e',
        });
        title.setOrigin(0.5, 0.5);
        title.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        this.rolypoly = this.add.sprite(this.cameras.main.width / 3, this.cameras.main.height / 4, "rolypoly")
        .setScale(0.5)

        this.tweens.add({
            targets: this.rolypoly,
            angle: 360,
            repeat: -1,
            duration: 500,
            // ease: 'Power1',
        });
        this.tweens.add({
            targets: this.rolypoly,
            scale: {from: 0.2, to: 1},
            yoyo: true,
            duration: 500,
            repeat: -1
        })

        this.tweens.add({
            targets: title,
            scale: 1,
            duration: 200,
            ease: 'Power1',
        });
        
        title.setInteractive();
        title.on('pointerover', () => {
            this.tweens.add({
            targets: title,
            scale: 1.2,
            duration: 200,
            ease: 'Power1',
            });
        }); //hover over effect

        title.on('pointerout', () => {
            this.tweens.add({
            targets: title,
            scale: 1,
            duration: 200,
            ease: 'Power1',
            });
        }); //hover over effect end

        title.on('pointerdown', () => {
            this.tweens.add({
                targets: title,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 50,
                yoyo: true,
                ease: 'Power1',
                onComplete: () => {
                    this.cameras.main.fade(1000, 0, 0, 0);
                    this.time.delayedCall(1000, () => this.scene.start('end'));
                },
            });
        }); //transition to end on click
    }
}

class end extends Phaser.Scene { //victory screen
    constructor() {
        super('end');
    }

    preload() {
        this.load.image("rolypoly", "roly poly.png")
    }

    create() {
        this.cameras.main.setBackgroundColor('#32bf22');

        this.rolypoly = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "rolypoly")

        const win = this.add.text(100, 50, "You Win!").setFontSize(50);
        win.setOrigin(0.3, 0.7);
        
        const reset = this.add.text(1500, 1000, "Play Again?").setFontSize(100)
        reset.setOrigin(0.7, 0.7)
        reset.setInteractive()
        reset.on('pointerover', () => {
            this.tweens.add({
            targets: reset,
            scale: 1.2,
            duration: 200,
            ease: 'Power1',
            });
        }) //hover over effect

        reset.on('pointerout', () => {
            this.tweens.add({
            targets: reset,
            scale: 1,
            duration: 200,
            ease: 'Power1',
            });
        }) //hover over effect end

        reset.on('pointerdown', () => {
            this.tweens.add({
                targets: reset,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 50,
                yoyo: true,
                ease: 'Power1',
                onComplete: () => {
                    this.cameras.main.fade(1000, 0, 0, 0);
                    this.time.delayedCall(1000, () => this.scene.start('intro'));
                },
            });
        }); //transition to end on click
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [
        intro,
        end
    ],
    title: "rolypoly",
    background: "#00000", 
});

