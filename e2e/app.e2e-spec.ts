import { ActorConnectionsPage } from './app.po';

describe('actor-connections App', function() {
  let page: ActorConnectionsPage;

  beforeEach(() => {
    page = new ActorConnectionsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
