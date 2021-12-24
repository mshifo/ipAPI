import ResizeService from '../services/ResizeService';
import * as fs from 'fs';

describe('test resize function', () => {
    it('should return valid data object', async () => {
        const service = new ResizeService(
            'santamonica.jpg',
            500,
            1000,
        );
        const result = await service.resizeImage();
        expect(
            fs.existsSync(`./images/resized/santamonica.jpg`),
        ).toBeTruthy();
        expect(Object.keys(result)).toContain('format');
        expect(Object.keys(result)).toContain('width');
        expect(Object.keys(result)).toContain('height');
    });
});
