import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";

export default function BlogCard(props) {
  // const [title, link, creator, content] = props;
  return (
    <Card
      sx={{
        width: "85%",
        margin: "25px auto 0",
        textAlign: "center",
        boxShadow: "0px 4px 16px -8px #000000",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
          color='text.secondary'
          gutterBottom
        >
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          <PersonIcon
            sx={{
              fontSize: "medium",
              marginRight: "3px",
              position: "relative",
              top: "1px",
            }}
          ></PersonIcon>
          {props.creator}
        </Typography>
        <Typography variant='body2'>{props.content}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button href={props.link} variant='contained'>
          Read more
        </Button>
      </CardActions>
    </Card>
  );
}
