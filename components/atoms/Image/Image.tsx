import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ImageProps {
  src: string;
  alt: string;
  height: string;
  width?: string;
  className?: string;
}

const Wrapper = styled.img`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export default function Image({
  src,
  alt,
  height,
  width = 'auto',
  className = '',
}: ImageProps): ReactElement {
  return (
    <Wrapper
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
