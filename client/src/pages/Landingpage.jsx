import { Box, Button, Container, Divider } from '@mui/material';
import MenuAppBar from '../components/common/Menuappbar';
import assets from '../assets';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import logo1 from '../assets/images/task.png';
import logo2 from '../assets/images/task.png';
import logo3 from '../assets/images/task.png';

const Landingpage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${assets.images.backgroundimg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuAppBar />
        <Container component='main' maxWidth='xs'>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1>POMOTASKS</h1>
            <p>Manage your tasks with the Pomodoro Technique</p>
            <Button variant='contained' color='primary' href='/signup'>
              Create account
            </Button>
          </Box>
        </Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: '20px',
            margin: '20px',
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='250'
                image={assets.images.task}
                alt='task'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Boards
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='250'
                image={assets.images.task}
                alt='task'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Tasks
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='250'
                image={assets.images.task}
                alt='task'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Pomodor Timer
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        <Box sx={{ textAlign: 'center', justifyContent: 'center' }}>
          <h2>About</h2>
          <Box
            sx={{
              backgroundColor: '#1e1e1e',
              marginRight: '50px',
              marginLeft: '50px',
              marginBottom: '50px',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <p>
              The story behind the whole idea of the project! I was always
              interested in how can I manage my time and keep tracking all my
              activities! Every time I go to the notion or Trello it comes to my
              brain this crazy idea of how those amazing platforms work! and I
              take the chance to discover the main concept about how can i
              create my own task manager. first, as I said to discover how this
              great technology works and on the other hand to learn more about
              how the architect of those big platforms works! and it’s a nice to
              have your custom task manager.
            </p>
            <p>
              This is a Portfolio Project for{' '}
              <a
                style={{ color: 'red' }}
                href='https://www.holbertonschool.com/'
              >
                Holberton School
              </a>
            </p>
            <p>
              <a
                style={{ color: 'red' }}
                href='https://github.com/medouzer/pomotask'
              >
                Portfolio Project Repository
              </a>
            </p>
            <Divider />
            <h3>Team</h3>
            <p>
              Ouzerzou Mohamed{' '}
              <a
                style={{ color: 'red' }}
                href='https://www.linkedin.com/in/mohamed-ouzerzou-26163a20a/'
              >
                LinkedIn
              </a>{' '}
              <a style={{ color: 'red' }} href='https://github.com/medouzer'>
                Github
              </a>{' '}
              <a
                style={{ color: 'red' }}
                href='https://twitter.com/Mohamedouzer'
              >
                Twitter
              </a>
            </p>
          </Box>
        </Box>
        <Box sx={{ justifyContent: 'center ', textAlign: 'center' }}>
          Developed by LOVE ❤️
        </Box>
      </Box>
    </>
  );
};

export default Landingpage;
