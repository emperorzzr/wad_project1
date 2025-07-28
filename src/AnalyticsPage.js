import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import {
  Box, Typography, FormControl, InputLabel,
  Select, MenuItem, Paper
} from '@mui/material';

dayjs.extend(isoWeek);

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

function AnalyticsPage() {
  const [records, setRecords] = useState([]);
  const [mode, setMode] = useState('daily');
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('spending-records') || '[]');
    setRecords(stored);
  }, []);

  const groupBy = (mode) => {
    const grouped = {};
    records.forEach(r => {
      let key = '';
      if (mode === 'daily') key = r.date;
      else if (mode === 'weekly') key = `W${dayjs(r.date).isoWeek()}`;
      else if (mode === 'monthly') key = dayjs(r.date).format('YYYY-MM');
      grouped[key] = (grouped[key] || 0) + r.amount;
    });
    return Object.entries(grouped).map(([k, v]) => ({ name: k, amount: v }));
  };

  const groupByCategory = () => {
    const result = {};
    records.forEach(r => {
      result[r.category] = (result[r.category] || 0) + r.amount;
    });
    return Object.entries(result).map(([k, v]) => ({ name: k, value: v }));
  };

  const groupCategoryAsChart = () => {
    const result = {};
    records.forEach(r => {
      result[r.category] = (result[r.category] || 0) + r.amount;
    });
    return Object.entries(result).map(([category, amount]) => ({ category, amount }));
  };

  const getMonthlyTotal = (month) => {
    return records
      .filter(r => dayjs(r.date).format('YYYY-MM') === month)
      .reduce((sum, r) => sum + r.amount, 0);
  };

  const getMonthlyBarData = (month) => {
    const result = {};
    records
      .filter(r => dayjs(r.date).format('YYYY-MM') === month)
      .forEach(r => {
        result[r.category] = (result[r.category] || 0) + r.amount;
      });
    return Object.entries(result).map(([category, amount]) => ({ category, amount }));
  };

  const getMonthlyPieData = (month) => {
    const result = {};
    records
      .filter(r => dayjs(r.date).format('YYYY-MM') === month)
      .forEach(r => {
        result[r.category] = (result[r.category] || 0) + r.amount;
      });
    return Object.entries(result).map(([category, value]) => ({ name: category, value }));
  };

  const total = records.reduce((sum, r) => sum + r.amount, 0);
  const lineData = groupBy(mode);
  const pieData = groupByCategory();
  const barChartData = groupCategoryAsChart();

  const monthsList = [...new Set(
    records.map((r) => dayjs(r.date).format('YYYY-MM'))
  )].sort().reverse();

  const monthlyTotal = getMonthlyTotal(selectedMonth);
  const monthlyBarChartData = getMonthlyBarData(selectedMonth);
  const monthlyPieData = getMonthlyPieData(selectedMonth);

  return (
    <Box>
      <Typography variant="h4" component="h2" color="primary" textAlign="center" fontWeight="bold" mb={4}>
        Analytics Dashboard 📊
      </Typography>

      {/* Select Mode */}
      <Box display="flex" justifyContent="center" mb={4}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="mode-select-label">Mode</InputLabel>
          <Select
            labelId="mode-select-label"
            value={mode}
            label="Mode"
            onChange={(e) => setMode(e.target.value)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Line Chart */}
      <Paper elevation={2} sx={{ height: 300, p: 2, mb: 6 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(v) => `฿${v.toFixed(2)}`} />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Total Spending All Time */}
      <Typography variant="h6" fontWeight="600" color="text.primary" mb={3}>
        Total Spending of all time:{' '}
        <Box component="span" color="primary.main">
          ฿{total.toFixed(2)}
        </Box>
      </Typography>

      {/* Bar Chart All Time */}
      <Box sx={{ height: 260, width: '100%', mb: 6 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData} layout="vertical" margin={{ left: 50 }}>
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" width={120} />
            <Tooltip formatter={(v) => `฿${v.toFixed(2)}`} />
            <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Pie Chart All Time */}
      <Paper elevation={2} sx={{ height: 300, p: 2, mb: 6 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `฿${v.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      {/* Monthly Total */}
      <Typography variant="h6" fontWeight="600" color="text.primary" mb={3}>
        Total Spending of the selected month:
      </Typography>

      {/* Select Month */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="month-select-label">Select Month</InputLabel>
          <Select
            labelId="month-select-label"
            value={selectedMonth}
            label="Select Month"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {monthsList.map((m) => (
              <MenuItem key={m} value={m}>
                {dayjs(m).format('MMMM YYYY')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body1" fontWeight="500">
          Total: <Box component="span" color="primary.main">฿{monthlyTotal.toFixed(2)}</Box>
        </Typography>
      </Box>

      {/* Monthly Bar Chart */}
      <Box sx={{ height: 260, width: '100%', mb: 6 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyBarChartData} layout="vertical" margin={{ left: 50 }}>
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" width={120} />
            <Tooltip formatter={(v) => `฿${v.toFixed(2)}`} />
            <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Monthly Pie Chart */}
      <Paper elevation={2} sx={{ height: 300, p: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={monthlyPieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {monthlyPieData.map((entry, index) => (
                <Cell key={`monthly-cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `฿${v.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default AnalyticsPage;
