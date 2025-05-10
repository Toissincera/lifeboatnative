import { Box, Paper } from '@mui/material'
import { caseLogColumns } from '../datatablesource'
import BasicTable from './BasicTable'
import { StepperCaseHistory } from './Stepper'

export const CaseAction = ({ caseLogs }) => {
    return (
        <Paper elevation={1} sx={{width: "calc(100vw - 16px)"}}>
            <Box my={2}>
                {/* <BasicTable dataColumns={caseLogColumns} dataList={caseLogs} /> */}
                <StepperCaseHistory caseHistoryArray={caseLogs} />
            </Box>
        </Paper>
    )
}
