import { ReactElement, forwardRef, ReactNode, FocusEventHandler } from 'react';

interface TextareaProps {
  children?: ReactNode;
  rows?: number;
  cols?: number;
  placeholder?: string;
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
