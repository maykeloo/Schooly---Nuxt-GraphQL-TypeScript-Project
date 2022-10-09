export const getEnName = (name: string) => {
      const letters = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];
      const replacement = ["a", "c", "e", "l", "n", "o", "s", "z", "z"];
      let nameEN = name.toLocaleLowerCase();

      for (let i = 0; i < letters.length; ++i) {
            nameEN = nameEN.replace(letters[i], replacement[i]);
      }

      return nameEN
}