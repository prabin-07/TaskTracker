import React, { useState } from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


const Members = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Rahul', email: 'rahul@gmail.com', role: 'member', deadline: '2025-06-15' },
    { id: 2, name: 'Shyam', email: 'shyam@gmail.com', role: 'admin', deadline: '2025-06-20' },
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'member',
    deadline: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({
    name: '',
    email: '',
    role: 'member',
    deadline: '',
  });

  const [showForm, setShowForm] = useState(false);

  const addMember = () => {
    if (!newMember.name || !newMember.email || !newMember.deadline) return;

    const newUser = {
      id: Date.now(),
      ...newMember,
    };

    setUsers(prev => [...prev, newUser]);
    setNewMember({ name: '', email: '', role: 'member', deadline: '' });
    setShowForm(false);
  };

  const deleteUser = id => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const updateUserRole = (id, newRole) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const startEditing = user => {
    setEditingId(user.id);
    setEditedData({
      name: user.name,
      email: user.email,
      role: user.role,
      deadline: user.deadline,
    });
  };

  const saveEdit = id => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? {
              ...user,
              name: editedData.name,
              email: editedData.email,
              role: editedData.role,
              deadline: editedData.deadline,
            }
          : user
      )
    );
    setEditingId(null);
  };

  return (
    <section className="section">
      <h2>Members</h2>

      {showForm && (
        <div className="add-form">
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={e => setNewMember({ ...newMember, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newMember.email}
            onChange={e => setNewMember({ ...newMember, email: e.target.value })}
          />
          <input
            type="date"
            placeholder="Deadline"
            value={newMember.deadline}
            onChange={e => setNewMember({ ...newMember, deadline: e.target.value })}
          />
          <select
            value={newMember.role}
            onChange={e => setNewMember({ ...newMember, role: e.target.value })}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={addMember} className="action-button">
            Add Role
          </button>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Deadline</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                {editingId === user.id ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={e => setEditedData({ ...editedData, name: e.target.value })}
                    className="editable-input"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={e => setEditedData({ ...editedData, email: e.target.value })}
                    className="editable-input"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="date"
                    value={editedData.deadline}
                    onChange={e => setEditedData({ ...editedData, deadline: e.target.value })}
                    className="editable-input"
                  />
                ) : (
                  new Date(user.deadline).toLocaleDateString('en-GB')
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <select
                    value={editedData.role}
                    onChange={e => setEditedData({ ...editedData, role: e.target.value })}
                    className="editable-select"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <>
                    <button onClick={() => saveEdit(user.id)} className="action-button">
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="action-button">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(user)} className="action-button">
                      Edit
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="action-button">
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setShowForm(!showForm)}
          sx={{
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </section>
  );
};

export default Members;