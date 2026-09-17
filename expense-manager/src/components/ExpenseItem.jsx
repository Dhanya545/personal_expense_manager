function ExpenseItem({ expense, onDelete, onEdit }) {
  return (
    <div className="expense-item">

      <div>
        <strong>{expense.title}</strong>
        <p>{expense.category}</p>
        <small>{expense.date}</small>
      </div>

      <div>
        <strong>₹{expense.amount}</strong>

        <div>
          <button onClick={() => onEdit(expense)}>
            Edit
          </button>

          <button onClick={() => onDelete(expense.id)}>
            Delete
          </button>
        </div>
      </div>

    </div>
  );
}

export default ExpenseItem;