import { ProjectFolderPage } from './app.po';

describe('project-folder App', () => {
  let page: ProjectFolderPage;

  beforeEach(() => {
    page = new ProjectFolderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
