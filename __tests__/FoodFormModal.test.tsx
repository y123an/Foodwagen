import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FoodFormModal from '../components/ui/food-form-modal';
import { foodApi } from '@/lib/redux/services/foodApi';
import { ToastProvider } from '@/lib/context/ToastContext';

jest.mock('@/lib/context/ToastContext', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useToast: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
  }),
}));

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

describe('FoodFormModal Component - Rendering Tests', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with "Add Meal" title in create mode', () => {
    render(
      <TestWrapper>
        <FoodFormModal
          open={true}
          mode="create"
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Add Meal')).toBeInTheDocument();
  });

  it('should render all form input fields with correct test IDs', () => {
    render(
      <TestWrapper>
        <FoodFormModal
          open={true}
          mode="create"
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </TestWrapper>
    );

    expect(screen.getByTestId('food-form-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('food-form-rating-input')).toBeInTheDocument();
    expect(screen.getByTestId('food-form-price-input')).toBeInTheDocument();
    expect(screen.getByTestId('food-form-image-input')).toBeInTheDocument();
    expect(screen.getByTestId('food-form-restaurant-input')).toBeInTheDocument();
    expect(screen.getByTestId('food-form-status-select')).toBeInTheDocument();
  });

  it('should populate form fields with initial data in edit mode', () => {
    const initialData = {
      name: 'Test Burger',
      rating: 4.5,
      imageUrl: 'https://example.com/burger.jpg',
      price: '12.99',
      restaurantName: 'Test Restaurant',
      logo: 'https://example.com/logo.jpg',
      status: 'Open Now' as const,
    };

    render(
      <TestWrapper>
        <FoodFormModal
          open={true}
          mode="edit"
          initialData={initialData}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </TestWrapper>
    );

    expect(screen.getByTestId('food-form-name-input')).toHaveValue('Test Burger');
    expect(screen.getByTestId('food-form-rating-input')).toHaveValue(4.5);
    expect(screen.getByTestId('food-form-price-input')).toHaveValue(12.99);
  });
});

describe('FoodFormModal Component - User Interaction Tests', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update food name input when user types', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <FoodFormModal
          open={true}
          mode="create"
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </TestWrapper>
    );

    const nameInput = screen.getByTestId('food-form-name-input');
    await user.type(nameInput, 'Delicious Pizza');

    expect(nameInput).toHaveValue('Delicious Pizza');
  });

  it('should call onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <FoodFormModal
          open={true}
          mode="create"
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </TestWrapper>
    );

    const cancelButton = screen.getByTestId('food-form-cancel-btn');
    await user.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should successfully submit form with valid data', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);

    render(
      <TestWrapper>
        <FoodFormModal
          open={true}
          mode="create"
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </TestWrapper>
    );

    await user.type(screen.getByTestId('food-form-name-input'), 'Delicious Burger');
    await user.type(screen.getByTestId('food-form-restaurant-input'), 'Burger Place');
    await user.type(screen.getByTestId('food-form-rating-input'), '4.5');
    await user.type(screen.getByTestId('food-form-price-input'), '12.99');

    const submitButton = screen.getByTestId('food-form-submit-btn');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });
});

describe('FoodFormModal Component - API Mocking Tests', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful form submission in create mode', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);

    render(
      <TestWrapper>
        <FoodFormModal
          open={true}
          mode="create"
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </TestWrapper>
    );

    await user.type(screen.getByTestId('food-form-name-input'), 'New Pizza');
    await user.type(screen.getByTestId('food-form-restaurant-input'), 'Pizza House');
    await user.type(screen.getByTestId('food-form-rating-input'), '4.8');
    await user.type(screen.getByTestId('food-form-price-input'), '18.99');

    const submitButton = screen.getByTestId('food-form-submit-btn');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'New Pizza',
          restaurantName: 'Pizza House',
          rating: 4.8,
          price: '18.99',
        })
      );
    });
  });

  it('should handle API error during submission', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockRejectedValue(new Error('API Error'));

    render(
      <TestWrapper>
        <FoodFormModal
          open={true}
          mode="create"
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </TestWrapper>
    );

    await user.type(screen.getByTestId('food-form-name-input'), 'Test Food');
    await user.type(screen.getByTestId('food-form-restaurant-input'), 'Test Restaurant');

    const submitButton = screen.getByTestId('food-form-submit-btn');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    expect(screen.getByText('Add Meal')).toBeInTheDocument();
  });

  it('should show loading state during form submission', async () => {
    const user = userEvent.setup();
    
    let resolveSubmit: (value: unknown) => void;
    const submitPromise = new Promise((resolve) => {
      resolveSubmit = resolve;
    });
    mockOnSubmit.mockReturnValue(submitPromise);

    render(
      <TestWrapper>
        <FoodFormModal
          open={true}
          mode="create"
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </TestWrapper>
    );

    await user.type(screen.getByTestId('food-form-name-input'), 'Loading Test');
    await user.type(screen.getByTestId('food-form-restaurant-input'), 'Test Restaurant');

    const submitButton = screen.getByTestId('food-form-submit-btn');
    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toHaveTextContent('Adding Meal...');
    });

    resolveSubmit!(undefined);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
