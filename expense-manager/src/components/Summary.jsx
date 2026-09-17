function Summary({ expenses }) {
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="summary">
      <h2>Total Expense</h2>
      <h3>₹{totalExpense}</h3>
    </div>
  );
}

export default Summary;