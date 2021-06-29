import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function ListChip(props) {
    const classes = useStyles();
    const filterTrangPhuc = props.data;


    const handleDelete = (chipToDelete) => () => {

    };

    return (
        <Paper component="ul" className={classes.root}>
                {
                    filterTrangPhuc ? Object.keys(filterTrangPhuc).map((k, index) => {
                        // encodeURIComponent(k) + '=' +
                        return (<li key={index}>
                            <Chip

                                label={encodeURIComponent(filterTrangPhuc[k])}
                                onDelete={handleDelete(index)}
                                className={classes.chip}
                            />
                        </li>)
                    }) : ""
                }
        </Paper>
    );
}
//
// chipData.map((data) => {
// let icon;
//
// return (
//     <li key={data.key}>
//         <Chip
//             icon={icon}
//             label={data.label}
//             onDelete={handleDelete(data)}
//             className={classes.chip}
//         />
//     </li>
// );
// })
