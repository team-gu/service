import {
  ReactElement,
  forwardRef,
  ReactNode,
  ChangeEvent,
  FocusEventHandler,
} from 'react';

interface TextareaProps {
  children?: ReactNode;
  rows?: number;
  cols?: number;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  onChange?: (() => ChangeEvent<HTMLInputElement>) | any;
  onBlur?: FocusEventHandler;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ children, ...rest }: TextareaProps, ref): ReactElement => {
    // TODO: current에 대한 타입 지정

    return (
      <textarea ref={ref} {...rest}>
        {children}
      </textarea>
    );
  },
);

export default Textarea;
