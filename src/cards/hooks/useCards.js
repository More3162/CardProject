import { useCallback, useState } from "react";
import { useSnack } from "../../providers/SnackbarProvider";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { deleteCard, editCard, changeLikeStatus } from "../services/cardsApiService";
import { useNavigate } from "react-router-dom";
import normalizeCard from "../helpers/normalization/normalizeCard";
import ROUTES from "../../routes/routesModel";

export default function useCards() {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const setSnack = useSnack();
  const navigate = useNavigate();
  useAxios();

  const getAllCards = useCallback(async () => {
    try {
      let response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
      );
      setCards(response.data);
      setSnack("success", "All cards are here!");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const getMyCards = useCallback(async () => {
    try {
      let response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards"
      );
      setCards(response.data);
      setSnack("success", "All your cards are here!");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const getCardById = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
      );
      const data = response.data;
      setCard(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const handleDelete = useCallback(
    async (cardId) => {
      setIsLoading(true);
      try {
        await deleteCard(cardId);
        setSnack("success", "The business card has been seccessfully deleted");
        setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    []);

  const handleLike = useCallback(
    async (cardId) => {
      try {
        const { likes } = await changeLikeStatus(cardId);
        const card = cards.find((card) => card._id === cardId);
        card.likes = likes;
        setCards([...cards]);
      } catch (error) {
        setError(error.message);
      }
    }
    , [cards]);

  const handleUpdateCard = useCallback(
    async (cardId, cardFromClient) => {
      setIsLoading(true);

      try {
        const card = await editCard(cardId, normalizeCard(cardFromClient));
        setCard(card);
        setSnack("success", "The business card has been successfully updated");
        setTimeout(() => {
          navigate(ROUTES.ROOT);
        }, 1000);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [setSnack, navigate]
  );

  const handleCreateCard = useCallback(
    async (cardFromClient) => {
      setError(null);
      setIsLoading(true);
      try {
        const { data } = await axios.post(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`,
          normalizeCard(cardFromClient),
          { "x-auth-token": localStorage.getItem("my token") }
        );
        const card = data;
        setCard(card);
        setSnack("success", "A new business card has been created");
        setTimeout(() => {
          navigate(ROUTES.ROOT);
        }, 1000);
      } catch (error) {
        console.log(error.response.data);
        setError(error.message);
      }
      setIsLoading(false);
    },
    [setSnack, navigate]
  );

  return {
    cards,
    card,
    error,
    isLoading,
    getAllCards,
    getMyCards,
    getCardById,
    handleDelete,
    handleLike,
    handleUpdateCard,
    handleCreateCard,
  };
}
