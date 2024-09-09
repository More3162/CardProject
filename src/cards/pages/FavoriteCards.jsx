import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { useSearch } from "../../providers/SearchProvider";

export default function FavCards() {
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
        title="Fav Cards"
        subtitle="On this page you can find favorite bussines cards from all categories"
      />
      <CardsFeedback
        cards={cards.filter((card) => card.likes.includes(user._id) && (card.title.toLowerCase().includes(search.toLowerCase()) || card.subtitle.toLowerCase().includes(search.toLowerCase())))}
        isLoading={isLoading}
        error={error}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    </div>
  );
}
