import { CircularProgress } from '@mui/material'

export const Loader = ({ message = 'Please wait...' }) => {
  return (
    <div className='text-center'>
      <div>
        <CircularProgress />
      </div>
      <div>{message}</div>
    </div>
  )
}
