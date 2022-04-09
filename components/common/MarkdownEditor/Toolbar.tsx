/* eslint-disable no-param-reassign */
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { Button } from '@/components/ui';

type ToolbarProps = {
  preview?: boolean;
  onPreview?: (preview: boolean) => void;
};

/**
 * NOTE: 直接使用onClick方法, 该元素会获取到焦点, 此时输入框没有焦点, 无法进行正常的插入
 * 所以使用onMouseDown方法阻止默认的获取焦点事件, 或者使用Button也可以实现
 *
 * <Icon onMouseDown={preventDefault} />
 */
const Toolbar = ({ preview, onPreview }: ToolbarProps) => (
  <div className='flex items-center justify-between bg-white-1 py-[2px] px-1 leading-normal dark:bg-white-1--dark'>
    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={preview ? 'preview' : 'edit'}
        addEndListener={(node, done) =>
          node.addEventListener('transitionend', done, false)
        }
        classNames='move-reverse'
      >
        <span className='text-xxs text-gray-3 dark:text-gray-3--dark'>
          {preview ? 'PREVIEW' : 'EDIT'}
        </span>
      </CSSTransition>
    </SwitchTransition>

    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={preview ? 'preview' : 'edit'}
        addEndListener={(node, done) =>
          node.addEventListener('transitionend', done, false)
        }
        classNames='move'
      >
        <Button
          className={classNames(
            'bg-white-3 py-1 px-2 text-xxs hover:bg-white-2 hover:text-gray-3 dark:bg-white-3--dark dark:text-gray-3--dark'
          )}
          size='small'
          onClick={() => {
            onPreview?.(!preview);
          }}
        >
          {preview ? '编辑' : '预览'}
        </Button>
      </CSSTransition>
    </SwitchTransition>
  </div>
);

export default Toolbar;
