import React from 'react';

import { render } from '@parse/test-utils';

import { Image } from '@atoms';

function renderImage() {
  return render(<Image />);
}

describe('Image', () => {
  it('Image 컴포넌트가 제대로 렌더링 되는지 확인한다', () => {
    const { container } = renderImage();

    expect(container).toBeTruthy();
  });
});
