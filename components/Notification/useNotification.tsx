import React, { useMemo, useRef } from 'react';
import ContextHolderElement, { HolderRef } from '../_util/contextHolder';
import Notification, { ConfigProps } from '.';
import { NotificationProps, NotificationHookReturnType } from './interface';
import { isUndefined } from '../_util/is';

// @deprecated
export type notificationFuncType = NotificationHookReturnType;

type NotificationPosition = NonNullable<NotificationProps['position']>;

function useNotification(
  commonConfig: ConfigProps = {}
): [NotificationHookReturnType, JSX.Element] {
  const { maxCount, duration = 3000, prefixCls: _prefixCls, getContainer } = commonConfig;
  const contextHolderRef = useRef<HolderRef>();
  const holderEle = useMemo(() => <ContextHolderElement ref={contextHolderRef} />, []);
  const notificationInstance = useRef<Partial<Record<NotificationPosition, Notification>>>(
    {}
  ).current;
  const pendingNotices = useRef<Partial<Record<NotificationPosition, NotificationProps[]>>>(
    {}
  ).current;
  let notice;

  function addNoticeToInstance(pos: NotificationPosition, noticeProps: NotificationProps) {
    const instance = notificationInstance[pos];
    if (!instance) return;

    const notices = instance.state.notices;
    const updated = noticeProps.id ? notices.find((item) => item.id === noticeProps.id) : undefined;

    if (maxCount && notices.length >= maxCount && !updated) {
      const evicted = notices[0];
      notices.shift();
      instance.add({ ...noticeProps, id: evicted.id });
    } else {
      instance.add(noticeProps);
    }
  }

  function flushPendingNotices(pos: NotificationPosition, pending: NotificationProps[]) {
    const instance = notificationInstance[pos];
    if (!instance) return;

    const notices: NotificationProps[] = [];
    pending.forEach((noticeProps) => {
      const updatedIndex = noticeProps.id
        ? notices.findIndex((item) => item.id === noticeProps.id)
        : -1;

      if (updatedIndex > -1) {
        notices[updatedIndex] = noticeProps;
        return;
      }

      if (maxCount && notices.length >= maxCount) {
        const evicted = notices.shift();
        notices.push({ ...noticeProps, id: evicted.id });
        return;
      }
      notices.push(noticeProps);
    });

    notices.forEach((noticeProps) => instance.add(noticeProps));
  }

  function addNotice(noticeProps: NotificationProps) {
    let prefixCls, rtl;
    if (contextHolderRef.current) {
      const contextConfig = contextHolderRef.current.getContextConfig();
      rtl = contextConfig.rtl;
      prefixCls = contextConfig.prefixCls;
    }
    const mergedPrefixCls = _prefixCls || prefixCls;
    let position = noticeProps.position;
    if (isUndefined(noticeProps.position)) {
      position = rtl ? 'topLeft' : 'topRight';
    }
    const pos = position as NotificationPosition;
    const _noticeProps = {
      duration,
      ...noticeProps,
    };

    if (notificationInstance[pos]) {
      addNoticeToInstance(pos, _noticeProps);
    } else if (pendingNotices[pos]) {
      pendingNotices[pos].push(_noticeProps);
    } else {
      pendingNotices[pos] = [_noticeProps];
      notice = (
        <Notification
          ref={(instance) => {
            if (!instance) return;
            notificationInstance[pos] = instance;
            const pending = pendingNotices[pos];
            if (pending) {
              delete pendingNotices[pos];
              flushPendingNotices(pos, pending);
            }
          }}
          prefixCls={mergedPrefixCls}
          rtl={rtl}
          getContainer={getContainer}
        />
      );
      contextHolderRef.current.addInstance(notice);
    }
    return notificationInstance[pos];
  }

  const notificationFuncs: NotificationHookReturnType = {};

  ['info', 'success', 'warning', 'error', 'normal'].forEach((type) => {
    notificationFuncs[type] = (config: NotificationProps) => {
      return addNotice({
        ...config,
        type,
      });
    };
  });

  notificationFuncs.remove = (id: string) => {
    (Object.keys(notificationInstance) as NotificationPosition[]).forEach((pos) => {
      notificationInstance[pos]?.remove(id);
    });
  };

  return [notificationFuncs, holderEle];
}

export default useNotification;
