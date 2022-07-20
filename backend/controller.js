const { request, response } = require("express");
const Country = require("./countryModel");
const axios = require("axios");

const getCountries = async (req, res, next) => {
  let countries = "";
  if (req.query.region) {
    countries = await Country.find({}, { name: 1, region: 1, _id: 0 })
      .where("region")
      .equals(req.query.region);
  } else {
    countries = await Country.find({}, { name: 1, region: 1, _id: 0 });
    req.countries = countries;
  }
  res.status(200).send(countries);
};

const getSalesRep = async (req, res) => {
  axios.get("http://127.0.0.1:3000/countries").then((response) => {
    const counts = {};
    const result = [];
    response.data.forEach((element) => {
      counts[element.region] = (counts[element.region] || 0) + 1;
    });

    Object.keys(counts).forEach(function (key) {
      let value = counts[key];
      result.push({
        region: key,
        minSalesReq: Math.round(value / 7),
        maxSalesReq: Math.round(value / 3),
      });
    });

    res.status(200).send(result);
  });
};

const getOptimal = async (req, res) => {
  axios.get("http://127.0.0.1:3000/countries").then((response) => {
    const temp = [];
    const result = [];
    const unique = [...new Set(response.data.map((item) => item.region))];

    unique.forEach((key) => {
      temp.push(response.data.filter((element) => element.region == key));
    });

    temp.forEach((element) => {
      let tempArr = [];
      for (let index = 0; index < element.length; index++) {
        let limit = Math.ceil(element.length / Math.ceil(element.length / 7));
        if ((index + 1) % limit == 0 || index == element.length - 1) {
          tempArr.push(element[index].name);
          result.push({
            region: element[0].region,
            countryList: tempArr,
            countryCount: tempArr.length,
          });
          tempArr = [];
        } else {
          tempArr.push(element[index].name);
        }
      }
    });

    res.status(200).send(result);
  });
};

module.exports = {
  getCountries,
  getSalesRep,
  getOptimal,
};
