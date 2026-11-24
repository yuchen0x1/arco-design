import { callbackOriginRef, getElementRef } from '../react-dom';

jest.mock('../is', () => ({
  ...(jest.requireActual('../is') as typeof import('../is')),
  isReact19: true,
}));

describe('getElementRef', () => {
  it('reads refs from props without accessing the deprecated React 19 element.ref getter', () => {
    const ref = jest.fn();
    const element = {
      props: { ref },
      get ref() {
        throw new Error('element.ref is deprecated in React 19');
      },
    };
    const node = document.createElement('div');

    expect(getElementRef(element)).toBe(ref);
    callbackOriginRef(element, node);
    expect(ref).toHaveBeenCalledWith(node);
  });
});
