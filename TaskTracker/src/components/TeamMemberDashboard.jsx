import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, LinearProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TeamMemberDashboard = () => {
  const { user } = useOutletContext();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    document.title = 'Tasks - Team Member';
    // Fetch tasks assigned to the current user
    fetch(`http://localhost:5000/api/projects/assigned/${user?.id}`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, [user]);

  const handleStatusChange = (taskId, newStatus) => {
    fetch(`http://localhost:5000/api/projects/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
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

  const completedTasks = tasks.filter(task => task.status === 'Done').length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const tasksToDo = tasks.filter(task => task.status === 'To Do').length;
  const toDoProgress = totalTasks > 0 ? (tasksToDo / totalTasks) * 100 : 0;

  const tasksInProgress = tasks.filter(task => task.status === 'In Progress').length;
  const inProgressProgress = totalTasks > 0 ? (tasksInProgress / totalTasks) * 100 : 0;

  const statCards = [
    {
      title: "Your Progress",
      value: `${completedTasks} of ${totalTasks}`,
      progress,
      icon: AccessTimeIcon,
      color: "#673ab7",
    },
    {
      title: "Tasks Left to Do",
      value: `${tasksToDo} of ${totalTasks}`,
      progress: toDoProgress,
      icon: SouthWestIcon,
      color: "#f44336",
    },
    {
      title: "Tasks In Progress",
      value: `${tasksInProgress} of ${totalTasks}`,
      progress: inProgressProgress,
      icon: InsertDriveFileIcon,
      color: "#ff9800",
    },
  ];

  const loggedInMember = JSON.parse(localStorage.getItem('member'));

  return (
    <Box className="section">
      {loggedInMember && (
        <div style={{ marginBottom: 20, background: '#eaf4fc', padding: 10, borderRadius: 8 }}>
          <strong>Logged-in Member:</strong> {loggedInMember.name} ({loggedInMember.email})
        </div>
      )}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={4}>
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Box
              key={index}
              flex={1}
              sx={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Box sx={{ padding: '16px', bgcolor: 'background.paper' }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle2" color="text.secondary">
                    {card.title}
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {card.value}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: `${card.color}20`,
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon sx={{ color: card.color, fontSize: 16 }} />
                  </Box>
                </Box>
                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={card.progress}
                    sx={{
                      height: 6,
                      borderRadius: 4,
                      backgroundColor: 'background.default',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: card.color,
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>

      <Typography variant="h5" sx={{ mb: 3, color: 'text.primary' }}>
        Assigned Tasks
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.projectName}</TableCell>
                <TableCell>{task.ownerName}</TableCell>
                <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeamMemberDashboard;
