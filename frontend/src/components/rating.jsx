import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function RatingComponent({ readonly, setRating, val }) {
    const [value, setValue] = React.useState(val);

    const handleRating = (event, newValue) => {
        setValue(newValue);
        console.log("este es el newVAlue",newValue)
        if (setRating) {
            console.log("este es el newVAlue",newValue)
            setRating(newValue)
        }

    }

    return (
        <Box sx={{ '& > legend': { mt: 2 } }}>
            {readonly ? (
                <Rating name="read-only" value={value} readOnly />
            ) : (
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={handleRating}
                />
            )
            }
        </Box>
    );
}

