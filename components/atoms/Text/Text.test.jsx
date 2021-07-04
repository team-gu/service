import React from 'react';

import { render } from '@parse/test-utils';

import { Text } from '@atoms';

function renderText() {
  return render(<Text />);
}

describe('Text', () => {
  it('Text 컴포넌트가 제대로 렌더링 되는지 확인한다', () => {
    const { container } = renderText();

    expect(container).toBeTruthy();
  });
});
