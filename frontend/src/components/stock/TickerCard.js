import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Card, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    width: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardContainer: {
    display: "flex",
    gap: "0.5rem",
    padding: "10px 0px",
  },
});

export default function TicketCard({ data }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    data && (
      <div className={classes.cardContainer}>
        {data.map((item) => (
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {item.stock_name}
              </Typography>
              {item.stock_price_info.last_values.map((innerItem) => (
                <Typography variant="h5" component="h2">
                  {innerItem}
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  );
}
