import React, { ReactElement, useState, useEffect, useContext } from 'react';
import IconLoading from '../../icon/react-icon/IconLoading';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import DotLoading from './dot-loading';
import { SpinProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isEmptyReactNode } from '../_util/is';

function Spin(baseProps: SpinProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<SpinProps>(baseProps, {}, componentConfig?.Spin);
  const {
    style,
    className,
    children,
    loading: propLoading,
    size,
    icon,
    element,
    tip,
    dot,
    delay,
    block = false,
    ...rest
  } = props;

  const [loading, setLoading] = useState<boolean>(delay ? false : propLoading);

  const _usedLoading = delay ? loading : propLoading;
  const prefixCls = getPrefixCls('spin');

  useEffect(() => {
    if (delay) {
      const timer = setTimeout(() => setLoading(propLoading), delay);
      return () => clearTimeout(timer);
    }
  }, [propLoading, delay]);

  const loadingIcon = (
    <span className={`${prefixCls}-icon`}>
      {icon
        ? React.cloneElement(icon as ReactElement, {
            className: cs(`${prefixCls.replace('-spin', '-icon')}-loading`),
            style: {
              fontSize: size,
            },
          })
        : element ||
          (dot ? <DotLoading size={size} /> : <IconLoading style={{ fontSize: size }} />)}
    </span>
  );

  return (
    <div
      ref={ref}
      className={cs(
        prefixCls,
        {
          [`${prefixCls}-block`]: block,
          [`${prefixCls}-loading`]: _usedLoading,
          [`${prefixCls}-with-tip`]: tip && !children,
        },
        className
      )}
      style={style}
      {...rest}
    >
      {isEmptyReactNode(children) ? (
        <>
          {loadingIcon}
          {tip ? <div className={`${prefixCls}-tip`}>{tip}</div> : null}
        </>
      ) : (
        <>
          <div className={`${prefixCls}-children`}>{children}</div>
          {_usedLoading && (
            <div className={`${prefixCls}-loading-layer`} style={{ fontSize: size }}>
              <span className={`${prefixCls}-loading-layer-inner`}>
                {loadingIcon}
                {tip ? <div className={`${prefixCls}-tip`}>{tip}</div> : null}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const SpinComponent = React.forwardRef<unknown, SpinProps>(Spin);

SpinComponent.displayName = 'Spin';

export default SpinComponent;

export { SpinProps };
