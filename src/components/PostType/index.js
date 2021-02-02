import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import thumbs from "./thumb";

const useStyles = makeStyles((theme) => ({
  wrap: {
    flexGrow: 1,
    maxWidth: theme.spacing(49.5),
    "& .post-option": {
      display: "flex",
      alignItems: "center",
      height: theme.spacing(4.75),
      "& > button[disabled]": {
        opacity: 0.5,
        color: theme.palette.text.disabled,
      },
    },
  },
  postIconWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(4.5),
  },
  postIcon: {
    position: "relative",
    width: 26,
    height: 26,
    borderRadius: "50%",
    backgroundSize: "cover",
    cursor: "pointer",
    "&:after": {
      content: '""',
      position: "absolute",
      top: -4,
      left: -4,
      right: -4,
      bottom: -4,
      borderRadius: "50%",
      border: "2px solid transparent",
    },
    "&.selected:after": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default ({ postStyle, setPostStyle }) => {
  const classes = useStyles();
  const itemCount = Object.keys(thumbs).length;
  const perSlide = 9;
  const step = 5;

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const index =
      postStyle + perSlide > itemCount ? itemCount - perSlide : postStyle;
    setCurrentIndex(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.wrap}>
      <CarouselProvider
        totalSlides={itemCount}
        visibleSlides={perSlide}
        step={step}
        isIntrinsicHeight={true}
        currentSlide={currentIndex}
        className="post-option"
      >
        <IconButton
          component={ButtonBack}
          style={{ fontSize: "2rem" }}
          size="small"
          color="primary"
          edge="start"
        >
          <NavigateBeforeIcon fontSize="inherit" />
        </IconButton>
        <Slider>
          {Object.keys(thumbs).map((k, i) => (
            <Slide index={i} key={i} style={{ width: 36, height: 36 }}>
              <div key={i} className={classes.postIconWrap}>
                <div
                  className={clsx(
                    classes.postIcon,
                    i === postStyle && "selected"
                  )}
                  style={{ backgroundImage: `url(${thumbs[k]})` }}
                  onClick={() => setPostStyle(i)}
                />
              </div>
            </Slide>
          ))}
        </Slider>
        <IconButton
          component={ButtonNext}
          style={{ fontSize: "2rem" }}
          size="small"
          color="primary"
          edge="end"
        >
          <NavigateNextIcon fontSize="inherit" />
        </IconButton>
      </CarouselProvider>
    </div>
  );
};
