import React from 'react';
import { render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Progress from '..';

mountTest(Progress);
componentConfigTest(Progress, 'Progress');

describe('Progress', () => {
  it('shows the success check for mini circles only at 100%', () => {
    const wrapper = render(<Progress percent={20} size="mini" status="success" type="circle" />);
    expect(wrapper.querySelector('.arco-progress-circle-svg')).toBeTruthy();
    expect(wrapper.querySelector('.arco-icon-check')).toBeNull();

    wrapper.rerender(<Progress percent={100} size="mini" status="success" type="circle" />);
    expect(wrapper.querySelector('.arco-progress-circle-svg')).toBeNull();
    expect(wrapper.querySelector('.arco-icon-check')).toBeTruthy();
  });

  it('preserves the accessible name and value through every rendering mode', () => {
    const { getByRole, rerender } = render(<Progress aria-label="Upload" percent={-10} />);
    const progress = () => getByRole('progressbar', { name: 'Upload' });
    expect(progress()).toHaveAttribute('aria-valuenow', '0');
    rerender(<Progress aria-label="Upload" percent={34} steps={5} aria-valuetext="Sending" />);
    expect(progress()).toHaveAttribute('aria-valuetext', 'Sending');
    rerender(<Progress aria-label="Upload" percent={125} type="circle" />);
    expect(progress()).toHaveAttribute('aria-valuenow', '100');
    rerender(<Progress aria-label="Upload" percent={100} size="mini" type="circle" />);
    expect(progress()).toHaveAttribute('aria-valuenow', '100');
    rerender(
      <div>
        <span id="upload">Upload</span>
        <Progress aria-labelledby="upload" percent={NaN} />
      </div>
    );
    expect(progress()).toHaveAttribute('aria-valuenow', '0');
  });

  it('render correctly ', () => {
    const wrapper = render(<Progress percent={10} />);
    expect(wrapper.querySelector('.arco-progress-line-text')!.innerHTML).toBe('10%');
    wrapper.rerender(<Progress percent={20} />);
    expect(wrapper.querySelector('.arco-progress-line-text')!.innerHTML).toBe('20%');

    expect(wrapper.querySelector('.arco-progress-line-inner')!.style.width).toBe('20%');
  });

  it('render correctly when width props is string', () => {
    const wrapper = render(<Progress percent={10} width="100%" />);
    expect(wrapper.find('.arco-progress').item(0).style.width).toBe('100%');
  });

  it('render correctly when width props is number', () => {
    const wrapper = render(<Progress percent={10} width={200} />);
    expect(wrapper.find('.arco-progress').item(0).style.width).toBe('200px');
  });

  it('render correctly when trailColor props is exist', () => {
    const wrapper = render(<Progress trailColor="rgb(0,0,0)" percent={10} width={200} />);
    expect(wrapper.getByRole('progressbar').style.backgroundColor).toBe('rgb(0, 0, 0)');
  });

  it('render correctly when trailColor props is exist & type is circle', () => {
    const wrapper = render(
      <Progress trailColor="rgb(0,0,0)" type="circle" percent={10} width={200} />
    );
    expect(wrapper.find('.arco-progress-circle-mask')[0].style.stroke).toBe('rgb(0,0,0)');
  });
});
