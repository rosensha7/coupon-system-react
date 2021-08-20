import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from "@material-ui/core";
import { maxWidth } from "@material-ui/system";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import image from "../../Assets/Categories/food.jpg";
import electronicImg from "../../Assets/Categories/electronic devices.jpg";
import diningImg from "../../Assets/Categories/dining.jpg";
import vacationImg from "../../Assets/Categories/vacation.jpg";
import gamingImg from "../../Assets/Categories/gaming.jpg";
import cosmeticsImg from "../../Assets/Categories/cosmetics.jpg";
import kitchenwareImg from "../../Assets/Categories/kitchenware.jpg";
import hardwareImg from "../../Assets/Categories/hardware.jpg";
import trainingImg from "../../Assets/Categories/training.jpg";
import officeImg from "../../Assets/Categories/office.jpg";

const useStyles = makeStyles({
    root: {
        minWidth: 150,
        borderWidth: 2,
        borderColor: "#005cb2",
        borderRadius: 6
    },
    media: {
        height: 130,
    },
    actionArea: {
        "&:hover": {
            color: "#ffffff",
            background: "linear-gradient(45deg, #64b5f6 20%, #d500f9 96%)"
            
        }
    },
});

function CategoriesPage(): JSX.Element {

    const classes = useStyles();

    return (

        <div>
            <Grid container style={{ padding: 20, paddingLeft: 40, paddingRight: 40 }} spacing={2} direction="row" justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardActionArea component={Link} to="/couponsInCategory/food" classes={{root: classes.actionArea}}
                            >
                            <CardMedia
                                className={classes.media}
                                image={image}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Food
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardActionArea component={Link} to="/couponsInCategory/electricity" classes={{root: classes.actionArea}}>
                            <CardMedia
                                className={classes.media}
                                image={electronicImg}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Electronic Devices
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardActionArea component={Link} to="/couponsInCategory/Dining" classes={{root: classes.actionArea}}>
                            <CardMedia
                                className={classes.media}
                                image={diningImg}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Dining
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardActionArea component={Link} to="/couponsInCategory/vacation" classes={{root: classes.actionArea}}>
                            <CardMedia
                                className={classes.media}
                                image={vacationImg}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Vacation
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardActionArea component={Link} to="/couponsInCategory/gaming" classes={{root: classes.actionArea}}>
                            <CardMedia
                                className={classes.media}
                                image={gamingImg}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Gaming
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardActionArea component={Link} to="/couponsInCategory/cosmetics" classes={{root: classes.actionArea}}>
                            <CardMedia
                                className={classes.media}
                                image={cosmeticsImg}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Cosmetics
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardActionArea component={Link} to="/couponsInCategory/kitchenware" classes={{root: classes.actionArea}}>
                            <CardMedia
                                className={classes.media}
                                image={kitchenwareImg}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Kitchenware
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardActionArea component={Link} to="/couponsInCategory/hardware" classes={{root: classes.actionArea}}>
                            <CardMedia
                                className={classes.media}
                                image={hardwareImg}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Hardware
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardActionArea component={Link} to="/couponsInCategory/training" classes={{root: classes.actionArea}}>
                            <CardMedia
                                className={classes.media}
                                image={trainingImg}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Training
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardActionArea component={Link} to="/couponsInCategory/office" classes={{root: classes.actionArea}}>
                            <CardMedia
                                className={classes.media}
                                image={officeImg}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Office
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>

        </div >

        // <div >
        //         <Button component={Link} to="/couponsInCategory/food" variant="contained" color="primary">
        //             Food
        //         </Button>
        //         <br/><br/>
        //         <Button component={Link} to="/couponsInCategory/electricity" variant="contained" color="primary">
        //             Electricity
        //         </Button>
        //         <br/><br/>
        //         <Button component={Link} to="/couponsInCategory/Dining" variant="contained" color="primary">
        //             Dining
        //         </Button>
        //         <br/><br/>
        //         <Button component={Link} to="/couponsInCategory/vacation" variant="contained" color="primary">
        //             Vacation
        //         </Button>
        //         <br/><br/>
        //         <Button component={Link} to="/couponsInCategory/gaming" variant="contained" color="primary">
        //             Gaming
        //         </Button>
        //         <br/><br/>
        //         <Button component={Link} to="/couponsInCategory/cosmetics" variant="contained" color="primary">
        //             Cosmetics
        //         </Button>
        //         <br/><br/>
        //         <Button component={Link} to="/couponsInCategory/kitchenware" variant="contained" color="primary">
        //             Kitchenware
        //         </Button>
        //         <br/><br/>
        //         <Button component={Link} to="/couponsInCategory/hardware" variant="contained" color="primary">
        //             Hardware
        //         </Button>
        //         <br/><br/>
        //         <Button component={Link} to="/couponsInCategory/training" variant="contained" color="primary">
        //             Training
        //         </Button>
        //         <br/><br/>
        //         <Button component={Link} to="/couponsInCategory/office" variant="contained" color="primary">
        //             Office
        //         </Button>
        // </div>
    );
}

export default CategoriesPage;
