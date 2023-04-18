import * as React from 'react';
import Box from '@mui/material/Box';
import { Container, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import NoImage from './Assets/No-image-found.jpg'

function App() {

  const [movies, setMovies] = React.useState([])
  const [error, setError] = React.useState("")

  const getMovie = async (title) => {
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}`, {
      method: 'GET',
      params: { exact: 'false' },
      headers: {
        'X-RapidAPI-Key': '2ab71025admsh303a0b9d02efb85p13dbbfjsnfb8e2ae37313',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    }).then((e) => e.json()).then((data) => {
      data?.results ? setMovies(data?.results) : setError('No Movie Found')
    })
  }
  return (
    <Container>
      <Grid marginTop={10}>
        <Box sx={{ minWidth: 120 }}>
          <TextField fullWidth label="Enter movie title or keyword" id="fullWidth" InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AiOutlineSearch />
              </InputAdornment>
            ),
          }}
            onChange={(e) => { getMovie(e?.target?.value ? e?.target?.value : "") }}
          />
        </Box>
      </Grid>
      {movies?.length > 0 ?
        <Grid container spacing={2} marginTop={5}>
          {movies?.map((ele,index) =>
            <Grid item xs={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={ele?.primaryImage ? ele?.primaryImage?.url : NoImage}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {ele?.titleText?.text}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Type:{ele?.titleType?.text !=null ? ele?.titleType?.text : "N/A"}</Button>
                  <Button size="small">Release on:{ele?.releaseDate?.day != null? ele?.releaseDate?.day + '/' + ele?.releaseDate?.month + '/' + ele?.releaseDate?.year : "N/A"}</Button>
                </CardActions>
              </Card>

            </Grid>
          )}
        </Grid> :
        <Typography> {error}</Typography>
      }

    </Container>
  );
}

export default App;
