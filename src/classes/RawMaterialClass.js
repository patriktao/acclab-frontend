import PropTypes from "prop-types";
import { checkString, checkNumber, checkURLString } from "../helper/Checker";

class RawMaterialClass {
  static propTypes = {
    name: PropTypes.string,
    brand: PropTypes.string,
    country: PropTypes.string,
    unit: PropTypes.string,
    form: PropTypes.string,
    location: PropTypes.string,
    fat: PropTypes.number,
    carb: PropTypes.number,
    protein: PropTypes.number,
    salt: PropTypes.number,
    fiber: PropTypes.number,
    content: PropTypes.string,
    image: PropTypes.string,
  };

  #id = null;
  #name = "";
  #brand = "";
  #country = "";
  #unit = "";
  #form = "";
  #location = "";
  #fat = 0;
  #carb = 0;
  #protein = 0;
  #salt = 0;
  #sugar = 0;
  #fiber = 0;
  #content = "";
  #image = "";
  #data = null;

  constructor(data) {
    if (data !== undefined && data !== null) {
      this.#data = data;
      this.#id = data.raw_material_id;
      this.#name = data.material_name;
      this.#brand = data.company;
      this.#country = data.country;
      this.#unit = data.unit;
      this.#form = data.form;
      this.#location = data.location;
      this.#fat = data.fat;
      this.#carb = data.carbohydrate;
      this.#protein = data.protein;
      this.#salt = data.salt;
      this.#sugar = data.sugar;
      this.#fiber = data.fiber;
      this.#content = data.content;
      this.#image = data.image;
    }
  }

  /* Return an Json Object of the data */

  toJsonObject() {
    return {
      id: this.#id,
      name: this.#name,
      company: this.#brand,
      country: this.#country,
      unit: this.#unit,
      form: this.#form,
      location: this.#location,
      fat: this.#fat,
      carb: this.#carb,
      protein: this.#protein,
      salt: this.#salt,
      sugar: this.#sugar,
      fiber: this.#fiber,
      content: this.#content,
      image: this.image,
    };
  }

  /* 
    Returns the private variables
  */

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get brand() {
    return this.#brand;
  }

  get country() {
    return this.#country;
  }

  get unit() {
    return this.#unit;
  }

  get form() {
    return this.#form;
  }

  get location() {
    return this.#location;
  }

  get fat() {
    return this.#fat;
  }

  get carb() {
    return this.#carb;
  }

  get protein() {
    return this.#protein;
  }

  get salt() {
    return this.#salt;
  }

  get sugar() {
    return this.#sugar;
  }

  get fiber() {
    return this.#fiber;
  }

  get content() {
    return this.#content;
  }

  get image() {
    return this.#image;
  }

  get data() {
    return this.#data;
  }

  /* 
    Set functions
  */

  set id(input) {
    this.propTypes = {
      input: PropTypes.number,
    };
    if (input >= 0) {
      this.#id = input;
    }
    return this;
  }

  set name(input) {
    this.propTypes = {
      input: PropTypes.string,
    };
    if (checkString(input, this.#name)) {
      this.#name = input;
    }
    return this;
  }

  set brand(input) {
    this.propTypes = {
      input: PropTypes.string,
    };
    if (checkString(input, this.#brand)) {
      this.#brand = input;
    }
    return this;
  }

  set country(input) {
    this.propTypes = {
      props: PropTypes.string,
    };
    if (checkString(input, this.#country)) {
      this.#country = input;
    }
    return this;
  }

  set unit(input) {
    this.propTypes = {
      input: PropTypes.string,
    };
    if (checkString(input, this.#unit)) {
      this.#unit = input;
    }
    return this;
  }

  set form(input) {
    this.propTypes = {
      input: PropTypes.string,
    };
    if (checkString(input, this.#form)) {
      this.#form = input;
    }
    return this;
  }

  set location(input) {
    this.propTypes = {
      input: PropTypes.string,
    };
    if (checkString(input, this.#location)) {
      this.#location = input;
    }
    return this;
  }

  set fat(input) {
    this.propTypes = {
      input: PropTypes.number,
    };
    if (checkNumber(input, this.#fat)) {
      this.#fat = input;
    }
    return this;
  }

  set carb(input) {
    this.propTypes = {
      input: PropTypes.number,
    };
    if (checkNumber(input, this.#carb)) {
      this.#carb = input;
    }
    return this;
  }

  set protein(input) {
    this.propTypes = {
      input: PropTypes.number,
    };
    if (checkNumber(input, this.#protein)) {
      this.#protein = input;
    }
    return this;
  }

  set salt(input) {
    this.propTypes = {
      input: PropTypes.number,
    };
    if (checkNumber(input, this.#salt)) {
      this.#salt = input;
    }
    return this;
  }

  set sugar(input) {
    this.propTypes = {
      input: PropTypes.number,
    };
    if (checkNumber(input, this.#sugar)) {
      this.#sugar = input;
    }
    return this;
  }

  set fiber(input) {
    this.propTypes = {
      input: PropTypes.number,
    };
    if (checkNumber(input, this.#fiber)) {
      this.#fiber = input;
    }
    return this;
  }

  set content(input) {
    this.propTypes = {
      input: PropTypes.string,
    };
    if (checkString(input, this.#content)) {
      this.#content = input;
    }
    return this;
  }

  set image(input) {
    this.propTypes = {
      input: PropTypes.setImage,
    };
    if (checkURLString(input, this.#image)) {
      this.#image = input;
    }
    return this;
  }
}

export default RawMaterialClass;
