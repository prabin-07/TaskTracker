import { Box, Stack } from '@mui/material';
import StatCard, { weeklyData } from '../components/Cards';
import {SouthWest,AccessTime,Folder,InsertDriveFile,} from '@mui/icons-material';
import GraphComponent from './GraphComponent';

const total = weeklyData.reduce((sum, d) => sum + d.value, 0);
const average = Math.round(total / weeklyData.length);
const max = Math.max(...weeklyData.map(d => d.value));
const min = Math.min(...weeklyData.map(d => d.value));

const Home = () => {
  return (
    <Box p={4}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box flex={1}>
          <StatCard
            title="Total Activity"
            value={total}
            progress={Math.round((total / (7 * 100)) * 100)}
            icon={SouthWest}
            color="#f44336"
          />
        </Box>
        <Box flex={1}>
          <StatCard
            title="Average Activity"
            value={average}
            progress={average}
            icon={AccessTime}
            color="#673ab7"
          />
        </Box>
        <Box flex={1}>
          <StatCard
            title="Max Activity"
            value={max}
            progress={max}
            icon={Folder}
            color="#e91e63"
          />
        </Box>
        <Box flex={1}>
          <StatCard
            title="Min Activity"
            value={min}
            progress={min}
            icon={InsertDriveFile}
            color="#ff9800"
          />
        </Box>
      </Stack>
      <GraphComponent />
    </Box>
  );
};

export default Home;