// server

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const defaultPORT = 8080;
const PORT = process.env.PORT || defaultPORT; 

const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/foreCast");

// Paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home Page",
    name: "Julio Rivas",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Julio Rivas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Julio Rivas",
    helpMsg: "Help Msg",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a location",
    });
  }

  geoCode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      foreCast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Julio Rivas",
    errorMsg: "Help article not found!",
  });
});

// 404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Julio Rivas",
    errorMsg: "Page not found!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
