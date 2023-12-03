// App.tsx styles:

export const AppContainerStyle = {
  flexDirection: "column",
  height: "100vh",
};

export const MainContainerStyle = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  p: "2rem",
  gap: "1rem",
  "&>h2": {
    fontSize: "42px",
  },
};

// export const LogoSearchBarContainerStyle = {
//   w: "100%",
//   flexDirection: "column",
//   alignItems: "center",
//   gap: "1rem",
// };


// Header.tsx styles:

export const HeaderContainerStyle = {
  width: "100%",
  px: "4rem",
  py: "1rem",
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

export const SearchIconContainerStyle = {
  paddingLeft: ".5rem",
  h: "100%",
};

export const SearchBarInputStyle = {
  paddingLeft: "2.75rem",
  paddingRight: "6rem",
  size: "lg",
};

export const SubmitSearchButtonContainerStyle = {
  w: "auto",
  h: "100%",
  p: "1px",
};

export const SearchErrorTextStyle = {
  color: "red.500",
  position: "absolute",
  bottom: { base: "-50px", sm: "-30px" },
  left: "0",
};

// DisplayResults.tsx styles:

export const DisplayResultContainerStyle = {
  p: "1.5rem",
  mt: ".5rem",
  shadow: "md",
  borderWidth: "1px",
  borderRadius: "2px",
  maxWidth: "600px",
  w: "100%",
};
