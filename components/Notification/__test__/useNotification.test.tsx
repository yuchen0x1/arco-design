import React, { createContext, useState } from 'react';
import Notification from '..';
import { ConfigProvider } from '../..';
import { render, $, act, fireEvent } from '../../../tests/util';

describe('useNotification Test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('useNotification', async () => {
    let notification;
    const ConfigContext = createContext({});

    const TestComponent = () => {
      const [notificationApi, contextHolder] = Notification.useNotification({});
      notification = notificationApi;

      return (
        <div>
          <ConfigProvider prefixCls="demo" rtl effectGlobalNotice={false}>
            <ConfigContext.Provider value="PJY">{contextHolder}</ConfigContext.Provider>
          </ConfigProvider>
        </div>
      );
    };

    const wrapper = render(<TestComponent />);

    // prefixCls: demo
    act(() => {
      notification.info?.({
        content: <ConfigContext.Consumer>{(name) => name}</ConfigContext.Consumer>,
      });
    });
    expect(wrapper.find('.demo-notification')[0].classList).toContain('demo-notification-rtl');
    expect(wrapper.find('.demo-notification-content')[0].innerHTML).toBe('PJY');

    // prefixCls: arco
    act(() => {
      Notification.info?.({
        content: 'YYH',
        duration: 0,
      });
    });
    expect($('.arco-notification')).toHaveLength(1);
    expect($('.arco-notification-content')[0].innerHTML).toBe('YYH');
  });

  it('notification update', async () => {
    let notification;
    const TestComponent = () => {
      const [notificationApi, contextHolder] = Notification.useNotification({ maxCount: 2 });
      notification = notificationApi;

      return (
        <div>
          <ConfigProvider>{contextHolder}</ConfigProvider>
        </div>
      );
    };

    const wrapper = render(<TestComponent />);

    act(() => {
      notification.info?.({
        id: 'demo',
        content: 'PJY',
      });
    });
    expect(wrapper.find('.arco-notification-content')[0].innerHTML).toBe('PJY');
    act(() => {
      notification.info?.({
        id: 'demo',
        content: 'YYH',
      });
    });
    expect(wrapper.find('.arco-notification-content')[0].innerHTML).toBe('YYH');
  });

  it('useNotification getcontainer', async () => {
    let notification;
    const TestComponent = () => {
      const [notificationApi, contextHolder] = Notification.useNotification({
        getContainer: () => document.getElementById('root') as HTMLElement,
      });
      notification = notificationApi;

      return (
        <div>
          {contextHolder}
          <div id="root" />
        </div>
      );
    };

    const wrapper = render(<TestComponent />);

    act(() => {
      notification.info?.({
        content: 'hahahah',
      });
    });
    expect(wrapper.find('#root .arco-notification')).toHaveLength(1);
  });

  it('keeps one holder when rerendering', async () => {
    let notification;
    let forceRerender;

    const TestComponent = () => {
      const [, setRenderCount] = useState(0);
      const [notificationApi, contextHolder] = Notification.useNotification({});
      notification = notificationApi;
      forceRerender = () => setRenderCount((count) => count + 1);

      return <div>{contextHolder}</div>;
    };

    render(<TestComponent />);

    act(() => {
      notification.info?.({
        content: 'before rerender',
      });
    });
    act(() => {
      forceRerender();
    });
    act(() => {
      notification.info?.({
        content: 'after rerender',
      });
    });

    expect($('.arco-notification-wrapper')).toHaveLength(1);
    expect($('.arco-notification')).toHaveLength(2);
  });

  it('does not duplicate notices queued before the holder mounts', async () => {
    const TestComponent = () => {
      const [notification, contextHolder] = Notification.useNotification({});

      return (
        <div>
          <button
            type="button"
            onClick={() => {
              notification.info?.({ content: 'first' });
              notification.info?.({ content: 'second' });
            }}
          >
            open
          </button>
          {contextHolder}
        </div>
      );
    };

    const wrapper = render(<TestComponent />);

    fireEvent.click(wrapper.querySelector('button')!);

    expect($('.arco-notification-wrapper')).toHaveLength(1);
    expect($('.arco-notification')).toHaveLength(2);
  });

  it('updates queued notices by id', async () => {
    const TestComponent = () => {
      const [notification, contextHolder] = Notification.useNotification({ maxCount: 2 });

      return (
        <div>
          <button
            type="button"
            onClick={() => {
              notification.info?.({ id: 'queued', content: 'first' });
              notification.info?.({ id: 'queued', content: 'second' });
            }}
          >
            open
          </button>
          {contextHolder}
        </div>
      );
    };

    const wrapper = render(<TestComponent />);

    fireEvent.click(wrapper.querySelector('button')!);

    expect($('.arco-notification')).toHaveLength(1);
    expect($('.arco-notification-content')[0].innerHTML).toBe('second');
  });

  it('applies maxCount to queued notices', async () => {
    const TestComponent = () => {
      const [notification, contextHolder] = Notification.useNotification({ maxCount: 2 });

      return (
        <div>
          <button
            type="button"
            onClick={() => {
              notification.info?.({ content: 'first' });
              notification.info?.({ content: 'second' });
              notification.info?.({ content: 'third' });
            }}
          >
            open
          </button>
          {contextHolder}
        </div>
      );
    };

    const wrapper = render(<TestComponent />);

    fireEvent.click(wrapper.querySelector('button')!);

    expect($('.arco-notification')).toHaveLength(2);
    expect($('.arco-notification-content')[0].innerHTML).toBe('second');
    expect($('.arco-notification-content')[1].innerHTML).toBe('third');
  });
});
