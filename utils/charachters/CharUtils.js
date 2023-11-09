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
            function move(x0, t) { return Math.cos(45)*90*t + x0 },
            function move(y0, t) { return -0.5*9.81*(t**2) + Math.sin(45)*90*t + y0 }
        )
    ];

    static nextPlayer(currentCharIndex, prev = false) {
        let char = this.chars[currentCharIndex]
        
        if (prev && currentCharIndex >= 1) {
            char =  this.chars[currentCharIndex - 1];
        } else if (!prev && currentCharIndex < this.chars.length) {
            char = this.chars[currentCharIndex + 1];
        }

        return char;
    }
}