import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Typography } from '@mui/material';

const HeroTyping = () => {
  return (
    <Typography  fontWeight={600} textAlign="center" mt={4} variant='h5'>
      <Typewriter
        words={[
          'Your sports app.',
          'Live scores. Fixtures. Results.',
          'Your league, your updates!',
        ]}
        loop={1}
        cursor
        cursorStyle="|"
        typeSpeed={90}
        deleteSpeed={70}
        delaySpeed={2000}
      />
    </Typography>
  );
};

export default HeroTyping;
