import { Box, Stack } from '@mui/material';
import StatCard from '../components/Cards';
import {SouthWest,AccessTime,Folder,InsertDriveFile,} from '@mui/icons-material';

const Home = () => {
  return (
    <Box p={4}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box flex={1}>
          <StatCard
            title="Weekly Activity"
            value="90%"
            progress={90}
            icon={SouthWest}
            color="#f44336"
          />
        </Box>
        <Box flex={1}>
          <StatCard
            title="Worked This Week"
            value="40:00:05"
            progress={100}
            icon={AccessTime}
            color="#673ab7"
          />
        </Box>
        <Box flex={1}>
          <StatCard
            title="Project Worked"
            value="04"
            progress={25}
            icon={Folder}
            color="#e91e63"
          />
        </Box>
        <Box flex={1}>
          <StatCard
            title="Complete Project"
            value="15"
            progress={75}
            icon={InsertDriveFile}
            color="#ff9800"
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;