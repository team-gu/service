import { ReactElement, forwardRef, ReactNode } from 'react';

interface TextareaProps {
  children: ReactNode;
  rows?: number;
  cols?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ children, ...rest }: TextareaProps, ref): ReactElement => {
    return (
      <textarea ref={ref} {...rest}>
        {children}
      </textarea>
    );
  },
);

export default Textarea;
