import * as React from "react";
import { editPlayerStyles } from "./EditPlayerStyles";
import { Avatar, ClickAwayListener, Grid, Typography } from "@mui/material";
import { useAppSignals } from "../../../common/AppContext";
import { StandardInput } from "../../../components/_common/StandardInput/StandardInput";
import { StandardAutocomplete } from "../../../components/_common/StandardAutocomplete/StandardAutocomplete";
import { StandardButton } from "../../../components/_common/StandardButton/StandardButton";
import { leagueLinkTheme } from "../../../common/Theme";
import { IKeyValue } from "../../../common/types/common/KeyValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { add } from "cheerio/lib/api/traversing";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../..";
import { useParams } from "react-router";
import { IPlayerData } from "../../../common/types/NETC/PlayerData";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { urlToBlob } from "../../../common/Helper/HelperFunctions";

interface IEditPlayer {}

const EditPlayerComponent: React.FunctionComponent<IEditPlayer> = () => {
  const { classes } = editPlayerStyles();
  const { leagueId, userId } = useParams();
  const { playerSignals } = useAppSignals();
  const editingPlayerData = playerSignals.editingPlayer.value;
  const fileSelectorRef = React.useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = React.useState<string>(
    editingPlayerData.photoURL || ""
  );
  const [playerName, setPlayerName] = React.useState<string>(
    editingPlayerData.displayName || ""
  );
  const [playerPDGANumber, setPlayerPDGANumber] = React.useState<
    number | undefined
  >(editingPlayerData.pdgaNumber || undefined);
  const [playerLocation, setPlayerLocation] = React.useState<
    string | undefined
  >(editingPlayerData.location || undefined);
  const [searchPlayerLocation, setSearchPlayerLocation] =
    React.useState<string>("");
  const [invalidDisplayName, setInvalidDisplayName] =
    React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [updatingPlayer, setUpdatingPlayer] = React.useState<boolean>(false);

  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: process.env.REACT_APP_GOOGLE,
    options: {
      types: ["locality"],
    },
  });

  React.useEffect(() => {
    return () => {
      playerSignals.editingPlayer.value = null;
    };
  }, []);

  React.useEffect(() => {
    getPlacePredictions({ input: searchPlayerLocation });
  }, [searchPlayerLocation]);

  React.useEffect(() => {
    setInvalidDisplayName(false);
    setErrorMessage("");
  }, [playerName]);

  const FileSelector = () =>
    React.createElement("input", {
      type: "file",
      accept: "image/png, image/jpeg",
      ref: fileSelectorRef,
      style: { display: "none" },
      onChange: function (e) {
        if (e.target.files && e.target.files?.length > 0) {
          const urlObject = URL.createObjectURL(e.target.files[0]);
          setAvatar(urlObject);
        }
      },
    });

  const handleBrowse = () => {
    if (fileSelectorRef.current !== null) {
      fileSelectorRef.current.click();
    }
  };

  const validateNewInfo = () => {
    return (
      avatar === editingPlayerData.photoURL &&
      playerName === editingPlayerData.displayName &&
      playerPDGANumber === editingPlayerData.pdgaNumber &&
      playerLocation === editingPlayerData.location
    );
  };

  const validatePlayerInfo = () => {
    let valid = true;
    if (playerName === "") {
      setInvalidDisplayName(true);
      setErrorMessage("Display name must be at least 4 characters long");
      valid = false;
    }
    if (playerName.length < 4) {
      setInvalidDisplayName(true);
      setErrorMessage("Display name must be at least 4 characters long");
      valid = false;
    }
    if (playerName.split(" ").length > 2) {
      setInvalidDisplayName(true);
      setErrorMessage("Display name must be at least 4 characters long");
      valid = false;
    }
    return valid;
  };

  const handleEditPlayer = async () => {
    if (validatePlayerInfo()) {
      setUpdatingPlayer(true);
      const newPlayerData: IPlayerData = {
        ...playerSignals.editingPlayer.value,
        displayName: playerName,
        pdgaNumber: playerPDGANumber,
        location: playerLocation,
      };

      const playerRef = doc(
        db,
        "leagues",
        leagueId,
        "players",
        playerSignals.editingPlayer.value.playerId
      );

      await setDoc(playerRef, newPlayerData)
        .then(() => {
          playerSignals.editingPlayer.value = newPlayerData;
        })
        .then(async () => {
          if (avatar !== editingPlayerData.photoURL) {
            const avatarRef = ref(
              storage,
              `leagues/players/${editingPlayerData.playerId}`
            );
            const avatarBlob = (await urlToBlob(avatar)) as Blob;
            uploadBytes(avatarRef, avatarBlob).then(() => {
              getDownloadURL(avatarRef).then((url) => {
                updateDoc(playerRef, { photoURL: url }).then(() => {
                  setUpdatingPlayer(false);
                  playerSignals.editingPlayer.value = null;
                });
              });
            });
          } else {
            setUpdatingPlayer(false);
            playerSignals.editingPlayer.value = null;
          }
        });
    }
  };

  const locationOptionRenderer = (item: string, index: number) => {
    return (
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        height="100%"
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="nowrap"
        >
          <FontAwesomeIcon
            icon={faLocationDot}
            className={classes.locationIcon}
          />
          <Typography className={classes.locationNameText}>{item}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className={classes.contentWrapper}>
      <Grid
        container
        direction="column"
        className={classes.editPlayerContainer}
      >
        <Avatar
          onClick={handleBrowse}
          src={avatar}
          className={classes.playerAvatar}
        />
        <FileSelector />
        <Typography className={classes.avatarText}>Profile Picture</Typography>
        <Grid
          container
          direction="column"
          className={classes.propertyContainer}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Typography className={classes.inputLabelText}>Name</Typography>
            <StandardInput
              value={playerName}
              setValue={setPlayerName}
              error={invalidDisplayName}
              placeholder="Name"
            />
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Typography className={classes.inputLabelText}>PDGA #</Typography>
            <StandardInput
              value={playerPDGANumber}
              setValue={setPlayerPDGANumber}
              placeholder="PDGA # (Optional)"
              isNumber={true}
            />
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Typography className={classes.inputLabelText}>Location</Typography>
            <StandardAutocomplete
              value={playerLocation}
              setValue={setPlayerLocation}
              searchTerm={searchPlayerLocation}
              setSearchTerm={setSearchPlayerLocation}
              placeholder="Location (Optional)"
              options={placePredictions.map(
                (prediction) => prediction.description
              )}
              itemRenderer={locationOptionRenderer}
            />
          </Grid>
          <Typography className={classes.errorCredentialsText}>
            {errorMessage}
          </Typography>
        </Grid>
        <StandardButton
          text={"Update Profile"}
          onClick={handleEditPlayer}
          height={leagueLinkTheme.spacing(16)}
          disabled={validateNewInfo()}
        />
      </Grid>
    </div>
  );
};

export const EditPlayer = EditPlayerComponent;
