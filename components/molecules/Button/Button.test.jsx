import React from 'react';

import { render } from '@parse/test-utils';

import { Button } from '@molecules';

function renderButton() {
  return render(<Button />);
}

describe('Button', () => {
  it('Button 컴포넌트가 제대로 렌더링 되는지 확인한다', () => {
    const { container } = renderButton();

    expect(container).toBeTruthy();
  });
});
