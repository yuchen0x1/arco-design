import React, { CSSProperties, forwardRef, useContext } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import LineProgress from './line-progess';
import CircleProgress from './circle-progress';
import StepsProgress from './steps-progress';
import { ProgressProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import omit from '../_util/omit';

const defaultProps: ProgressProps = {
  type: 'line',
  showText: true,
  percent: 0,
  size: 'default',
};

function Progress(baseProps: ProgressProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<ProgressProps>(baseProps, defaultProps, componentConfig?.Progress);
  const {
    className,
    style,
    size,
    width,
    strokeWidth,
    steps,
    percent: rawPercent,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-valuetext': ariaValueText,
    ...rest
  } = props;
  const percent = Number.isFinite(rawPercent) ? Math.min(100, Math.max(0, rawPercent)) : 0;
  const progressbarProps = {
    role: 'progressbar',
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuenow': percent,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-valuetext': ariaValueText,
  };

  const type = steps && props.type !== 'circle' ? 'steps' : props.type;

  const prefixCls = getPrefixCls('progress');
  const status = 'status' in props ? props.status : percent >= 100 ? 'success' : 'normal';

  const sharedProps = { ...props, percent, status, prefixCls, progressbarProps };
  const widthStyle: CSSProperties = { width };

  if (size === 'mini' && type === 'line') {
    widthStyle.width = width || 16;
    widthStyle.height = width || 16;
  }

  return (
    <div
      ref={ref}
      className={cs(
        prefixCls,
        `${prefixCls}-${type}`,
        `${prefixCls}-${size}`,
        {
          [`${prefixCls}-is-${status}`]: status !== 'normal',
          [`${prefixCls}-rtl`]: rtl,
        },
        className
      )}
      style={{ ...widthStyle, ...style }}
      {...omit(rest, [
        'type',
        'animation',
        'status',
        'color',
        'trailColor',
        'showText',
        'formatText',
        'buffer',
        'bufferColor',
      ])}
    >
      {type === 'steps' && (
        <StepsProgress {...sharedProps} type={type} />
      )}

      {type === 'circle' && (
        <CircleProgress
          width={props.width as any}
          {...sharedProps}
          pathStrokeColor={props.trailColor}
        />
      )}
      {type === 'line' &&
        (size === 'mini' ? (
          <CircleProgress
            pathStrokeColor={props.trailColor}
            {...sharedProps}
            pathStrokeWidth={strokeWidth || 4}
            width={(width as number) || 16}
            strokeWidth={strokeWidth || 4}
          />
        ) : (
          <LineProgress {...sharedProps} />
        ))}
    </div>
  );
}

const ProgressRef = forwardRef(Progress);

ProgressRef.displayName = 'Progress';

export default ProgressRef;

export { ProgressProps };
