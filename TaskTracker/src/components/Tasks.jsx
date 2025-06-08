import React, { useState, useEffect } from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const API_URL = 'http://localhost:5000/api/projects';

const Tasks = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    owner: '',
    status: 'Active',
    deadline: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editedProject, setEditedProject] = useState({
    name: '',
    owner: '',
    status: '',
    deadline: '',
  });
  const [showForm, setShowForm] = useState(false);

  // Fetch all projects on mount
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProjects(data.map(p => ({
        id: p._id,
        name: p.projectName,
        owner: p.ownerName,
        status: p.status,
        deadline: p.deadline
      }))))
      .catch(err => console.error(err));
  }, []);

  // Add a new project
  const addProject = () => {
    if (!newProject.name || !newProject.owner || !newProject.deadline) return;
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectName: newProject.name,
        ownerName: newProject.owner,
        status: newProject.status,
        deadline: newProject.deadline
      })
    })
      .then(res => res.json())
      .then(added => setProjects(prev => [...prev, {
        id: added._id,
        name: added.projectName,
        owner: added.ownerName,
        status: added.status,
        deadline: added.deadline
      }]))
      .catch(err => console.error(err));
    setNewProject({ name: '', owner: '', status: 'Active', deadline: '' });
    setShowForm(false);
  };

  // Delete a project
  const deleteProject = id => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => setProjects(prev => prev.filter(project => project.id !== id)))
      .catch(err => console.error(err));
  };

  // Start editing a project
  const startEditing = project => {
    setEditingId(project.id);
    setEditedProject({
      name: project.name,
      owner: project.owner,
      status: project.status,
      deadline: project.deadline,
    });
  };

  // Save edited project
  const saveEdit = id => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectName: editedProject.name,
        ownerName: editedProject.owner,
        status: editedProject.status,
        deadline: editedProject.deadline
      })
    })
      .then(res => res.json())
      .then(updated => {
        setProjects(prev =>
          prev.map(project =>
            project.id === id ? {
              id: updated._id,
              name: updated.projectName,
              owner: updated.ownerName,
              status: updated.status,
              deadline: updated.deadline
            } : project
          )
        );
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <section className="section">
      <h2>Projects</h2>

      {showForm && (
        <div className="add-form" style={styles.formContainer}>
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={e => setNewProject({ ...newProject, name: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Owner"
            value={newProject.owner}
            onChange={e => setNewProject({ ...newProject, owner: e.target.value })}
            style={styles.input}
          />
          <select
            value={newProject.status}
            onChange={e => setNewProject({ ...newProject, status: e.target.value })}
            style={styles.select}
          >
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            value={newProject.deadline}
            onChange={e => setNewProject({ ...newProject, deadline: e.target.value })}
            style={styles.input}
          />
          <button onClick={addProject} style={styles.button}>Add Project</button>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>
                {editingId === project.id ? (
                  <input
                    type="text"
                    value={editedProject.name}
                    onChange={e => setEditedProject({ ...editedProject, name: e.target.value })}
                  />
                ) : (
                  project.name
                )}
              </td>
              <td>
                {editingId === project.id ? (
                  <input
                    type="text"
                    value={editedProject.owner}
                    onChange={e => setEditedProject({ ...editedProject, owner: e.target.value })}
                  />
                ) : (
                  project.owner
                )}
              </td>
              <td>
                {editingId === project.id ? (
                  <select
                    value={editedProject.status}
                    onChange={e => setEditedProject({ ...editedProject, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  project.status
                )}
              </td>
              <td>
                {editingId === project.id ? (
                  <input
                    type="date"
                    value={editedProject.deadline}
                    onChange={e => setEditedProject({ ...editedProject, deadline: e.target.value })}
                  />
                ) : (
                  new Date(project.deadline).toLocaleDateString('en-GB')
                )}
              </td>
              <td>
                {editingId === project.id ? (
                  <>
                    <button onClick={() => saveEdit(project.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(project)}>Edit</button>
                    <button onClick={() => deleteProject(project.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FAB to Toggle Form */}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab color="primary" aria-label="add" onClick={() => setShowForm(!showForm)}>
          <AddIcon />
        </Fab>
      </Box>
    </section>
  );
};

const styles = {
  formContainer: {
    marginBottom: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: '12px',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)'
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    flex: '1 1 200px'
  },
  select: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    flex: '1 1 150px'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Tasks;