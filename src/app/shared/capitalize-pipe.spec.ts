

import { CapitalizePipe } from './capitalize-pipe';

describe('CapitalizePipe', () => {

    let pipe: CapitalizePipe;

    beforeEach(() => {
        pipe = new CapitalizePipe();
    });

    it('should capitalize a lowercase string', () => {
        const returnValue = pipe.transform('ball');
        expect(returnValue).toBe('Ball');
    });

    it('should capitalize an uppercase string', () => {
        const returnValue = pipe.transform('BALL');
        expect(returnValue).toBe('BALL');
    });

    it('should not capitalize an null string', () => {
        const returnValue = pipe.transform(null);
        expect(returnValue).toBe(returnValue);
    });

    it('should not capitalize an undefined string', () => {
        const returnValue = pipe.transform(undefined);
        expect(returnValue).toBe(returnValue);
    });

    it('should not capitalize an empty string', () => {
        const returnValue = pipe.transform('');
        expect(returnValue).toBe(returnValue);
    });

    it('should not capitalize a non string', () => {
        const returnValue = pipe.transform(13);
        expect(returnValue).toBe(returnValue);
    });


});
