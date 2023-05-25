class intro extends Phaser.Scene {
    constructor() {
      super('intro');
    }
  
    create() {
        this.cameras.main.setBackgroundColor('#00000');
    
        const title = this.add.text(0, 0, '', {
            font: 'bold 100px Arial Black',
            fill: '#ffffff',
        });
        title.setOrigin(0.5, 1.2);
        title.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    
        const subtitle = this.add.text(0, 0, '', {
            font: 'bold 50px Arial Black',
            fill: '#ffffff',
        });
        subtitle.setOrigin(0.5, 0.5);
        subtitle.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    
        const texts = ["Left and right arrowkeys to move", "Up arrowkey to jump"];
        const run = ["Run."];
        let currentIndex = -1;
    
        const showNextText = () => {
            currentIndex++;
            if (currentIndex === texts.length) {
                return; // Break out of the function when all texts have been shown
            }
    
            // Show the next text
            const currentText = texts[currentIndex];
            title.setText(currentText);
            subtitle.setText('');
    
            // Fade in the current text
            this.tweens.add({
                targets: title,
                alpha: 1,
                duration: 3000,
                ease: 'Power1',
                onComplete: () => {
                    // Fade out the current text
                    this.tweens.add({
                        targets: title,
                        alpha: 0,
                        duration: 3000,
                        ease: 'Power1',
                        onComplete: showNextText,
                    });
                }
            });
        }
        this.time.delayedCall(12000, () => {
            title.setText(run[0]);
            // Show the last text ("Run.")
            this.tweens.add({
                targets: title,
                alpha: 1,
                duration: 3000,
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
            });

            title.on('pointerout', () => {
                this.tweens.add({
                targets: title,
                scale: 1,
                duration: 200,
                ease: 'Power1',
                });
            });

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
                        this.time.delayedCall(1000, () => this.scene.start('start'));
                    },
                });
            });
    });

    showNextText();
    }
}

class end extends Phaser.Scene {
    constructor() {
        super('end');
    }
    create() {
        this.add.text(50, 50, "You Win!").setFontSize(50);
        this.add.text(50, 1000, "Play Again?").setFontSize(100);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [intro, start, start2, start3, sum, end],
    title: "Runner",
    background: "#00000",
});

