import { FormatStringPipe } from './format-string.pipe';


describe('FormatString pipe test', () => {
  let pipe: FormatStringPipe;
  beforeEach(() => {
    pipe = new FormatStringPipe();
  });
  it('SHOULD transform "**hello world**" to "<strong>hello world</strong>"', () => {
    expect(pipe.transform('**hello world**', 'markdown'))
      .toEqual('<strong>hello world</strong>');
  });
  it('SHOULD not transform "**hello world**" to "<strong>hello world</strong>" if not from "markdown"',
    () => {
    expect(pipe.transform('**hello world**', ''))
      .toEqual('**hello world**');
  });
});
