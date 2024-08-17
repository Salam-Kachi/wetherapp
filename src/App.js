import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";

import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  const { t, i18n } = useTranslation();

  //===========STATE========//
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  const [locale, setLocale] = useState("ar");
  const direction = locale === "ar" ? "rtl" : "ltr";

  //===========EVENT HANDLERS========//
  function handleLanguageClick() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("MMMM Do YYYY  ,  h:mm:ss a"));
  }
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);

  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY  ,  h:mm:ss a"));

    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=8d8b11e04ba8468e976172609240508&q=baghdad"
      )
      .then(function (response) {
        const responeSetTemp = response.data.current.temp_c;
        const min = response.data.current.dewpoint_c;
        const max = response.data.current.feelslike_c;
        const description = response.data.current.condition.text;
        const responseIcon = response.data.current.condition.icon;

        // console.log(min, max, description);

        setTemp({
          number: responeSetTemp,
          min: min,
          max: max,
          description: description,
          icon: responseIcon,
        });
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div>
          <Container maxWidth="sm">
            {/*CONTENT CONTAINER*/}
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/*CARD */}
              <div
                style={{
                  width: "100%",
                  backgroundColor: "rgb(28 52 91/36%)",
                  color: "white",
                  padding: "10px",
                  borderRadius: "15px",
                  boxShadow: "0px 11px 1px rgba(0,0,0,0.05) ",
                }}
              >
                {/*Content*/}
                <div>
                  {/*CITY & TIME*/}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "start",
                    }}
                    dir={direction}
                  >
                    <Typography
                      variant="h2"
                      style={{ marginRight: "20px", fontWeight: "600" }}
                    >
                      {t("Baghdad")}
                    </Typography>
                    <Typography variant="h5" style={{ marginRight: "20px" }}>
                      {dateAndTime}
                    </Typography>
                  </div>
                  {/*CITY & TIME*/}
                  <hr />
                  {/* CONTAINER OF DEGREE + CLOUD ICON */}
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                    dir={direction}
                  >
                    {/*DEGREE & DESCRIPTIN*/}
                    <div>
                      {/*TEMP*/}
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h1"
                            style={{ textAlign: "right" }}
                          >
                            {temp.number}
                          </Typography>
                          <img src={temp.icon} alt="Wether" />
                        </div>

                        <Typography variant="h6">
                          {t(temp.description)}
                        </Typography>
                        {/* MIN & MAX */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <h5>
                            {t("min")}:{temp.min}
                          </h5>
                          <h5 style={{ margin: "0 5px" }}>|</h5>
                          <h5>
                            {t("max")}:{temp.max}
                          </h5>
                        </div>
                      </div>
                      {/*TEMP*/}
                    </div>
                    {/*DEGREE & DESCRIPTIN*/}
                    <CloudIcon style={{ fontSize: "200px" }} />
                  </div>
                  {/* ====CONTAINER OF DEGREE + CLOUD ICON ====*/}
                </div>
                {/*Content*/}
              </div>
              {/*CARD */}
              {/* TRANSLATION CONTAINER */}
              <div
                dir={direction}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button
                  style={{ color: "white", marginTop: "20px" }}
                  variant="text"
                  onClick={handleLanguageClick}
                >
                  {locale === "en" ? "Arabic" : "انكليزي"}
                </Button>
              </div>
              {/* TRANSLATION CONTAINER */}
            </div>
            {/*CONTENT CONTAINER*/}
          </Container>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
