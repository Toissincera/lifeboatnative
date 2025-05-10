import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'

export default function OutlinedCard({ data, stats }) {
  let cardName = data.name.toLowerCase()

  const getCount = () => {
    switch (cardName) {
      case 'members':
        return stats.members
      case 'cases':
        return stats.cases
      default:
        return
    }
  }

  return (
    <Box>
      <Card variant='outlined'>
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              {data.keyName || data.name}
            </Typography>
            <Typography variant='h5' component='div' my={1}>
              {getCount()}&nbsp;
            </Typography>
          </CardContent>
          <Stack direction='row' justifyContent='space-between'>
            <CardActions>
              <Link to={data.path} className='link'>
                <Button size='small'>VIEW</Button>
              </Link>
            </CardActions>
            <CardActions>{data.icon}</CardActions>
          </Stack>
        </React.Fragment>
      </Card>
    </Box>
  )
}
