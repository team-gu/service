import {
  ReactElement,
  useEffect,
  forwardRef,
  ReactNode,
  FocusEventHandler,
} from 'react';

interface TextareaProps {
  children?: ReactNode;
  rows?: number;
  cols?: number;
  placeholder?: string;
  refValue?: string;
  onBlur: FocusEventHandler;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ children, refValue = '', ...rest }: TextareaProps, ref): ReactElement => {
    // TODO: current에 대한 타입 지정
    useEffect(() => {
      if (ref && refValue) {
        if (ref.current) {
          ref.current.value = refValue;
        }
      }
    }, []);

    return (
      <textarea ref={ref} {...rest}>
        {children}
      </textarea>
    );
  },
);

export default Textarea;
