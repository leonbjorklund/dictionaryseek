// App.tsx styles:

export const AppContainerStyle = {
  flexDirection: "column",
  height: "100vh",
};

export const MainContainerStyle = {
  flexDirection: "column",
  height: "90%",
  p: "2rem",
  gap: "1.5rem",
  alignItems: "center",
  justifyContent: "center",
  "&>h2": {
    fontSize: "42px",
  },
};

// Header.tsx styles:

export const HeaderContainerStyle = {
  position: "absolute",
  width: "100%",
  px: "4",
  py: "3",
  gap: "4",
  alignItems: "center",
  justifyContent: "space-between",
  color: "white",
};

// SearchBar.tsx styles:

export const SearchBarContainerStyle = {
  w: "100%",
  flexDirection: "column",
  maxWidth: "500px",
};

export const SearchBarInputStyle = {
  paddingLeft: "2.75rem",
  paddingRight: "6rem",
  size: "lg",
};

export const SearchIconContainerStyle = {
  paddingLeft: ".5rem",
  h: "100%",
};
