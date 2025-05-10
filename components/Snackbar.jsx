import { Alert, Box } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import * as React from 'react'
import { useRecoilState } from 'recoil'
import { snackbarState } from '../recoil/atom'

export const CustomSnackbar = () => {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState)
  const {
    vertical = "top", // Fallback to "top"
    horizontal = "right", // Fallback to "right"
    open = false,
    message = "",
    severity = "info",
  } = snackbar;

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Box>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar?.severity || 'success'}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
