class CharUtils {
    static chars = [
        new Character(
            1,
            'Super cow',
            'assets/character/cow/meuh.png',
            'assets/character/cow/weapons/coutal_beurre.png',
            'Close range combat. Deals <b>5</b> damages.',
            'assets/character/cow/weapons/milk_bucketpng.png',
            'Throw a milk bucket at your opponent. Deals <b>15</b> damages.',
            
            [
                {
                    ultEquaX: function move(x0, t) { return Math.cos(45)*90*t + x0 },
                    ultEquaY: function move(y0, t) { return -0.5*9.81*(t**2) + Math.sin(45)*90*t + y0 }
                }, 
                {
                    ultEquaX: function move(x0, t) { return -Math.cos(45)*90*t + x0 },
                    ultEquaY: function move(y0, t) { return -0.5*9.81*(t**2) + Math.sin(45)*90*t + y0 }
                }
            ]
        )
    ];

    static nextPlayer(currentCharIndex, prev = false) {
        let char = this.chars[currentCharIndex]
        
        if (prev && this.chars.indexOf(char) > 0) {
            char =  this.chars[currentCharIndex - 1];
        } else if (!prev && this.chars.indexOf(char) < this.chars.length - 1) {
            char = this.chars[currentCharIndex + 1];
        }

        return char;
    }

    static showChar(char, playerId) {
        document.getElementById('p' + playerId + '-char-name').innerHTML = char.name;
        document.getElementById('p' + playerId + '-char-png').src = char.pngSrc;
        document.getElementById('p' + playerId + '-char-primary-png').src = char.primarySrc;
        document.getElementById('p' + playerId + '-char-primary-desc').innerHTML = char.primaryDesc;
        document.getElementById('p' + playerId + '-char-ultimate-png').src = char.ultimateSrc;
        document.getElementById('p' + playerId + '-char-ultimate-desc').innerHTML = char.ultimateDesc;
        
        document.querySelector('#img-char-p' + playerId + ' img').src = char.pngSrc;
        document.querySelector('#weapon-p' + playerId + ' img').src = char.primarySrc;
        document.querySelector('#ultimate-p' + playerId + ' img').src = char.ultimateSrc;
        document.querySelector('#primary-icon-p' + playerId + ' img').src = char.primarySrc;
        document.querySelector('#ultimate-icon-p' + playerId + ' img').src = char.ultimateSrc;
    }
}