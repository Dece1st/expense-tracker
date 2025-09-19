// src/components/ExpenseCard/ExpenseCard.tsx
import React from 'react';
import './ExpenseCard.css';

/*
TYPESCRIPT FEATURE INVENTORY:
Interfaces Found:
1) ExpenseCardProps - defines the component contract (required + optional props)

Type Annotations Found:
1) amount: number - ensures currency values are numeric
2) id: number - guarantees unique identifier is numeric
3) date: string - ISO/parsable string for display formatting
4) category: ExpenseCategory - string union prevents typos

Autocomplete Helped:
1) category suggestions are limited to: 'Food' | 'Transportation' | 'Entertainment' | 'Other'

Error I Fixed (exercise idea):
1) Passing category="Foodd" triggers a TS error: Type '"Foodd"' is not assignable to type 'ExpenseCategory'.
   Fix: change to an allowed union member, e.g., "Food".
*/

/** Allowed categories (string union) — prevents invalid strings and improves IntelliSense. */
export type ExpenseCategory = 'Food' | 'Transportation' | 'Entertainment' | 'Other';

export interface ExpenseCardProps {
  /** Unique identifier for each expense */
  id: number;
  /** Human-readable description of the expense (e.g., "Lunch at Joe's Pizza") */
  description: string;
  /** Amount in dollars (will be formatted as currency) */
  amount: number;
  /** Controlled, typo-safe category */
  category: ExpenseCategory;
  /** Date in ISO or parsable string form (e.g., "2025-09-10") */
  date: string;

  /** Optional: visually emphasize the card */
  highlighted?: boolean;
  /** Optional: show/hide category chip (defaults to true) */
  showCategory?: boolean;
  /** Optional: provide to render a Delete button; receives the expense id */
  onDelete?: (id: number) => void;
}

/**
 * Displays a single expense item with formatted currency/date and professional styling.
 * Uses string union types for safer categories and optional props with sensible defaults.
 */
const ExpenseCard: React.FC<ExpenseCardProps> = ({
  id,
  description,
  amount,
  category,
  date,
  highlighted = false,
  showCategory = true,
  onDelete,
}) => {
  // Format currency for professional display
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  // Format date for user-friendly display (fallback if parsing fails)
  const d = new Date(date);
  const formattedDate = isNaN(d.getTime())
    ? date
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <article className={`expense-card${highlighted ? ' expense-card--highlighted' : ''}`}>
      <div className="expense-header">
        {showCategory && <span className="expense-category">{category}</span>}
        <time className="expense-date" dateTime={date}>
          {formattedDate}
        </time>
      </div>

      <div className="expense-body">
        <h3 className="expense-description">{description}</h3>
        <p className="expense-amount">{formattedAmount}</p>
      </div>

      {onDelete && (
        <div className="expense-actions">
          <button
            type="button"
            className="expense-delete"
            aria-label={`Delete expense ${description}`}
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
};

export default ExpenseCard;