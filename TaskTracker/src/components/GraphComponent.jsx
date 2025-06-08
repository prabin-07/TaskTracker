import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'Mon', value: 10 },
  { day: 'Tue', value: 40 },
  { day: 'Wed', value: 35 },
  { day: 'Thu', value: 50 },
  { day: 'Fri', value: 50 },
  { day: 'Sat', value: 60 },
  { day: 'Sun', value: 65 },
];

function GraphComponent() {
  return (
    <div style={{
      width: '100%',
      height: 400,
      background: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginTop: '30px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Weekly Activity</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphComponent;