import { Card, CardContent, Typography, Box, LinearProgress, IconButton, } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StatCard = ({ title, value, progress, icon: Icon, color = '#f44336' }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, width: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <IconButton size="small">
          </IconButton>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Typography variant="h5" fontWeight={600}>
            {value}
          </Typography>
          <Box
            sx={{
              backgroundColor: `${color}20`,
              p: 1,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color, fontSize: 16 }} />
          </Box>
        </Box>

        <Box mt={2}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 4,
              backgroundColor: '#f0f0f0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;

export const weeklyData = [
  { day: 'Mon', value: 10 },
  { day: 'Tue', value: 40 },
  { day: 'Wed', value: 35 },
  { day: 'Thu', value: 50 },
  { day: 'Fri', value: 50 },
  { day: 'Sat', value: 60 },
  { day: 'Sun', value: 65 },
];

const total = weeklyData.reduce((sum, d) => sum + d.value, 0);
const average = Math.round(total / weeklyData.length);
const max = Math.max(...weeklyData.map(d => d.value));
const min = Math.min(...weeklyData.map(d => d.value));
