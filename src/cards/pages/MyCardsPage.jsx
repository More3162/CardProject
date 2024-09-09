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
import { useSearch } from "../../providers/SearchProvider";

export default function MyCardsPage() {
  const { cards, error, isLoading, getMyCards, handleDelete, handleLike } =
    useCards();
  const { search } = useSearch();

  useEffect(() => {
    getMyCards();
  }, []);

  return (
    <div>
      <PageHeader
        title="My Cards"
        subtitle="On this page you can find your bussines cards"
      />
      <CardsFeedback
        cards={cards.filter((card) => card.title.toLowerCase().includes(search.toLowerCase()) || card.subtitle.toLowerCase().includes(search.toLowerCase()))}
        isLoading={isLoading}
        error={error}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    </div>
  );
}
