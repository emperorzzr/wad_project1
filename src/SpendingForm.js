import React, { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Box } from '@mui/material';

const getCategories = () => {
  return JSON.parse(localStorage.getItem('spending-categories') || '[]');
};

const saveSpending = (record) => {
  const records = JSON.parse(localStorage.getItem('spending-records') || '[]');
  records.push(record);
  localStorage.setItem('spending-records', JSON.stringify(records));
};

function SpendingForm() {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const categories = getCategories();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !category || !amount) return;
    saveSpending({ date, category, amount: parseFloat(amount) });
    setDate('');
    setCategory('');
    setAmount('');
    alert('✅ Spending recorded!');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '300px', padding: 2 }}
      >
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />

        <FormControl fullWidth required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>Select a category</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.spending_id} value={cat.category}>
                {cat.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{ min: 0, step: 'any' }}
          required
        />

        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default SpendingForm;
