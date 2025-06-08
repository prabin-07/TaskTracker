import React from 'react';
import { Box, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

const ViewAssignedTasks = ({ tasks, updateTaskStatus }) => {
  const { user } = useOutletContext();

  return (
    <Box className="section">
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: 'text.primary' }}>
        My Tasks
      </Typography>
      <table className="table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.name}</td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(index, e.target.value)}
                  className="editable-select"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default ViewAssignedTasks;
