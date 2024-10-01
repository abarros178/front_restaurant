import React from 'react';
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Paper,
    Divider
} from '@mui/material';
import { CheckCircleOutline, LocalShipping, Schedule, Restaurant, Error, AssignmentTurnedIn } from '@mui/icons-material';

const getIconForAction = (action) => {
    switch (action.toLowerCase()) {
      case 'completed':
        return <CheckCircleOutline color="success" />;
      case 'purchase_in_progress':
        return <LocalShipping color="primary" />;
      case 'insufficient':
        return <Schedule color="warning" />;
      case 'preparation':
        return <Restaurant color="info" />;
      case 'entered':
        return <AssignmentTurnedIn color="secondary" />;
      default:
        return <Error color="error" />;
    }
  };

const OrderHistoryTimeline = ({ history }) => (
    <Paper elevation={2} sx={{ p: 2, borderRadius: '8px', mb: 3 }}>
        <Typography variant="h6" gutterBottom color="primary">
            Historial Detallado de la Orden
        </Typography>
        <List>
            {history.map((event, index) => (
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemIcon>

                            {getIconForAction(event.action)}
                        </ListItemIcon>
                        <ListItemText
                            primary={event.action}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {new Date(event.timestamp).toLocaleString()}
                                    </Typography>
                                    {event.details && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            {event.details}
                                        </Typography>
                                    )}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    {index < history.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
            ))}
        </List>
    </Paper>
);

export default OrderHistoryTimeline;