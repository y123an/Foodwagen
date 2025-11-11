import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FoodDeleteModal from '../components/ui/food-delete-modal';
import { ToastProvider } from '@/lib/context/ToastContext';

jest.mock('@/lib/context/ToastContext', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useToast: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
    showWarning: jest.fn(),
    showInfo: jest.fn(),
    showToast: jest.fn(),
  }),
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

describe('FoodDeleteModal Component - Rendering Tests', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with correct title', () => {
    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Test Burger"
        />
      </Wrapper>
    );

    expect(screen.getByText('Delete Meal')).toBeInTheDocument();
  });

  it('should render delete confirmation message with food name', () => {
    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Delicious Pizza"
        />
      </Wrapper>
    );

    const message = screen.getByTestId('food-delete-message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Delicious Pizza');
    expect(message).toHaveTextContent('Are you sure you want to delete');
  });

  it('should render generic message when no food name provided', () => {
    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName=""
        />
      </Wrapper>
    );

    const message = screen.getByTestId('food-delete-message');
    expect(message).toHaveTextContent('this meal');
  });

  it('should render confirm and cancel buttons with correct test IDs', () => {
    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Test Food"
        />
      </Wrapper>
    );

    expect(screen.getByTestId('food-delete-confirm-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-delete-cancel-btn')).toBeInTheDocument();
  });

  it('should display correct button text for confirm button', () => {
    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Test Food"
        />
      </Wrapper>
    );

    expect(screen.getByTestId('food-delete-confirm-btn')).toHaveTextContent('Yes');
  });

  it('should display correct button text for cancel button', () => {
    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Test Food"
        />
      </Wrapper>
    );

    expect(screen.getByTestId('food-delete-cancel-btn')).toHaveTextContent('Cancel');
  });

  it('should show warning message about irreversible action', () => {
    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Test Food"
        />
      </Wrapper>
    );

    expect(screen.getByText(/Actions cannot be reversed/i)).toBeInTheDocument();
  });
});

describe('FoodDeleteModal Component - User Interaction Tests', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <FoodDeleteModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        foodName="Test Food"
      />
    );

    const cancelButton = screen.getByTestId('food-delete-cancel-btn');
    await user.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('should call onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup();
    mockOnConfirm.mockResolvedValue(undefined);

    render(
      <FoodDeleteModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        foodName="Test Food"
      />
    );

    const confirmButton = screen.getByTestId('food-delete-confirm-btn');
    await user.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });
  });

  it('should not call onClose when confirm button is clicked', async () => {
    const user = userEvent.setup();
    mockOnConfirm.mockResolvedValue(undefined);

    render(
      <FoodDeleteModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        foodName="Test Food"
      />
    );

    const confirmButton = screen.getByTestId('food-delete-confirm-btn');
    await user.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalled();
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should disable confirm button during deletion', async () => {
    const user = userEvent.setup();
    
    let resolveConfirm: (value: unknown) => void;
    const confirmPromise = new Promise((resolve) => {
      resolveConfirm = resolve;
    });
    mockOnConfirm.mockReturnValue(confirmPromise);

    render(
      <FoodDeleteModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        foodName="Test Food"
      />
    );

    const confirmButton = screen.getByTestId('food-delete-confirm-btn');
    await user.click(confirmButton);

    await waitFor(() => {
      expect(confirmButton).toBeDisabled();
    });

    await act(async () => {
      resolveConfirm!(undefined);
    });
  });

  it('should show loading text during deletion', async () => {
    const user = userEvent.setup();
    
    let resolveConfirm: (value: unknown) => void;
    const confirmPromise = new Promise((resolve) => {
      resolveConfirm = resolve;
    });
    mockOnConfirm.mockReturnValue(confirmPromise);

    render(
      <FoodDeleteModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        foodName="Test Food"
      />
    );

    const confirmButton = screen.getByTestId('food-delete-confirm-btn');
    await user.click(confirmButton);

    await waitFor(() => {
      expect(confirmButton).toHaveTextContent('Deleting Meal...');
    });

    await act(async () => {
      resolveConfirm!(undefined);
    });
  });
});

describe('FoodDeleteModal Component - API Mocking Tests', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful deletion', async () => {
    const user = userEvent.setup();
    mockOnConfirm.mockResolvedValue(undefined);

    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Burger to Delete"
        />
      </Wrapper>
    );

    const confirmButton = screen.getByTestId('food-delete-confirm-btn');
    await user.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle API error during deletion', async () => {
    const user = userEvent.setup();
    mockOnConfirm.mockRejectedValue(new Error('Delete failed'));

    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Test Food"
        />
      </Wrapper>
    );

    const confirmButton = screen.getByTestId('food-delete-confirm-btn');
    await user.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalled();
    });

    expect(screen.getByText('Delete Meal')).toBeInTheDocument();
  });

  it('should handle network timeout gracefully', async () => {
    const user = userEvent.setup();
    mockOnConfirm.mockRejectedValue(new Error('Network timeout'));

    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Test Food"
        />
      </Wrapper>
    );

    const confirmButton = screen.getByTestId('food-delete-confirm-btn');
    await user.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(confirmButton).not.toBeDisabled();
    });
  });

  it('should complete delete operation when API call succeeds', async () => {
    const user = userEvent.setup();
    
    const mockDeleteResponse = { success: true, id: '123' };
    mockOnConfirm.mockResolvedValue(mockDeleteResponse);

    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Food to Delete"
        />
      </Wrapper>
    );

    const confirmButton = screen.getByTestId('food-delete-confirm-btn');
    await user.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(confirmButton).not.toBeDisabled();
    });
  });

  it('should maintain modal state during async operations', async () => {
    const user = userEvent.setup();
    
    let resolveConfirm: (value: unknown) => void;
    const confirmPromise = new Promise((resolve) => {
      resolveConfirm = resolve;
    });
    mockOnConfirm.mockReturnValue(confirmPromise);

    render(
      <Wrapper>
        <FoodDeleteModal
          open={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          foodName="Async Test Food"
        />
      </Wrapper>
    );

    const confirmButton = screen.getByTestId('food-delete-confirm-btn');
    await user.click(confirmButton);

    expect(screen.getByText('Delete Meal')).toBeInTheDocument();
    expect(screen.getByTestId('food-delete-message')).toHaveTextContent('Async Test Food');

    await act(async () => {
      resolveConfirm!(undefined);
    });

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalled();
    });
  });
});
