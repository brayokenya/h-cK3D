import {KeepHtmlPipe} from './keep-html.pipe';

describe('KeepHtmlPipe', () => {
    it('create an instance', () => {
        const pipe = new KeepHtmlPipe(null);
        expect(pipe).toBeTruthy();
    });
});
