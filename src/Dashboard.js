import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Paper } from '@mui/material';

function Dashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('spending-records') || '[]');
    setRecords(stored);
  }, []);

  return (
    <Box>
      <Paper elevation={1}>
        <List>
          {records.map((r, i) => (
            <ListItem
              key={i}
              divider
              secondaryAction={
                <Typography variant="subtitle1" color="primary" fontWeight="bold">
                  ฿{r.amount}
                </Typography>
              }
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            >
              <ListItemText
                primary={r.category}
                secondary={r.date}
                primaryTypographyProps={{ fontWeight: 'medium', color: 'text.primary' }}
                secondaryTypographyProps={{ color: 'text.secondary' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Dashboard;
