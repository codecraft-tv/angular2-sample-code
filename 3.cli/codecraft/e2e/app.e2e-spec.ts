import { CodecraftPage } from './app.po';

describe('codecraft App', function() {
  let page: CodecraftPage;

  beforeEach(() => {
    page = new CodecraftPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
