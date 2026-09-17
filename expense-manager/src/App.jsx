import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseItem from "./components/ExpenseItem";
import Summary from "./components/Summary";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingExpense, setEditingExpense] = useState(null);

  const addExpense = (expense) => {
    setExpenses((previousExpenses) => [
      ...previousExpenses,
      expense,
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id)
    );
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((previousExpenses) =>
      previousExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );

    setEditingExpense(null);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">

      <header className="header">
        <h1>Personal Expense Manager</h1>
        <p>Track and manage your daily expenses</p>
      </header>

      <main className="container">

        <Summary expenses={expenses} />

        <section className="card">
          <h2>
            {editingExpense ? "Edit Expense" : "Add New Expense"}
          </h2>

          {editingExpense ? (
            <ExpenseForm
              onAddExpense={updateExpense}
              editingExpense={editingExpense}
              onCancel={() => setEditingExpense(null)}
            />
          ) : (
            <ExpenseForm onAddExpense={addExpense} />
          )}
        </section>

        <section className="card">
          <h2>Expenses</h2>

          <input
            type="text"
            placeholder="Search expense by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>

          {filteredExpenses.length === 0 ? (
            <p className="empty-state">
              No expenses found.
            </p>
          ) : (
            filteredExpenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={deleteExpense}
                onEdit={editExpense}
              />
            ))
          )}
        </section>

      </main>

    </div>
  );
}

export default App;