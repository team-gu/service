import React from 'react';

import { render } from '@parse/test-utils';

import { Modal } from '@organisms';
import { MODALS } from '@utils/constants';

function renderModal() {
  return render(<Modal modalName={MODALS.ALERT_MODAL} />);
}

describe('Modal', () => {
  it('Modal 컴포넌트가 제대로 렌더링 되는지 확인한다', () => {
    const { container } = renderModal();

    expect(container).toBeTruthy();
  });
});
