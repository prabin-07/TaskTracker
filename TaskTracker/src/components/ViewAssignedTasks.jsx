import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

const ViewAssignedTasks = () => {
  const { user } = useOutletContext();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks assigned to the current user
    if (user?.id) {
      fetch(`http://localhost:5000/api/projects/assigned/${user.id}`)
        .then(res => res.json())
        .then(data => setTasks(data))
        .catch(err => console.error('Error fetching tasks:', err));
    }
  }, [user]);

  const updateTaskStatus = (taskId, newStatus) => {
    fetch(`http://localhost:5000/api/projects/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(tasks.map(task =>
          task._id === taskId ? { ...task, status: updatedTask.status } : task
        ));
      })
      .catch(err => console.error('Error updating task status:', err));
  };

  return (
    <Box className="section">
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: 'text.primary' }}>
        Tasks Assigned
      </Typography>
      <table className="table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Project</th>
            <th>Deadline</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.projectName}</td>
              <td>{task.ownerName}</td>
              <td>{new Date(task.deadline).toLocaleDateString()}</td>
              <td>
                <Select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                  size="small"
                  sx={{ minWidth: 120 }}
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default ViewAssignedTasks;
