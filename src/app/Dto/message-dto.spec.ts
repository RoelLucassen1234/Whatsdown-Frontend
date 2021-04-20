import { MessageDTO } from './message-dto';

describe('MessageDTO', () => {
  it('should create an instance', () => {
    expect(new MessageDTO("","","","","")).toBeTruthy();
  });
});
