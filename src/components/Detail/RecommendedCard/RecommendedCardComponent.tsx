import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {
  RecommendedCardProps,
} from "./RecommendedCardChildrenProps";

export class RecommendedCardComponent extends React.Component<RecommendedCardProps> {
  public openRecommended = () => {
    const { history, itemId } = this.props;
    history.push({ search: `details=${itemId}` });
  }

  public render() {
    const { item, classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea
          onClick={this.openRecommended}
          className={classes.actionArea}
        >
          <CardContent>
            <img className={classes.preview} src={item.image_url} />
            <Typography variant="h6" align="center">
              {item.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
