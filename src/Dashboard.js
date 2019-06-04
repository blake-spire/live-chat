import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CTX } from "./Store";

const useStyles = makeStyles(theme => {
  return {
    root: {
      margin: "1rem",
      padding: theme.spacing(3, 2),
      textAlign: "center",
    },
    flex: {
      display: "flex",
      alignItems: "center",
    },
    topicsWindow: {
      width: "30%",
      height: "300px",
      borderRight: "1px solid grey",
    },
    chatWindow: {
      width: "70%",
      height: "300px",
      padding: "1rem",
    },
    chatBox: {
      width: "85%",
    },
    button: {
      width: "15%",
    },
  };
});

const Dashboard = props => {
  // material-ui style
  const classes = useStyles();

  // context
  const { allChats, sendChatAction, user } = React.useContext(CTX);
  const topics = Object.keys(allChats);

  // state
  const [textValue, changeTextValue] = React.useState("");
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);

  return (
    <section>
      <Paper className={classes.root}>
        <Typography component="h3">Sweet Chat App</Typography>
        <Typography component="h5">{activeTopic}</Typography>

        <div className={classes.flex}>
          <section className={classes.topicsWindow}>
            <List>
              {topics.map(topic => (
                <ListItem
                  key={topic}
                  button
                  onClick={e => changeActiveTopic(e.target.innerText)}
                >
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </section>

          <section className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, i) => (
              <div className={classes.flex} key={i}>
                <Chip label={chat.from} />
                <Typography>{chat.msg}</Typography>
              </div>
            ))}
          </section>
        </div>

        <section className={classes.flex}>
          <TextField
            className={classes.chatBox}
            label="Send Message"
            aria-label="Send message"
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              sendChatAction({
                from: user,
                msg: textValue,
                topic: activeTopic,
              });
              changeTextValue("");
            }}
          >
            send
          </Button>
        </section>
      </Paper>
    </section>
  );
};

export default Dashboard;
