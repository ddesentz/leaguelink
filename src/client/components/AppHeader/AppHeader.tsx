import * as React from "react";
import { appHeaderStyles } from "./AppHeaderStyles";
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
  useMediaQuery,
} from "@mui/material";
import Icon from "@mdi/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiLogout, mdiSlashForward } from "@mdi/js";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "../../hooks/useLocalStorage";
import {
  faCommentDots,
  faGear,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { leagueLinkTheme } from "../../common/Theme";

interface IAppHeader {}

const AppHeaderComponent: React.FunctionComponent<IAppHeader> = () => {
  const { classes } = appHeaderStyles();
  const params = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const leagueData = getLocalStorage("selectedLeague");
  const isMobile = useMediaQuery(leagueLinkTheme.breakpoints.down(310 * 4));

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

  const getActionBadgeCount = () => {
    if (!params.page && !params.userId) return 22;
    return 0;
  };

  const getActionIcon = () => {
    if (!params.page && !params.userId) return faCommentDots;
    if (!params.page) return faGear;
    return faPlus;
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
    <AppBar className={classes.appHeaderContainer}>
      <Toolbar>
        <div className={classes.logoContainer}>
          <img
            src={
              params.leagueId && isMobile
                ? "/assets/LeagueLink_Shield_v1.svg"
                : "/assets/LeagueLink_Logo_v1.svg"
            }
            alt=""
            onClick={() => navigate(`/`)}
            className={classes.logo}
          />
          {params.leagueId && leagueData && (
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
          {params.page !== "explore" && (
            <IconButton disableFocusRipple disableRipple>
              <Badge
                badgeContent={getActionBadgeCount()}
                className={classes.notificaitonBadge}
              >
                <FontAwesomeIcon
                  icon={getActionIcon()}
                  className={classes.notificationIcon}
                />
              </Badge>
            </IconButton>
          )}

          {!params.leagueId && (
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

export const AppHeader = AppHeaderComponent;
