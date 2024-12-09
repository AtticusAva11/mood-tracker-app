import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import { SentimentVeryDissatisfied, SentimentDissatisfied, SentimentNeutral, SentimentSatisfied, SentimentVerySatisfied } from '@mui/icons-material';
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { format } from 'date-fns';
import type { MoodEntry } from '../types';

const moodIcons = [
  <SentimentVeryDissatisfied />,
  <SentimentDissatisfied />,
  <SentimentNeutral />,
  <SentimentSatisfied />,
  <SentimentVerySatisfied />,
];

const MoodTracker: React.FC = () => {
  const [mood, setMood] = useState<number>(3);
  const [note, setNote] = useState<string>('');
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);

  useEffect(() => {
    fetchRecentMoods();
  }, []);

  const fetchRecentMoods = async () => {
    try {
      const moodsRef = collection(db, 'moods');
      const q = query(moodsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);
      
      const moods: MoodEntry[] = [];
      querySnapshot.forEach((doc) => {
        moods.push({ id: doc.id, ...doc.data() } as MoodEntry);
      });
      
      setRecentMoods(moods);
    } catch (error) {
      console.error('Error fetching moods:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const moodEntry = {
        mood,
        note,
        timestamp: new Date(),
        userId: 'temp-user-id', // Replace with actual user ID when auth is implemented
      };

      await addDoc(collection(db, 'moods'), moodEntry);
      setNote('');
      fetchRecentMoods();
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        How are you feeling?
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
            {moodIcons.map((icon, index) => (
              <IconButton
                key={index}
                color={mood === index ? 'primary' : 'default'}
                onClick={() => setMood(index)}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
          
          <Slider
            value={mood}
            onChange={(_, value) => setMood(value as number)}
            min={0}
            max={4}
            step={1}
            marks
            sx={{ mt: 2 }}
          />
          
          <TextField
            multiline
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note about how you're feeling..."
            fullWidth
          />
          
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            size="large"
          >
            Save Mood
          </Button>
        </Stack>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Moods
        </Typography>
        <Stack spacing={2}>
          {recentMoods.map((entry) => (
            <Box
              key={entry.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {moodIcons[entry.mood]}
                <Typography variant="body2">
                  {format(entry.timestamp.toDate(), 'PPp')}
                </Typography>
              </Box>
              {entry.note && (
                <Typography variant="body2" color="text.secondary">
                  {entry.note}
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default MoodTracker;
