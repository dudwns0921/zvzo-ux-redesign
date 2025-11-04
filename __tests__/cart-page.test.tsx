import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartPage } from '../components/cart-page';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, title: 'Item 1', brand: 'Brand A', price: 100, quantity: 1, image: '' },
      { id: 2, title: 'Item 2', brand: 'Brand B', price: 200, quantity: 2, image: '' },
    ]),
  })
) as jest.Mock;

describe('CartPage', () => {
  it('should handle rapid quantity updates correctly', async () => {
    render(<CartPage />);

    // Wait for the cart to load
    await screen.findByText('Item 1');

    const decreaseButtons = screen.getAllByText('−');
    const item1DecreaseButton = decreaseButtons[0];

    // Rapidly decrease the quantity of the first item to 0
    act(() => {
      fireEvent.click(item1DecreaseButton);
    });

    // Check that the item is removed
    expect(screen.queryByText('Item 1')).toBeNull();
  });
});
