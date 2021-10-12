/* import React from "react"; */
import PropTypes from "prop-types";
import { checkString, checkNumber } from "../helper/Checker";

class RawMaterialClass /*  extends React.Component  */ {
  static propTypes = {
    name: PropTypes.string,
    brand: PropTypes.string,
    country: PropTypes.string,
    unit: PropTypes.string,
    form: PropTypes.string,
    location: PropTypes.string,
    fat: PropTypes.number,
    carbohydrate: PropTypes.number,
    protein: PropTypes.number,
    salt: PropTypes.number,
    fiber: PropTypes.number,
    content: PropTypes.string,
    image: PropTypes.string,
  };

  #name;
  #brand;
  #country;
  #unit;
  #form;
  #location;
  #fat;
  #carbohydrate;
  #protein;
  #salt;
  #sugar;
  #fiber;
  #content;
  #image;

  /* Constructor */

  constructor() {
    this.name = "";
    this.#brand = "";
    this.#country = "";
    this.#unit = "";
    this.#form = "";
    this.#location = "";
    this.#fat = 0;
    this.#carbohydrate = 0;
    this.#protein = 0;
    this.#salt = 0;
    this.#sugar = 0;
    this.#fiber = 0;
    this.#content = "";
    this.#image = "";
  }

  /* Return an array of the data */

  toArray() {
    return [
      this.#name,
      this.#brand,
      this.#country,
      this.#unit,
      this.#form,
      this.#location,
      this.#fat,
      this.#carbohydrate,
      this.#protein,
      this.#salt,
      this.#sugar,
      this.#fiber,
      this.#content,
      this.#image,
    ];
  }

  /* Create a Raw Material out of a JSON object*/

  jsonToRawMaterial(data) {
    this.#name = data.material_name;
    this.#brand = data.company;
    this.#country = data.country;
    this.#unit = data.unit;
    this.#form = data.form;
    this.#location = data.location;
    this.#fat = data.fat;
    this.#carbohydrate = data.carbohydrate;
    this.#protein = data.protein;
    this.#salt = data.salt;
    this.#sugar = data.sugar;
    this.#fiber = data.fiber;
    this.#content = data.content;
    this.#image = data.image;
  }

  setName(props) {
    if (checkString(props, this.name)) {
      this.#name = props;
    }
    return this;
  }

  setBrand(props) {
    if (checkString(props, this.#brand)) {
      this.#brand = props;
    }
    return this;
  }

  setCountry(props) {
    if (checkString(props, this.#country)) {
      this.#country = props;
    }
    return this;
  }

  setUnit(props) {
    if (checkString(props, this.#unit)) {
      this.#unit = props;
    }
    return this;
  }

  setForm(props) {
    if (checkString(props, this.#form)) {
      this.#form = props;
    }
    return this;
  }

  setLocation(props) {
    if (checkString(props, this.#location)) {
      this.#location = props;
    }
    return this;
  }

  setFat(props) {
    if (checkNumber(props, this.#fat)) {
      this.#fat = props;
    }
    return this;
  }

  setCarb(props) {
    if (checkNumber(props, this.#carbohydrate)) {
      this.#carbohydrate = props;
    }
    return this;
  }

  setProtein(props) {
    if (checkNumber(props, this.#protein)) {
      this.#protein = props;
    }
    return this;
  }

  setSalt(props) {
    if (checkNumber(props, this.#salt)) {
      this.#salt = props;
    }
    return this;
  }

  setSugar(props) {
    if (checkNumber(props, this.#sugar)) {
      this.#sugar = props;
    }
    return this;
  }

  setFiber(props) {
    if (checkNumber(props, this.#fiber)) {
      this.#fiber = props;
    }
    return this;
  }

  setContent(props) {
    if (checkString(props, this.#content)) {
      this.#content = props;
    }
    return this;
  }

  setImage(props) {
    if (checkString(props, this.#image)) {
      this.#image = props;
    }
    return this;
  }
}

export default RawMaterialClass;
