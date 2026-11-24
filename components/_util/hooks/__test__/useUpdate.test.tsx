import React from 'react';
import { fireEvent, render } from '../../../../tests/util';
import useUpdate from '../useUpdate';

describe('useUpdate', () => {
  it('runs only when dependencies change', () => {
    const onUpdate = jest.fn();

    const TestComponent = ({ value }: { value: number }) => {
      useUpdate(onUpdate, [value]);
      return <div>{value}</div>;
    };

    const wrapper = render(<TestComponent value={1} />);
    expect(onUpdate).not.toHaveBeenCalled();

    wrapper.rerender(<TestComponent value={1} />);
    expect(onUpdate).not.toHaveBeenCalled();

    wrapper.rerender(<TestComponent value={2} />);
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it('does not run on unrelated rerenders with the default dependency list', () => {
    const onUpdate = jest.fn();

    const TestComponent = () => {
      const [, setRenderCount] = React.useState(0);
      useUpdate(onUpdate);

      return (
        <button type="button" onClick={() => setRenderCount((count) => count + 1)}>
          rerender
        </button>
      );
    };

    const wrapper = render(<TestComponent />);
    fireEvent.click(wrapper.querySelector('button')!);

    expect(onUpdate).not.toHaveBeenCalled();
  });
});
