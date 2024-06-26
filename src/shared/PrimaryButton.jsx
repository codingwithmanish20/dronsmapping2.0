import { Button, CircularProgress } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'

const PrimaryButton = ({ label, onClick, disabled = false, isLoading = false }) => {
    return (
        <div>
            <Button onClick={onClick}
                disabled={disabled}
                style={{ backgroundColor: disabled ? '#E0E0E0' : '#000', marginTop: '4px', borderRadius: '25px' }}
                variant='contained'
                className='w-full'>
                {
                    isLoading && <CircularProgress
                        size={22}
                        sx={{ color: blue[500], mr: 2 }}
                    />
                }
                {label} </Button>
        </div>
    )
}

export default PrimaryButton