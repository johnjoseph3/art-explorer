import { ArtPage } from './app.po';

describe('art App', () => {
  let page: ArtPage;

  beforeEach(() => {
    page = new ArtPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
