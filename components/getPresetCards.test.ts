import { getPresetCards } from "./helpers";
import { allCards } from "../cards";
import { Card } from "../types";

describe('getPresetCards', () => {
    it('should return an array of shuffled preset cards based on difficulty level', () => {   
        // Тестирование для difficulty level 1
        const difficultyLevel1 = '1';
        const resultLevel1 = getPresetCards({ allCards, choosedDifficultyLevel: difficultyLevel1 });
        expect(resultLevel1).toHaveLength(6); // 3 pairs of cards
    
        // Тестирование для difficulty level 2
        const difficultyLevel2 = '2';
        const resultLevel2 = getPresetCards({ allCards, choosedDifficultyLevel: difficultyLevel2 });
        expect(resultLevel2).toHaveLength(12); // 6 pairs of cards
    
        // Тестирование для difficulty level 3
        const difficultyLevel3 = '3';
        const resultLevel3 = getPresetCards({ allCards, choosedDifficultyLevel: difficultyLevel3 });
        expect(resultLevel3).toHaveLength(18); // 9 pairs of cards
      });
    
      it('should return an empty array if difficulty level is not valid', () => {
        const allCards: Card[] = [];
    
        const invalidDifficultyLevel = 'invalid';
        const result = getPresetCards({ allCards, choosedDifficultyLevel: invalidDifficultyLevel });
        expect(result).toEqual([]); // Проверка, что возвращается пустой массив при неверном уровне сложности
      });

})