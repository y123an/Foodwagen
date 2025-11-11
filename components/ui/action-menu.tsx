"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ActionMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
};

const ActionMenu = forwardRef<HTMLDivElement, ActionMenuProps>(
  ({ onEdit, onDelete, className }, ref) => {
    return (
      <div
        ref={ref}
        data-test-id="food-action-menu"
        role="menu"
        aria-label="Actions"
        className={cn(
          "absolute right-0 mt-2 w-32 rounded-md border border-gray-200 bg-white p-2 shadow-lg z-50",
          className
        )}
      >
        <button
          data-test-id="food-edit-btn"
          role="menuitem"
          className="block w-full rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 text-left"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          data-test-id="food-delete-btn"
          role="menuitem"
          className="mt-1 block w-full rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50 text-left"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
);

ActionMenu.displayName = "ActionMenu";

export default ActionMenu;
