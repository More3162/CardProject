import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Cards from "../components/Cards";
import axios from "axios";
import CardsFeedback from "../components/CardsFeedback";
import { useSnack } from "../../providers/SnackbarProvider";
import useCards from "../hooks/useCards";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { useSearch } from "../../providers/SearchProvider";


export default function CardsPage() {
  const { cards, error, isLoading, getAllCards, handleDelete, handleLike } =
    useCards();

  const { user } = useCurrentUser();
  const { search } = useSearch();

  useEffect(() => {
    getAllCards();
  }, []);


  return (
    <div>
      <PageHeader
        title="Cards"
        subtitle="On this page you can find all bussines cards from all categories"
      />
      <CardsFeedback
        cards={cards.filter((card) => card.title.toLowerCase().includes(search.toLowerCase()) || card.subtitle.toLowerCase().includes(search.toLowerCase()))}
        isLoading={isLoading}
        error={error}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />

      {user && user.isBusiness && <Fab sx={{ position: "fixed", bottom: 70, right: 50 }} LinkComponent={Link} to={ROUTES.CREATE_CARD}>
        <AddIcon />
      </Fab>
      }
    </div >
  );
}
