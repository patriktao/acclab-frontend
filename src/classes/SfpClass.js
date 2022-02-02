import { checkString, checkURLString } from "../helper/Checker";
import PropTypes from "prop-types";
import { isEqual } from "lodash/fp";

class SfpClass {
  #sfp_id = null;
  #sfp_name = "";
  #unit = "";
  #location = "";
  #image = "";
  #process_steps = "";

  constructor(data) {
    if (data !== undefined) {
      this.#sfp_id = data.sfp_id;
      this.#sfp_name = data.sfp_name;
      this.#unit = data.unit;
      this.#location = data.location;
      this.#image = data.image;
      this.#process_steps = data.process_steps;
    }
  }

  toJsonObject() {
    return {
      sfp_id: this.#sfp_id,
      sfp_name: this.#sfp_name,
      unit: this.#unit,
      location: this.#location,
      image: this.#image,
      process_steps: this.#process_steps,
    };
  }

  isEqual(sfpClass) {
    return isEqual(this.toJsonObject(), sfpClass.toJsonObject());
  }

  /* Get functions */
  get sfp_id() {
    return this.#sfp_id;
  }

  get sfp_name() {
    return this.#sfp_name;
  }

  get unit() {
    return this.#unit;
  }

  get location() {
    return this.#location;
  }

  get image() {
    return this.#image;
  }

  get process_steps() {
    return this.#process_steps;
  }

  /* Set Functions */
  set sfp_id(n) {
    this.propTypes = {
      n: PropTypes.number,
    };
    if (n >= 0) {
      this.#sfp_id = n;
    }
    return this;
  }

  set sfp_name(s) {
    this.propTypes = {
      s: PropTypes.string,
    };
    if (checkString(s, this.#sfp_name)) {
      this.#sfp_name = s;
    }
    return this;
  }

  set unit(s) {
    this.propTypes = {
      s: PropTypes.string,
    };
    if (checkString(s, this.#unit)) {
      this.#unit = s;
    }
    return this;
  }

  set location(s) {
    this.propTypes = {
      s: PropTypes.string,
    };
    if (checkString(s, this.#location)) {
      this.#location = s;
    }
    return this;
  }

  set image(s) {
    this.propTypes = {
      s: PropTypes.string,
    };
    if (checkURLString(s, this.#image)) {
      this.#image = s;
    }
    return this;
  }

  set process_steps(s) {
    this.propTypes = {
      s: PropTypes.string,
    };
    if (checkString(s, this.#process_steps)) {
      this.#process_steps = s;
    }
    return this;
  }
}

export default SfpClass;
