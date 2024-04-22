import * as React from "react";
import { navBarStyles } from "./NavBarStyles";
import {
  AppBar,
  Avatar,
  Badge,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Icon from "@mdi/react";
import { mdiBell, mdiLogout, mdiSlashForward } from "@mdi/js";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "../../hooks/useLocalStorage";

interface INavBar {}

const NavBarComponent: React.FunctionComponent<INavBar> = () => {
  const { classes } = navBarStyles();
  const params = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const leagueData = getLocalStorage("selectedLeague");

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (user === null || user === undefined) {
    return null;
  }

  const handleSignOut = () => {
    handleMenuClose();
    signOut(auth);
  };

  const UserMenu = () => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={"UserMenu"}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.userMenu}
    >
      <Typography className={classes.userDisplayName}>
        {user.displayName}
      </Typography>
      <Typography className={classes.userEmail}>{user.email}</Typography>
      <Divider className={classes.userMenuDivider} />
      <MenuItem onClick={handleSignOut} className={classes.userMenuItem}>
        <Typography className={classes.userMenuItemText}>Sign Out</Typography>
        <Icon path={mdiLogout} className={classes.userMenuItemIcon} />
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar className={classes.navBarContainer}>
      <Toolbar>
        <div className={classes.logoContainer}>
          <img
            src={
              params.league
                ? "/assets/LeagueLink_Shield_v1.svg"
                : "/assets/LeagueLink_Logo_v1.svg"
            }
            onClick={() => navigate(`/`)}
            className={classes.logo}
          />
          {params.league && leagueData && (
            <>
              <Icon path={mdiSlashForward} className={classes.breadCrumbIcon} />
              <Typography className={classes.leagueText}>
                {leagueData.abbr}
              </Typography>
            </>
          )}
        </div>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          className={classes.actionContainer}
        >
          <IconButton disableFocusRipple disableRipple>
            <Badge badgeContent={22} className={classes.notificaitonBadge}>
              <Icon path={mdiBell} className={classes.notificationIcon} />
            </Badge>
          </IconButton>
          {!params.league && (
            <>
              <IconButton
                disableFocusRipple
                disableRipple
                onClick={handleProfileMenuOpen}
              >
                <Avatar
                  alt={""}
                  src={user.photoURL || ""}
                  className={classes.userIcon}
                />
              </IconButton>
              <UserMenu />
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export const NavBar = NavBarComponent;
