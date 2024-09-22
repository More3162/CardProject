import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, CardActions } from "@mui/material";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import { useState } from "react";

export default function CardActionBar({
  cardId,
  userId,
  likes,
  handleDelete,
  handleEdit,
  handleLike,
  phone,
}) {

  const { user } = useCurrentUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);


  return (
    !loading &&
    <CardActions sx={{ justifyContent: "space-between" }}>
      <Box>
        {
          user && user._id == userId ? (
            <>
              <IconButton LinkComponent={Link} to={ROUTES.EDIT_CARD + `/${cardId}`}>
                <ModeEditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(cardId)}>
                <DeleteIcon />
              </IconButton>
            </>
          ) : ""
        }
      </Box>
      <Box>
        <IconButton LinkComponent={Link} to={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`} target="_blank">
          <CallIcon />
        </IconButton>
        <IconButton onClick={() => handleLike(cardId)}>
          <FavoriteIcon sx={{ color: likes.includes(user._id) ? "red" : "" }} />
        </IconButton>
      </Box>
    </CardActions>
  );
}

