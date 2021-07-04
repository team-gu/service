import React from 'react';

import { render } from '@parse/test-utils';

import ModalWrapper from './ModalWrapper';

function renderModalWrapper() {
  return render(<ModalWrapper />);
}

describe('ModalWrapper', () => {
  it('ModalWrapper 컴포넌트가 제대로 렌더링 되는지 확인한다', () => {
    const { container } = renderModalWrapper();

    expect(container).toBeTruthy();
  });
});
