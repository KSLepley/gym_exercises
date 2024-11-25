import React, { useEffect, useState} from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions , fetchData } from '../utils/fetchData';
import HorizontalScrollBar from './HorizontalScrollBar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [ search, setSearch ] = useState('')
  // const [ exercises, setExercises ] = useState([])
  const [ bodyParts, setBodyParts ] = useState([])

  useEffect( () => {
    const fetchExercisesData = async () => {
        const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions)

        setBodyParts(['all', ...bodyPartsData])
    }

    fetchExercisesData();

  }, [])

  const handleSearch = async () => {
    if(search) {
       const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        
        const searchedExercises = exercisesData.filter(
            (exercise) => exercise.name.toLowerCase().includes(search)
            || exercise.target.toLowerCase().includes(search)
            || exercise.equipment.toLowerCase().includes(search)
            || exercise.bodyPart.toLowerCase().includes(search)

        )
        setSearch('');
        setExercises(searchedExercises);
       // console.log(exercisesData)
    };   
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      {/* Placeholder for the image */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          mt: '20px', // Adds margin to the top of the image area
        }}
      >
        {/* Add your image here if required */}
        {/* <img src="your-image-url.jpg" alt="Fitness" style={{ width: '100%', maxWidth: '800px' }} /> */}
      </Box>

      {/* Typography section below the image */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          mt: '150px', // This is where "Awseome.." is
        }}
      >
        <Typography
          fontWeight={700}
          sx={{
            fontSize: { lg: '44px', xs: '30px' },
          }}
          mb="50px"
          textAlign="center"
        >
          Awesome Exercises You <br />
          Should Know!
        </Typography>

        {/* Search bar and button */}
        <Box
          position="relative"
          mb="72px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '100%',
            maxWidth: { lg: '800px', xs: '350px' },
          }}
        >
          <TextField
            sx={{
              input: {
                fontWeight: '700',
                border: 'none',
                borderRadius: '4px',
              },
              width: { lg: '800px', xs: '350px' },
              backgroundColor: '#FFF',
              borderRadius: '40px',
            }}
            height="76px"
            value= {search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Exercises"
            type="text"
          />
          <Button
            className="search-btn"
            sx={{
              bgcolor: '#FF2625',
              color: '#FFF',
              textTransform: 'none',
              width: { lg: '175px', xs: '80px' },
              fontSize: { lg: '20px', xs: '14px' },
              height: '56px',
              position: 'absolute',
              right: '-1px',
            }}
            onClick = {handleSearch}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box sx ={{
        position: 'relative',
        width: '100%',
        p: '20%',
      }}>
        <HorizontalScrollBar
        data = {bodyParts} 
        bodyPart = {bodyPart} setBodyPart = {setBodyPart}/>
      </Box>
    </Stack>
  );
};

export default SearchExercises;