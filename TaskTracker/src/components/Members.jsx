import React, { useState, useEffect } from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const API_URL = 'http://localhost:5000/api/members';

const Members = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
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
  const loggedInMember = JSON.parse(localStorage.getItem('member'));

  // Fetch all members on mount
  useEffect(() => {
    const fetchData = () => {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          setUsers(data.map(m => ({
            id: m._id,
            name: m.memberName,
            email: m.email,
            role: m.role,
            deadline: m.deadline
          })));
          console.log('Fetched users:', data);
        })
        .catch(err => console.error(err));
      fetch('http://localhost:5000/api/projects')
        .then(res => res.json())
        .then(data => {
          setProjects(data);
          console.log('Fetched projects:', data);
        });
    };

    fetchData();

    const handleTasksUpdated = () => fetchData();
    window.addEventListener('tasksUpdated', handleTasksUpdated);

    return () => {
      window.removeEventListener('tasksUpdated', handleTasksUpdated);
    };
  }, []);

  // Add a new member
  const addMember = () => {
    if (!newMember.name || !newMember.email || !newMember.deadline) return;
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memberName: newMember.name,
        email: newMember.email,
        deadline: newMember.deadline,
        role: newMember.role
      })
    })
      .then(res => res.json())
      .then(added => setUsers(prev => [...prev, {
        id: added._id,
        name: added.memberName,
        email: added.email,
        role: added.role,
        deadline: added.deadline
      }]))
      .catch(err => console.error(err));
    setNewMember({ name: '', email: '', role: 'member', deadline: '' });
    setShowForm(false);
  };

  // Delete a member
  const deleteUser = id => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => setUsers(prev => prev.filter(user => user.id !== id)))
      .catch(err => console.error(err));
  };

  // Start editing a member
  const startEditing = user => {
    setEditingId(user.id);
    setEditedData({
      name: user.name,
      email: user.email,
      role: user.role,
      deadline: user.deadline,
    });
  };

  // Save edited member
  const saveEdit = id => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memberName: editedData.name,
        email: editedData.email,
        deadline: editedData.deadline,
        role: editedData.role
      })
    })
      .then(res => res.json())
      .then(updated => {
        setUsers(prev =>
          prev.map(user =>
            user.id === id ? {
              id: updated._id,
              name: updated.memberName,
              email: updated.email,
              role: updated.role,
              deadline: updated.deadline
            } : user
          )
        );
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <section className="section">
      <h2>Members</h2>

      {loggedInMember && (
        <div style={{ marginBottom: 20, background: '#eaf4fc', padding: 10, borderRadius: 8 }}>
          <strong>Logged-in Member:</strong> {loggedInMember.name} ({loggedInMember.email})
        </div>
      )}

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
            <th>Member Name</th>
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