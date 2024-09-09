import { useTheme } from "../../../providers/CustomThemeProvider";
import { Box, IconButton } from "@mui/material";
import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import { useSearch } from "../../../providers/SearchProvider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";


export default function RightNavbar() {
  const { user } = useCurrentUser();
  const { isDark, toggleDarkMode } = useTheme();
  const { search, setSearch } = useSearch()

  return (
    <Box
      sx={{
        display: { md: "inline-flex" },
        alignItems: "center",
      }}
    >
      <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }} />
      <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {user ? <Logged /> : <NotLogged />}
    </Box>
  );
}
