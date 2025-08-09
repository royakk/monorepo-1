import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, useAppDispatch, initializeTheme } from "@shared/store";
import {
  Header,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from "@shared/ui";
import { Link } from "react-router-dom";

const store = createStore();

const Home: React.FC = () => (
  <Container className="py-6 md:py-8 max-w-4xl">
    <Box className="text-center">
      <Typography variant="h2" component="h1" className="font-bold mb-4">
        Welcome to Our Platform
      </Typography>
      <Typography
        variant="h6"
        className="text-gray-600 dark:text-gray-400 mb-8"
      >
        Discover amazing user experiences and powerful features
      </Typography>

      <Box className=" mb-8">
        
        <Card>
          <CardContent className="p-6">
            <Typography variant="h5" className="font-semibold mb-3">
              Public Features
            </Typography>
            <Typography variant="body1" className="mb-4">
              Explore our public features, browse content, and learn more about
              our platform.
            </Typography>
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              size="large"
            >
              Learn More
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  </Container>
);

const About: React.FC = () => (
  <Container className="py-6 md:py-8 max-w-4xl">
    <Typography variant="h3" component="h1" className="font-bold mb-6">
      About Our Platform
    </Typography>
    <Typography variant="body1" className="mb-4">
      This is a multilingual dashboard platform built with modern technologies
      including React, TypeScript, Redux Toolkit, and Material-UI.
    </Typography>
    <Typography variant="body1" className="mb-6">
      Features include theme switching, internationalization support, and a
      comprehensive admin dashboard for user management.
    </Typography>
    <Button component={Link} to="/" variant="contained">
      Back to Home
    </Button>
  </Container>
);

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header title="Public Platform" />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
