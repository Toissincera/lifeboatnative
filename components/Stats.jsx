import { Box, Grid, CircularProgress } from '@mui/material'; // Added CircularProgress
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { statsCardData } from '../formSource';
import { UserState } from '../recoil/atom';
import { useApiErrorHandler } from './../hooks';
import OutlinedCard from './Card';
import { StatsService } from '../data/services/stats.service';

export const Stats = () => { // Removed unnecessary empty props object
  const [stats, setStats] = useState(null); // Initial state as null for clarity
  const [loading, setLoading] = useState(false); // Added loading state
  const user = useRecoilValue(UserState);
  const [error, setError] = useApiErrorHandler();

  useEffect(() => {
    if (user) {
      setLoading(true);
      StatsService.get()
        .then(({ data }) => {
          console.log('Got stats data => ', data);
          setStats(data);
        })
        .catch((err) => {
          console.log('Unable to fetch stats => ', err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1, marginY: 2 }}>
      {loading ? (
        // Display loading spinner centered
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        // Display error message if there's an error
        <Box sx={{ textAlign: 'center' }}>
          <div>Error loading stats: {error.message || 'Something went wrong'}</div>
        </Box>
      ) : stats ? (
        // Display stats grid if data is available
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {statsCardData.map((card) => (
            <Grid key={card.id} item xs={4} sm={5} md={3}>
              <OutlinedCard data={card} stats={stats} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Display no-data message if stats is null and no error
        <Box sx={{ textAlign: 'center' }}>
          <div>No stats available</div>
        </Box>
      )}
    </Box>
  );
};