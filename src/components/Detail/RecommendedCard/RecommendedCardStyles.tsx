import { createStyles } from "@material-ui/core";

export const RecommendedCardStyles = () => createStyles({
  card: {
    textAlign: "center",
    height: "100%",
  },
  actionArea: {
    height: "100%",
  },
  preview: {
    width: "100%",
    maxWidth: 100,
    maxHeight: 100,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "contain",
  },
});
