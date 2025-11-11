import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FoodCard from '../components/FoodCard';
import { foodApi } from '@/lib/redux/services/foodApi';
import { ToastProvider } from '@/lib/context/ToastContext';
import type { FoodItem, Food } from '@/lib/types';

const mockFoodItem: FoodItem = {
  id: '1',
  name: 'Delicious Burger',
  price: 12.99,
  image: 'https://example.com/burger.jpg',
  brand: 'Burger Place',
  rating: 4.5,
  isOpen: true,
  logo: 'https://example.com/logo.jpg',
};

const mockFoodData: Food = {
  id: '1',
  name: 'Delicious Burger',
  Price: '12.99',
  rating: 4.5,
  image: 'https://example.com/burger.jpg',
  restaurantName: 'Burger Place',
  logo: 'https://example.com/logo.jpg',
  restaurant_logo: 'https://example.com/logo.jpg',
  status: 'Open Now',
};

const createMockStore = () => {
  return configureStore({
    reducer: {
      [foodApi.reducerPath]: foodApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(foodApi.middleware),
  });
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const store = createMockStore();
  return (
    <Provider store={store}>
      <ToastProvider>{children}</ToastProvider>
    </Provider>
  );
};

describe('FoodCard Component - Rendering Tests', () => {
  it('should render the food card with correct food name', () => {
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const nameElement = screen.getByTestId('food-name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent('Delicious Burger');
  });

  it('should render the food card with correct price', () => {
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const priceElement = screen.getByTestId('food-price');
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveTextContent('$12.99');
  });

  it('should render the food card with correct rating', () => {
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const ratingElement = screen.getByTestId('food-rating');
    expect(ratingElement).toBeInTheDocument();
    expect(ratingElement).toHaveTextContent('4.5');
  });

  it('should display "Open" status when restaurant is open', () => {
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const statusElement = screen.getByTestId('food-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('Open');
  });

  it('should display "Closed" status when restaurant is closed', () => {
    const closedFood = { ...mockFoodItem, isOpen: false };
    render(
      <TestWrapper>
        <FoodCard food={closedFood} foodData={mockFoodData} />
      </TestWrapper>
    );

    const statusElement = screen.getByTestId('food-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('Closed');
  });

  it('should render food image with correct alt text', () => {
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const imageElement = screen.getByTestId('food-image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('alt', 'Delicious Burger');
  });

  it('should render restaurant logo', () => {
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const logoElement = screen.getByTestId('food-logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('alt', 'Burger Place');
  });
});

describe('FoodCard Component - User Interaction Tests', () => {
  it('should open action menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const menuButton = screen.getByTestId('food-menu-btn');
    expect(menuButton).toBeInTheDocument();

    await user.click(menuButton);

    await waitFor(() => {
      const actionMenu = screen.getByTestId('food-action-menu');
      expect(actionMenu).toBeInTheDocument();
    });
  });

  it('should show delete button in action menu', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const menuButton = screen.getByTestId('food-menu-btn');
    await user.click(menuButton);

    await waitFor(() => {
      const deleteButton = screen.getByTestId('food-delete-btn');
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toHaveTextContent('Delete');
    });
  });

  it('should show edit button in action menu', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const menuButton = screen.getByTestId('food-menu-btn');
    await user.click(menuButton);

    await waitFor(() => {
      const editButton = screen.getByTestId('food-edit-btn');
      expect(editButton).toBeInTheDocument();
      expect(editButton).toHaveTextContent('Edit');
    });
  });

  it('should close action menu when clicking outside', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const menuButton = screen.getByTestId('food-menu-btn');
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByTestId('food-action-menu')).toBeInTheDocument();
    });

    await user.click(document.body);

    await waitFor(() => {
      expect(screen.queryByTestId('food-action-menu')).not.toBeInTheDocument();
    });
  });

  it('should open delete modal when delete button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FoodCard food={mockFoodItem} foodData={mockFoodData} />
      </TestWrapper>
    );

    const menuButton = screen.getByTestId('food-menu-btn');
    await user.click(menuButton);

    const deleteButton = await screen.findByTestId('food-delete-btn');
    await user.click(deleteButton);

    await waitFor(() => {
      const deleteMessage = screen.getByTestId('food-delete-message');
      expect(deleteMessage).toBeInTheDocument();
      expect(deleteMessage).toHaveTextContent('Delicious Burger');
    });
  });
});

