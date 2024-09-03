import updateGraphUrl from '@/app/utils/updateGraphUrl';

describe('updateGraphUrl', () => {
  test('Correct path with type body', () => {
    expect(updateGraphUrl({ type: 'body', value: 'value' }));
  });
});
